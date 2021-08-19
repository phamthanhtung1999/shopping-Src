import express from "express";
import { getAllCategory, create, update, destroy } from "../../app/controllers/api/categoryCtrl.js";

const router = express.Router();

router.get("/", getAllCategory);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
