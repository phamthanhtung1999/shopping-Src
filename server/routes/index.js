import express from "express";

import categoryRoutes from "./categories.js";
import productRoutes from "./products.js";

const router = express.Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);

export default router;