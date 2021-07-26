import express from "express";
import { getAll } from "../../app/repositories/categoryRepo.js";
import { multipleMongooseToObj } from "../../app/helpers/mongooseHelper.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = multipleMongooseToObj(await getAll());
    res.render('category/list', { categories: data });
});

router.get("/new", (req, res) => {
    res.render('category/create');
});

router.get("/:id/edit", (req, res) => {
    res.render('category/edit');
});

export default router;
