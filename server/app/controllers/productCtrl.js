import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    const page = req.params.page || 1;

    const options = {
        page: page,
        limit: 50,
        select: ['name', 'stock', 'imagePath', 'unitPrice', 'slug']
    };

    try {
        const products = await Product.paginate({ deleted: false }, options);

        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProductDetail = async (req, res) => {
    const { slug } = req.params;
    try {
        const product = await Product
            .findOne({ slug: slug })
            .populate({ path: 'category', select: 'name' })
            .select(['name', 'description', 'stock', 'imagePath', 'unitPrice', 'slug']);

        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}