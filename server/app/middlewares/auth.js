import { verifyToken } from "../helpers/tokenHelper.js";
import { getAdminById } from "../repositories/adminRepo.js";
import { getUserByEmail } from "../repositories/userRepo.js";

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

export const userRestrict = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: "You need to login first" });
    }

    try {
        const { email } = verifyToken(token);
        req.user = await getUserByEmail(email);
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication Fail!" });
    }
}