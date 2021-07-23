import express from "express";
import { getProducts, getProductDetail } from "../app/controllers/productCtrl.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductDetail);

export default router;
