const multer = require("multer");
const path = require("path");

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";

        if (req.baseUrl.includes("users")) {
            folder = "users";
        } else if (req.baseUrl.includes("photos")) {
            folder = "photos";
        }

        cb(null, `uploads/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        // upload only png, jpg and jpeg format
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
            return cb(new Error("Por favor, envie apenas png, jpg ou jpeg!"));
        }
        cb(undefined, true);
    },
});

module.exports = { imageUpload };