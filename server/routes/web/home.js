import express from "express";
import { login, logout } from "../../app/controllers/authCtrl.js";
import { redirectHome, restrict } from "../../app/middlewares/auth.js";
import Admin from "../../app/models/Admin.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", restrict, (req, res) => {
    res.render('home');
});

router.get("/login", redirectHome, (req, res) => {
    res.render('login', { layout: "login" });
});

router.post("/login", redirectHome, login);

router.post("/logout", restrict, logout);

export default router;
