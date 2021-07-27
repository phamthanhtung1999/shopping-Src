import jwt from "jsonwebtoken";
import { TOKEN_EXPIRE } from "../../config/app.js";

export const generateToken = (email) => {
    const expiresIn = TOKEN_EXPIRE * 60;
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: expiresIn });
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}