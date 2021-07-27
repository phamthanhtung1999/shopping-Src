import Product from "../models/Product.js";
import path from "path";
import fs from "fs";

export const paginate = async (page, limit, conditions, select) => {
    const options = {
        page: page,
        limit: limit,
        select: select || ['name', 'stock', 'imagePath', 'unitPrice', 'slug']
    };

    let query = conditions;
    query.deleted = false;

    try {
        const products = await Product.paginate(query, options);

        return products;
    } catch (error) {
        return { error: true, message: error.message };
    }
}

export const createProduct = async (data) => {
    const product = new Product(data);

    try {
        await product.save();

        return product;
    } catch (error) {
        return { error: true, message: error.message };
    }
}

export const getProductById = async (id) => {
    const product = await Product.findById(id);

    return product;
}

export const updateProduct = async (id, data) => {
    try {
        const model = await Product.findByIdAndUpdate(id, data);

        return model;
    } catch (error) {
        return { error: true, message: error.message };
    }
}