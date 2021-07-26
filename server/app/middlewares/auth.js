import { getAdminById } from "../repositories/authRepo.js";

export const restrict = (req, res, next) => {
    // next();
    if (req.session.userId) {
        next();
    } else {
        req.session.error = "Access denied!";
        res.redirect('/login');
    }
};

export const redirectHome = (req, res, next) => {
    // next();
    if (!req.session.userId) {
        next();
    } else {
        res.redirect('/');
    }
};

export const mapAdmin = async (req, res, next) => {
    const { userId } = req.session;
    if (userId) {
        res.locals.admin = await getAdminById(userId);
    }
    next();
}