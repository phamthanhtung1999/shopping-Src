import express from "express";
import { index } from "../../app/controllers/admin/userCtrl.js";

const router = express.Router();

router.get("/", index);

export default router;
