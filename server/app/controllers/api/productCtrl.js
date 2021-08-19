import { searchCategoryByName } from "../../repositories/categoryRepo.js";
import { getProductBySlug, getPaginatedList } from "../../repositories/productRepo.js";

export const getProducts = async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) {
        page = 1;
    }
    let condition = {};

    const category = req.query.category || '';
    const name = req.query.name || '';

    if (category) {
        const categories = await searchCategoryByName(category);
        const cateIds = categories.map((item) => {
            return item._id;
        })
        
        condition.category = {
            $in: cateIds
        }
    }

    if (name) {
        condition.name = {
            $regex: new RegExp(name, 'i')
        }
    }

    try {
        const data = await getPaginatedList(page, condition);

        const myHost = req.protocol + '://' + req.get('host');
        data.docs.forEach(element => {
            element.imagePath = myHost + '/' + element.imagePath;
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProductDetail = async (req, res) => {
    const { slug } = req.params;
    try {
        let product = await getProductBySlug(slug);

        const myHost = req.protocol + '://' + req.get('host');
        product.imagePath = myHost + "/" + product.imagePath;

        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}