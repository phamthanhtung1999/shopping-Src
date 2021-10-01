import express from "express";
import { index, show, switchStatus } from "../../app/controllers/admin/orderCtrl.js";

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/:id/switch-status', switchStatus);

export default router;