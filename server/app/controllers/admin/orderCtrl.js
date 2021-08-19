import { ORDER_CANCELLED, ORDER_DELIVERING, ORDER_DONE, ORDER_PROCESSING } from "../../../config/constants.js";
import {
  mongooseToObj,
  multipleMongooseToObj,
} from "../../helpers/mongooseHelper.js";
import { paginate, orderDetail } from "../../repositories/orderRepo.js";

export const index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  let data = await paginate(page, {});

  const orderStatuses = {};
  orderStatuses[ORDER_PROCESSING] = "Processing";
  orderStatuses[ORDER_DELIVERING] = "Delivering";
  orderStatuses[ORDER_DONE] = "Done";
  orderStatuses[ORDER_CANCELLED] = "Cancelled";

  const orderStatusColor = {};
  orderStatusColor[ORDER_PROCESSING] = "primary";
  orderStatusColor[ORDER_DELIVERING] = "primary";
  orderStatusColor[ORDER_DONE] = "success";
  orderStatusColor[ORDER_CANCELLED] = "danger";
  
  res.render("order/list", {
    data: multipleMongooseToObj(data.docs),
    orderStatuses: orderStatuses,
    orderStatusColor: orderStatusColor,
    lastPage: data.totalPages,
    currentPage: data.page,
    hasNext: data.hasNextPage,
    hasPrev: data.hasPrevPage,
  });
};

export const show = async (req, res) => {
  try {
    const order = await orderDetail(req.params.id);
    let totalItems = order.details.reduce((total, current) => {
      total += current.quantity;
      return total;
    }, 0);
    let totalIncome = order.details.reduce((total, current) => {
      total += current.unitPrice * (1 - current.discount) * current.quantity;
      return total;
    }, 0);
    let status = 'unpaid';
    let statusColor = 'secondary';
    switch (order.status) {
      case 'processing':
      case 'delivering':
        status = 'The order is in process'
        statusColor = 'primary'
        break;
      case 'done':
        status = 'Paid'
        statusColor = 'success'
        break;
      case 'cancelled':
        status = 'Cancelled'
        statusColor = 'danger'
        break;
      default:
        break;
    }

    res.render("order/show", {
      model: mongooseToObj(order),
      totalItems,
      totalIncome,
      status,
      statusColor
    })
  } catch (error) {
    res.redirect('/orders')
  }  
}
