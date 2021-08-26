import express from "express";
import { create, index, store, edit, update, createDiscount, storeDiscount } from "../../app/controllers/admin/productCtrl.js";
import upload from "../../app/middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", index);

router.get("/new", create);

router.post("/", upload.single('image'), store);

router.get("/:id/edit", edit);

router.post("/:id/edit", update);

router.get("/:id/discount", createDiscount);

router.post("/:id/discount", storeDiscount);

export default router;
