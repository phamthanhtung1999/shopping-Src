import User from "../models/User.js";
import bcrypt from "bcrypt";
import { ADMIN_PAGE_LIMIT } from "../../config/app.js";

export const authenticate = async (email, password) => {
  if (email && password) {
    const user = await User.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return user;
      }
    }
  }

  return null;
};

export const getUserByEmail = async (email = "") => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    return null;
  }
};

export const paginate = async (page, conditions, select) => {
  const options = {
    page: page,
    limit: ADMIN_PAGE_LIMIT,
  };

  if (select) {
    options.select = select;
  }

  let query = conditions;
  query.deleted = false;

  try {
    const users = await User.paginate(query, options);

    return users;
  } catch (error) {
    return { error: true, message: error.message };
  }
};
