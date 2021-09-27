import {
  createOrder,
  getOrderById,
  getProcessingOrderOfUser,
  getOrderHistoryOfUser,
} from "../../repositories/orderRepo.js";
import { getProductWithDiscount } from "../../repositories/productRepo.js";
import { transform, transformList } from "../../transformers/order.js";

export const create = async (req, res) => {
  try {
    const { body, user } = req;

    let data = {};
    data.receiverName = user.firstName + " " + user.lastName;
    data.receiverPhone = user.phone;
    data.receiverAddress = user.address;
    data.user = user._id;

    const productList = await getProductWithDiscount(
      body.details.map((e) => e.product_id)
    );

    if (productList.error) {
      throw new Error(productList.message);
    }

    let details = [];

    await Promise.all(
      body.details.map((e) => {
        return new Promise((resolve, reject) => {
          const product = productList.find((p) => p._id == e.product_id);
          let item = {
            quantity: e.quantity,
            unitPrice: product.unitPrice,
            product: product._id,
            discount: product.discount,
          };

          details.push(item);
          resolve();
        });
      })
    ).catch((error) => {
      console.log(error);
      throw new Error("create order detail failure");
    });

    if (details.length == 0) {
      throw new Error("create order detail failure");
    }

    const result = await createOrder(data, details);

    if (result.error) {
      res
        .status(500)
        .json({ message: "create order failure", error: result.message });
    } else {
      res.status(201).json({ message: "success" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const show = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const result = await getOrderById(id, userId);

  const myHost = req.protocol + "://" + req.get("host");

  if (result.error) {
    res.status(404).json(result);
  } else {
    res.status(200).json(transform(result, myHost));
  }
};

export const list = async (req, res) => {
  const userId = req.user._id;

  const result = await getProcessingOrderOfUser(userId);

  if (result.error) {
    res.status(404).json(result);
  } else {
    res.status(200).json(transformList(result));
  }
};

export const history = async (req, res) => {
  const userId = req.user._id;

  const result = await getOrderHistoryOfUser(userId);

  if (result.error) {
    res.status(404).json(result);
  } else {
    res.status(200).json(transformList(result));
  }
};
