import express from "express";
import { mapAdmin } from "../app/middlewares/auth.js";

import session from "express-session";
import MongoStore from "connect-mongo";

// get config
import {
  NODE_ENV,
  MONGO_URL,
  SESS_NAME,
  APP_KEY,
  SESS_LIFETIME,
} from "../config/app.js";

const sessMiddleware = session({
  name: SESS_NAME,
  store: MongoStore.create({ mongoUrl: MONGO_URL }),
  resave: false,
  saveUninitialized: false,
  secret: APP_KEY,
  cookie: {
    maxAge: SESS_LIFETIME * 60 * 1000,
    sameSite: true,
    secure: NODE_ENV === "production",
  },
});

import apiRoutes from "./api.js";
import webRoutes from "./web.js";

const router = express.Router();

router.use("/api/v1", apiRoutes);
router.use("/", sessMiddleware, mapAdmin, webRoutes);

router.use("*", (req, res) => {
  res.render("404", { layout: "error" });
});

export default router;