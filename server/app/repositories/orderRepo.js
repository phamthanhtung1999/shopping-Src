import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import { ADMIN_PAGE_LIMIT } from "../../config/app.js";
import {
  ORDER_CANCELLED,
  ORDER_DELIVERING,
  ORDER_DONE,
  ORDER_PROCESSING,
} from "../../config/constants.js";
import moment from "moment";

export const createOrder = async (data, details) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();
  try {
    // const opts = { session };
    const order = new Order(data);
    order.details = details;

    for (let index = 0; index < details.length; index++) {
      const element = details[index];
      const prod = await Product.findById(element.product);
      if (prod) {
        prod.stock -= element.quantity;
        await prod.save();
      }
    }

    await order.save();

    // await session.commitTransaction();

    return true;
  } catch (error) {
    // await session.abortTransaction();
    // console.log(session);
    return { error: true, message: error.message };
  } finally {
    // session.endSession();
  }
};

export const getOrderById = async (id, userId) => {
  return Order.findOne({ _id: id, user: userId })
    .populate("details.product")
    .then((result) => result)
    .catch(() => ({ error: true, message: "Resource not found" }));
};

export const getProcessingOrderOfUser = async (userId) => {
  const orderStatus = [ORDER_PROCESSING, ORDER_DELIVERING];
  return Order.find({ user: userId, status: { $in: orderStatus } })
    .populate("details.product")
    .then((result) => result)
    .catch(() => ({ error: true, message: "Resource not found" }));
};

export const getOrderHistoryOfUser = async (userId) => {
  const orderStatus = [ORDER_DONE, ORDER_CANCELLED];
  return Order.find({ user: userId, status: { $in: orderStatus } })
    .populate("details.product")
    .then((result) => result)
    .catch(() => ({ error: true, message: "Resource not found" }));
};

export const paginate = async (page, conditions, select) => {
  const options = {
    page: page,
    limit: ADMIN_PAGE_LIMIT,
    populate: "user",
  };

  if (select) {
    options.select = select;
  }

  let query = conditions;
  query.deleted = false;

  try {
    const orders = await Order.paginate(query, options);

    return orders;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const orderDetail = async (id) => {
  const order = await Order.findById(id).populate(["user", "details.product"]);

  return order;
};

export const switchOrderStatus = async (id, status) => {
  const result = await Order.findByIdAndUpdate(id, { status })

  return result;
}

export const getOrdersForHomePage = async () => {
  const today = new Date;
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  const startOfLastMonth = new Date(thisYear, thisMonth - 1, 1);
  const endOfLastMonth = new Date(thisYear, thisMonth, 0);

  const lastMonthOrders = await Order.where({
    status: ORDER_DONE,
    createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
  });
  let lastMonthIncome = 0;
  for (let i = 0; i < lastMonthOrders.length; i++) {
    let order = lastMonthOrders[i];
    let income = 0;

    for (let j = 0; j < order.details.length; j++) {
      income += order.details[j].unitPrice * (1 - order.details[j].discount) * order.details[j].quantity;
    }

    lastMonthIncome += income;
  }

  const needActions = await Order.where({
    status: { $in: [ORDER_PROCESSING, ORDER_DELIVERING] }
  });

  const deliveringCount = needActions.filter((order) => order.status == ORDER_DELIVERING).length;
  const processingCount = needActions.filter((order) => order.status == ORDER_PROCESSING).length;
  const doneCount = await Order.where({
    status: ORDER_DONE,
    createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
  }).countDocuments();
  const cancelledCount = await Order.where({
    status: ORDER_CANCELLED,
    createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
  }).countDocuments();

  return {
    needActions,
    deliveringCount,
    processingCount,
    doneCount,
    cancelledCount,
    lastMonthIncome
  }
}