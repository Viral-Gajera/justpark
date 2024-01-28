let multer = require("multer");
const path = require("path");

// Multuer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "file") {
            cb(null, path.join(__dirname, "../../public"));
        }
    },
    filename: (req, file, cb) => {
        let fileName = file.originalname.split(".");
        cb(null, Date.now() + "." + fileName[fileName.length - 1]);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "file") {
        cb(null, true);
    } else {
        throw new Error(
            "Form Data should only contain songThumbnail and songFile Fields"
        );
    }
};

// Multer Instance
let upload = multer({ storage, fileFilter });

// Multer Middleware
let uploadMiddleware = upload.fields([{ name: "file", maxCount: 10 }]);

async function uploadHandler(req, res) {
    let fileNames = req.files["file"].map((file) => file.filename);
    console.log(fileNames);
    res.status(200);
    res.json({
        isSuccess: true,
        message: "File uploaded successfully",
        data: {
            fileUrl: fileNames,
        },
    });
}

module.exports = { uploadMiddleware, uploadHandler };
