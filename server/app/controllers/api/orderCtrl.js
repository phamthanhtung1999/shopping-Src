import { createOrder, getOrderById } from "../../repositories/orderRepo.js";
import { getProductWithDiscount } from "../../repositories/productRepo.js";

export const create = async (req, res) => {
    try {
        const { body, user } = req;

        let data = {};
        data.receiverName = user.firstName + ' ' + user.lastName;
        data.receiverPhone = user.phone;
        data.receiverAddress = user.address;
        data.user = user._id;

        const productList = await getProductWithDiscount(body.details.map((e) => e.product_id));

        if (productList.error) {
            throw new Error(productList.message);
        }

        let details = [];

        body.details.every((e) => {
            const product = productList.find(p => p._id == e.product_id);
            let item = {
                quantity: e.quantity,
                unitPrice: product.unitPrice,
                product: product._id,
            }
            if (product.discounts.length > 0) {
                const discount = product.discounts.find((el) => el.startDate <= Date.now() && el.endDate > Date.now());
                if (discount) {
                    item.discount = discount.discount;
                }
            }

            details.push(item);
        })
        if (details.length == 0) {
            throw new Error("create order detail failure");
        }

        const result = await createOrder(data, details);

        if (result.error) {
            res.status(500).json({ message: 'create order failure', error: result.message })
        } else {
            res.status(201).json({ message: 'success' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }    
}

export const show = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const order = await getOrderById(id, userId);

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(500).json({ message: "Resource not found" });
    }
}