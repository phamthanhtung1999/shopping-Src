import express from "express";
import { login, logout, register } from "../../app/controllers/api/authCtrl.js";
import { userRestrict } from "../../app/middlewares/auth.js";

const router = express.Router();

router.post('/login',  login);
router.post('/register', register);
router.post('/logout', userRestrict, logout);

export default router;
