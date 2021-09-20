import Product from "../models/Product.js";

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

export const getProductWithDiscount = async (ids) => {
    try {
        const products = await Product.find({ _id: { $in: ids } }).populate({ path: 'discounts' });

        return products;
    } catch (error) {
        return { error: true, message: "Invalid product ID" }
    }
}

export const updateProduct = async (id, data) => {
    try {
        const model = await Product.updateOne({ _id: id }, data);

        return model;
    } catch (error) {
        return { error: true, message: error.message };
    }
}

export const getProductBySlug = async (slug) => {
    const product = await Product
        .findOne({ slug: slug })
        .populate({ path: 'category', select: 'name' })
        .select(['name', 'description', 'stock', 'imagePath', 'unitPrice', 'slug']);

    return product
}

export const getPaginatedList = async (page, limit, condition) => {
    const query = {
        deleted: false
    }

    Object.assign(query, condition);

    const options = {
        page: page,
        limit: limit,
        select: ['name', 'stock', 'imagePath', 'unitPrice', 'slug', 'discount'],
    };

    const products = await Product.paginate(query, options);

    return products;
}