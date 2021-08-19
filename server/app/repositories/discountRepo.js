import Discount from "../models/Discount";

export const getDiscountByProductId = async (id) => {
    const discount = await Discount.find({ product: id }).first();

    return discount;
}