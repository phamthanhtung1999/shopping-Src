import Category from "../models/Category.js";

export async function getAll() {
    const data = await Category.find();

    return data;
}