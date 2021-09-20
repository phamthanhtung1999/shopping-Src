import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import hbs from "express-handlebars";
import path from "path";
import moment from "moment";

import routes from "./routes/index.js";

// get config
import { PORT, MONGO_URL } from "./config/app.js";

const app = express();

// set dotenv to use process.env.*
dotenv.config();

// middleware
// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use cors
app.use(cors());

// static folder
app.use(express.static("public"));

// View engine
app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      datetimeFormat: (datetime, format) => datetime ? moment(datetime).format(format) : '',
      currency: (number) => new Intl.NumberFormat().format(number),
      equal: (a, b) => a.equals(b),
      not_equal: (a, b) => a != b,
      concat: (a, b) => a + " " + b,
      findStatus: (array, needle) => array[needle],
      discount: (discount, price) => price * (1 - discount),
    },
  })
);
app.set("view engine", "hbs");

// Set views folder
app.set("views", path.join(path.resolve(), "resources/views"));

// routes
app.use("/", routes);

mongoose
  .connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);

export default app;
