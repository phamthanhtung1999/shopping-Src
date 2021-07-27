import { authenticate } from "../../repositories/adminRepo.js";

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await authenticate(username, password);

        if (admin) {
            req.session.userId = admin._id;            
            res.redirect('/');
        } else {
            req.session.error = "Wrong username or password!";
        }
    } catch (error) {
        req.session.error = "Something went wrong. Please try again later...";
    }
}

export const logout = (req, res) => {
    const { SESS_NAME = 'sid' } = process.env;
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }

        res.clearCookie(SESS_NAME);
        res.redirect('/login');
    });
}