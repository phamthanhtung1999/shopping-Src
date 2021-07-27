import express from "express";
import { login, logout, register } from "../../app/controllers/authCtrl.js";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

export default router;
