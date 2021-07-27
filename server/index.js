import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import hbs from "express-handlebars";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import moment from "moment";

import routes from "./routes/index.js";
import { mapAdmin } from "./app/middlewares/auth.js";

// get config
import {
  PORT,
  NODE_ENV,
  MONGO_URL,

  SESS_NAME,
  APP_KEY,
  SESS_LIFETIME
} from "./config/app.js";

const app = express();

// set dotenv to use process.env.*
dotenv.config();

// middleware
// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  name: SESS_NAME,
  store: MongoStore.create({ mongoUrl: MONGO_URL }),
  resave: false,
  saveUninitialized: false,
  secret: APP_KEY,
  cookie: {
    maxAge: SESS_LIFETIME * 60 * 1000,
    sameSite: true,
    secure: NODE_ENV === "production"
  }
}));

// use cors
app.use(cors());

// static folder
app.use(express.static('public'));

// View engine
app.engine('hbs', hbs({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    datetimeFormat: (datetime, format) => moment(datetime).format(format),
    currency: (number) => new Intl.NumberFormat().format(number),
    equal: (a, b) =>  a.equals(b),
    concat: (a, b) => a + ' ' + b,
  }
}));
app.set('view engine', 'hbs');

// Set views folder
app.set('views', path.join(path.resolve(), "resources/views"));

// map current login user to locals
app.use(mapAdmin);

// routes
app.use('/', routes);

mongoose
  .connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

export default app;