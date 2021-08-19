import express from "express";

import homeRoutes from "./web/home.js";
import categoryRoutes from "./web/categories.js";
import productRoutes from "./web/products.js";
import userRoutes from "./web/users.js";
import orderRoutes from "./web/orders.js";

import { restrict } from "../app/middlewares/auth.js";

const router = express.Router();

router.use('/', homeRoutes);
router.use('/categories', restrict, categoryRoutes);
router.use('/products', restrict, productRoutes);
router.use('/users', restrict, userRoutes);
router.use('/orders', restrict, orderRoutes);

export default router;