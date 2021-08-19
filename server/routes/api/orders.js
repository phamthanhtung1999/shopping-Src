import express from "express";
import { create, show } from "../../app/controllers/api/orderCtrl.js";
import CreateOrderRequest from "../../app/middlewares/requests/CreateOrderRequest.js"

const router = express.Router();

router.post('/', CreateOrderRequest, create);
router.get('/:id', show);

export default router;