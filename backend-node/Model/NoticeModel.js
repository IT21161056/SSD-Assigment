const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const NoticeSchema = new Schema({
  faculty: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  notice: {
    type: String,
    required: true,
  },
});
module.exports = model("Notice", NoticeSchema);
