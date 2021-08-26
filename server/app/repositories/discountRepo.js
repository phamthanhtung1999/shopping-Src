import Discount from "../models/Discount.js";

export const getActiveDiscountList = async (ids) => {
    try {
        const now = new Date();
        const discounts = await Discount.find({
            product: { $in: ids },
            startDate: {
                $lte: now
            },
            endDate: {
                $gt: now
            }
        });

        return discounts;
    } catch (error) {
        return [];
    }
};

export const getActiveDiscount = async (id) => {
    try {
        const now = new Date();
        const discount = await Discount.findOne({
            product: id,
            startDate: {
                $lte: now
            },
            endDate: {
                $gt: now
            }
        });

        return discount;
    } catch (error) {
        return null
    }
};

export const getNextDiscount = async (productId) => {
    try {
        const now = new Date();
        const discount = await Discount.findOne({
            product: id,
            startDate: {
                $gt: now
            },
            endDate: {
                $gt: now
            }
        });

        return discount;
    } catch (error) {
        return null
    }
};

export const getNextDiscountList = async (ids) => {
    try {
        const now = new Date();
        const discounts = await Discount.find({
            product: { $in: ids },
            startDate: {
                $gt: now
            },
            endDate: {
                $gt: now
            }
        });

        return discounts;
    } catch (error) {
        return [];
    }
};

export const createDisc = async (data) => {
    try {
        const model = new Discount(data);
        return model.save()
            .then((result) => result)
            .catch(error => {
                throw new Error(error.message);
            });
    } catch (error) {
        return { error: true, message: error.message }
    }
};