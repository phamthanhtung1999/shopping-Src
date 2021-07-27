import {
  mongooseToObj,
  multipleMongooseToObj,
} from "../../helpers/mongooseHelper.js";
import { paginate } from "../../repositories/userRepo.js";

export const index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  let data = await paginate(page, {});
  
  res.render("user/list", {
    data: multipleMongooseToObj(data.docs),
    lastPage: data.totalPages,
    currentPage: data.page,
    hasNext: data.hasNextPage,
    hasPrev: data.hasPrevPage,
  });
};
