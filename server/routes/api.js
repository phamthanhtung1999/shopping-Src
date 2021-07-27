import express from "express";

import categoryRoutes from "./api/categories.js";
import productRoutes from "./api/products.js";
import userRoutes from "./api/users.js";

const router = express.Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router;