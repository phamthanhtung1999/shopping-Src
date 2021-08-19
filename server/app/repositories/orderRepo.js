import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import { ADMIN_PAGE_LIMIT } from "../../config/app.js";

export const createOrder = async (data, details) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const order = new Order(data);

    await Promise.all(
      details.map(async (element) => {
        return new Promise((resolve, reject) => {
          Product.findById(element.product)
            .then((prod) => {
              prod.stock -= element.quantity;
              prod.save(opts);
              order.details.push(element);
              resolve();
            })
            .catch(() => reject());
        });
      })
    );

    if (order.details.length != details.length) {
      throw new Error("Add detail failure");
    }

    order.save(opts);

    await session.commitTransaction();

    return true;
  } catch (error) {
    await session.abortTransaction();
    return { error: true, message: error.message };
  } finally {
    session.endSession();
  }
};

export const getOrderById = async (id, userId) => {
  const order = await Order.findOne({ _id: id, user: userId });
  return order;
};

export const paginate = async (page, conditions, select) => {
  const options = {
    page: page,
    limit: ADMIN_PAGE_LIMIT,
    populate: 'user',
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
    const order = await Order.findById(id).populate(['user', 'details.product']);

    return order;
}