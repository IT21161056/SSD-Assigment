const multer = require("multer");
const uuid = require("uuid").v4;

const files = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    let filePath = [];
    console.log("MULTER ENTRY", file.originalname);
    console.log("FILES", req.files);

    const ext = path.extname(file.originalname);
    const id = uuid();
    filePath = `${id}${ext}`;
    fileInArray.push([filePath]);
    console.log("IN ARRAY ", filePath);
    files.push(fileInArray);
    console.log("PUSHED MAIN ARRAY", fileInArray);
    cb(null, filePath);
    console.log("current length", files.length);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, jpg, .jpeg and .pdf format allowed!"));
    }
  },
  storage: storage,
});

module.exports = { upload, storage };
