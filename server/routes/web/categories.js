import express from "express";
import { index, create, edit, store, update } from "../../app/controllers/admin/categoryCtrl.js";

const router = express.Router();

router.get("/", index);

router.get("/new", create);

router.post("/", store);

router.get("/:id/edit", edit);

router.post("/:id/edit", update);

export default router;
