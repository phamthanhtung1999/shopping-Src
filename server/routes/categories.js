import express from "express";
import { getAll, create, update, destroy } from "../app/controllers/categoryCtrl.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
