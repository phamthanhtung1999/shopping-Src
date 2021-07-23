import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
var upload = multer();

import routes from "./routes/index.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(upload.array());

app.use(express.static('public'))

app.use('/api/v1', routes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

export default app;