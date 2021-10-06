import express from "express";
import { login, logout, refresh, register } from "../../app/controllers/api/authCtrl.js";
import { userRestrict } from "../../app/middlewares/auth.js";

const router = express.Router();

router.post('/login',  login);
router.post('/register', register);
router.post('/logout', userRestrict, logout);
router.post('/refresh', userRestrict, refresh);

export default router;
