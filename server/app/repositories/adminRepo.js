import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";

export const authenticate = async (username, password) => {
    if (username && password) {
        const admin = await Admin.findOne({ username: username });
        if (admin) {
            const match = await bcrypt.compare(password, admin.password);

            if (match) {
                return admin;
            }
        }        
    }

    return null;
};

export const getAdminById = async (id = 0) => {
    try {
        const admin = await Admin.findById(id);
        return admin;
    } catch (error) {
        return null;
    }
}