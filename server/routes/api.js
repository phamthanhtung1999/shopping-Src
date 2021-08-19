import express from "express";
import { userRestrict } from "../app/middlewares/auth.js";

import categoryRoutes from "./api/categories.js";
import productRoutes from "./api/products.js";
import userRoutes from "./api/users.js";
import orderRoutes from "./api/orders.js";

const router = express.Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', userRestrict, orderRoutes);

export default router;