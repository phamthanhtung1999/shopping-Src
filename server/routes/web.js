import express from "express";

import homeRoutes from "./web/home.js";
import categoryRoutes from "./web/categories.js";
import productRoutes from "./web/products.js";
import { restrict } from "../app/middlewares/auth.js";

const router = express.Router();

router.use('/', homeRoutes);
router.use('/categories', restrict, categoryRoutes);
router.use('/products', restrict, productRoutes);

export default router;