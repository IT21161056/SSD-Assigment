const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LibraryItemSchema = new Schema({
  faculty: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  cloudinary_id_img: {
    type: String,
    required: true,
  },
  cloudinary_id_pdf: {
    type: String,
    required: true,
  },
});

module.exports = model("LibraryItems", LibraryItemSchema);
