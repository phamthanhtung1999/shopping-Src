const handle = async (req, res, next) => {
    try {
        const { details } = req.body;

        if (!details) {
            throw new Error('Order details is required')
        }
        if (!Array.isArray(details)) {
            throw new Error('Order details is must be an array')
        }
        details.forEach((row) => {
            if (typeof row === 'object' && row !== null) {
                if (!row.product_id || !row.quantity) {
                    throw new Error('Detail is not an valid Object')
                }
            } else {
                throw new Error('Detail is not an valid Object')
            }
        });
    

        next();
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export default handle