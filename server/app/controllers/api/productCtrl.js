import { searchCategoryByName } from "../../repositories/categoryRepo.js";
import { getProductBySlug, getPaginatedList } from "../../repositories/productRepo.js";
import { getActiveDiscountList } from "../../repositories/discountRepo.js";

export const getProducts = async (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    if (!page || page < 1) {
        page = 1;
    }
    if (!limit || limit < 5) {
        limit = 50;
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
        const data = await getPaginatedList(page, limit, condition);

        const prodIds = data.docs.map(el => el._id);

        const discounts = await getActiveDiscountList(prodIds);

        const myHost = req.protocol + '://' + req.get('host');
        data.docs.forEach(element => {
            element.imagePath = myHost + '/' + element.imagePath;
            const index = discounts.findIndex(e => e.product.equals(element._id))
            if (index != -1) {
                element.discount = discounts[index].discount;
            }          
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