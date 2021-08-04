import Category from "../models/Category.js";

export const getAll = async () => {
    const data = await Category.find();

    return data;
}

export const createCategory = async (data) => {
    const model = new Category(data);

    try {
        await model.save();

        return model;
    } catch (error) {
        return { error: true, message: error.message };
    }
}

export const getCategoryById = async (id) => {
    const model = await Category.findById(id);

    return model;
}

export const updateCategoryById = async (id, dataObject) => {
    try {
        const model = await Category.findByIdAndUpdate(id, dataObject);

        return model;
    } catch (error) {
        return { error: true, message: error.message };
    }
}

export const deleteCategoryById = async (id) => {
    try {
        await Category.delete({ _id: id });

        return true;
    } catch (error) {
        return false;
    }
}

export const searchCategoryByName = async (keyword) => {
    try {
        const categories = await Category.find({ name: { $regex: new RegExp(keyword, 'i')} });
        return categories;
    } catch (error) {
        return null
    }
}