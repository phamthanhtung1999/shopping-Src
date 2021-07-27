import { getAll, createCategory, getCategoryById, updateCategoryById, deleteCategoryById } from "../../repositories/categoryRepo.js";
import { mongooseToObj, multipleMongooseToObj } from "../../helpers/mongooseHelper.js";

export const index = async (req, res) => {
    const data = multipleMongooseToObj(await getAll());
    res.render('category/list', { categories: data });
}

export const create = (req, res) => {
    res.render('category/create');
}

export const store = async (req, res) => {
    const data = req.body;

    const category = await createCategory(data);

    if (category.error) {
        res.render('category/create', { error: category.message })
    } else {
        res.redirect('/categories');
    }
}

export const edit = async (req, res) => {
    const category = mongooseToObj(await getCategoryById(req.params.id));

    if (category) {
        res.render('category/edit', { model: category });
    } else {
        res.render('404', { layout: 'error' });
    }
}

export const update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const category = await updateCategoryById(id, data);

    if (category.error) {
        res.render('category/create', { error: category.message })
    } else {
        res.redirect('/categories');
    }
}

export const destroy = async (req, res) => {
    const id = req.params.id;
    const result = await deleteCategoryById(id);

    res.redirect('/categories');
}