import { getAll } from "../../repositories/categoryRepo.js";

export const getAllCategory = async (req, res) => {
    try {
        const categories = await getAll();

        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const create = async (req, res) => {
    const data = req.body;

    const category = new Category(data);
    try {
        await category.save();

        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        await Category.findByIdAndUpdate(id, data);

        res.status(200).json({ message: "Update category successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        await Category.delete({ _id: id });

        res.status(200).json({ message: "Delete category successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}