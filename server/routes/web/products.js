import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render('product/list');
});

router.get("/new", (req, res) => {
    res.render('product/create');
});

router.get("/:id/edit", (req, res) => {
    res.render('product/edit');
});

export default router;
