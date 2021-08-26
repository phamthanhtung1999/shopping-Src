import { paginate, createProduct, getProductById, updateProduct } from "../../repositories/productRepo.js";
import {
  mongooseToObj,
  multipleMongooseToObj,
} from "../../helpers/mongooseHelper.js";
import { ADMIN_PAGE_LIMIT } from "../../../config/app.js";
import { getAll } from "../../repositories/categoryRepo.js";
import path from "path";
import fs from "fs";
import { getNextDiscount, getNextDiscountList, getActiveDiscountList, createDisc } from "../../repositories/discountRepo.js";
import moment from "moment";

export const index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  let data = await paginate(page, ADMIN_PAGE_LIMIT, {}, [
    "name",
    "unitPrice",
    "stock",
  ]);
  data.docs = multipleMongooseToObj(data.docs);

  const prodIds = data.docs.map(e => e._id);
  const discounts = await getActiveDiscountList(prodIds);
  const nexts = await getNextDiscountList(prodIds);

  data.docs.forEach(el => {
    el.currentDiscount = '0%';
    el.endDiscount = '';
    el.canDiscount = true;
    el.nextDiscount = '';
    
    const index = discounts.findIndex(e => e.product.equals(el._id))
    if (index != -1) {
      el.currentDiscount = (discounts[index].discount * 100) + '%';
      el.endDiscount = discounts[index].endDate;
      el.canDiscount = false;
    }
    const index2 = nexts.findIndex(e => e.product.equals(el._id))
    if (index2 != -1) {
      el.canDiscount = false;
      el.nextDiscount = (nexts[index2].discount * 100) + '%, start at ' + moment(nexts[index2].startDate).format('YYYY-MM-DD');
    }
  })

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

export const createDiscount = async (req, res) => {
  const product = mongooseToObj(await getProductById(req.params.id));

  if (product) {
    res.render("product/add-discount", { model: product });
  } else {
    res.render("404", { layout: "error" });
  }
};

export const storeDiscount = async (req, res) => {
  let product;
  try {
    product = await getProductById(req.params.id);
  } catch (error) {
    res.render("404", { layout: "error" });
  }

  let oldData = req.body;
  try {
    const discount = await getNextDiscount(product._id);
    if (discount) {
      throw new Error('Product is already in a discount section!')
    }

    let data = Object.assign({}, req.body);
    data.product = product._id;
    data.discount = parseInt(data.discount);
    if (!data.discount) {
      throw new Error('Discount must be a number');
    }
    data.discount = data.discount / 100;

    const disc = await createDisc(data);
    if (disc.error) {
      throw new Error(disc.message)
    }

    res.redirect('/products')
  } catch (error) {
    res.render('product/add-discount', { model: mongooseToObj(product), error: error.message, oldData: oldData })
  }  
}