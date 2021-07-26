import express from "express";

import categoryRoutes from "./api/categories.js";
import productRoutes from "./api/products.js";

const router = express.Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);

export default router;