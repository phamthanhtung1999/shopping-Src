import { paginate, createProduct, getProductById, updateProduct } from "../../repositories/productRepo.js";
import {
  mongooseToObj,
  multipleMongooseToObj,
} from "../../helpers/mongooseHelper.js";
import { ADMIN_PAGE_LIMIT } from "../../../config/app.js";
import { getAll } from "../../repositories/categoryRepo.js";
import path from "path";
import fs from "fs";

export const index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  let data = await paginate(page, ADMIN_PAGE_LIMIT, {}, [
    "name",
    "unitPrice",
    "stock",
    "createdAt",
    "updatedAt",
  ]);
  data.docs = multipleMongooseToObj(data.docs);
  res.render("product/list", {
    data: data.docs,
    lastPage: data.totalPages,
    currentPage: data.page,
    hasNext: data.hasNextPage,
    hasPrev: data.hasPrevPage,
  });
};

export const create = async (req, res) => {
  const categories = multipleMongooseToObj(await getAll());
  res.render("product/create", { categories: categories });
};

export const store = async (req, res) => {
  const data = req.body;
  const tempPath = req.file.path;

  let targetPath = path.join(
    process.env.INIT_CWD,
    "/public/images/" + req.file.originalname
  );
  let imagePath = "images/" + req.file.originalname;
  if ([".png", ".jpeg"].includes(path.extname(req.file.originalname).toLowerCase())) {
    if (fs.existsSync(targetPath)) {
        imagePath = "images/" + Date.now() + '-' + Math.round(Math.random() * 1E9) + req.file.originalname;
        targetPath = path.join(
            process.env.INIT_CWD,
            "/public/" + imagePath
        );
    }
    fs.rename(tempPath, targetPath, err => {
        if (err) {
            console.log(err);
        }
    })
  }

  data.imagePath = imagePath;

  const product = await createProduct(data);

  if (product.error) {
    res.render("product/create", { error: product.message });
  } else {
    res.redirect("/products");
  }
};

export const edit = async (req, res) => {
  const categories = multipleMongooseToObj(await getAll());
  const product = mongooseToObj(await getProductById(req.params.id));

  if (product) {
    res.render("product/edit", { model: product, categories: categories });
  } else {
    res.render("404", { layout: "error" });
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const product = await updateProduct(id, data);

  if (product.error) {
    res.render("product/create", { error: product.message });
  } else {
    res.redirect("/products");
  }
};
