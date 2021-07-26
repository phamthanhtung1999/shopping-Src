import express from "express";

import apiRoutes from "./api.js";
import webRoutes from "./web.js";

const router = express.Router();

router.use('/api/v1', apiRoutes);
router.use('/', webRoutes);

router.use('*', (req, res) => {
    res.render('404', { layout: 'error' });
})

export default router;