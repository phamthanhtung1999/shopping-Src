import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({
    limits: {
        fileSize: 4 *  1024 * 1024, 
    },
    storage: storage,
});

export default upload;