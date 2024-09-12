const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const PDF = require("../Model/LibraryItemModel");
const { CustomError } = require("../exceptions/baseException");
const { tryCatch } = require("../utils/tryCatchWrapper");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id = uuid();
    const filePath = `${id}${ext}`;
    cb(null, filePath);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jpeg and .pdf format allowed!"));
    }
  },
  storage: storage,
});

const addItem = tryCatch(async (req, res) => {
  upload.array("uploaded_Image", 10)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "File upload error" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files were uploaded" });
    }

    const fileInArray = [];
    let pdff;

    for (let file of req.files) {
      const ext = path.extname(file.originalname).slice(1); // e.g., 'pdf'
      const filePath = file.filename;
      fileInArray.push(filePath);

      if (ext === "pdf") {
        try {
          pdff = await cloudinary.uploader.upload(
            `${path.resolve(__dirname, "../uploads")}/${filePath}`,
            { pages: true }
          );
        } catch (uploadErr) {
          return res.status(500).json({ error: "PDF upload failed" });
        }
      }
    }

    const pdf = new PDF({
      faculty: req.body.faculty,
      year: req.body.year,
      subject: req.body.subject,
      pdf: pdff?.secure_url,
      cloudinary_id_pdf: pdff?.public_id,
    });

    await pdf.save();
    return res.json(pdf);
  });
});

const getAllItem = tryCatch(async (req, res) => {
  const pdfs = await PDF.find();
  res.json(pdfs);
});

const getItemById = tryCatch(async (req, res) => {
  const id = req.params.id;
  const pdf = await PDF.findById(id);

  if (!pdf) throw new CustomError("Resource not found!", 404);

  res.status(200).json({ pdf });
});

const deleteItem = tryCatch(async (req, res) => {
  const id = req.params.id;
  const pdf = await PDF.findByIdAndRemove(id);

  if (!pdf) throw new CustomError("Resource not found!", 404);

  res.status(200).json({ message: `Item ${id} deleted successfully` });
});

module.exports = { addItem, getAllItem, deleteItem, getItemById };
