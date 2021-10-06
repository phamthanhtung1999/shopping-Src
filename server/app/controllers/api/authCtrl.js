import { generateToken } from "../../helpers/tokenHelper.js";
import User from "../../models/User.js";
import { authenticate } from "../../repositories/userRepo.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticate(email, password);

        if (user) {
            const token = generateToken(user.email);
            const { email, firstName, lastName, phone, address } = user;
            res.json({
                user: { email, firstName, lastName, phone, address },
                token: token
            });
        } else {
            res.status(400).json({ message: "Wrong email or password!" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    const data = req.body

    data.password = await bcrypt.hash(data.password, 10);

    const user = new User(data);

    try {
        user.save((error) => {
            if (error) {
                const errorArray = error.errors;
                let message = "";
                for (const field in errorArray) {
                    message += errorArray[field].message + '\n';
                }
                res.status(400).json({ message: message || "Email has been registered" });
            } else {
                const token = generateToken(user.email);
                const { email, firstName, lastName, phone, address } = user;
                res.json({
                    user: { email, firstName, lastName, phone, address },
                    token: token
                });
            }
        });        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    // expire token

    res.status(203);
}

export const refresh = (req, res) => {
    let user = req.user;
    const token = generateToken(user.email);

    res.json({
        token: token
    })
}