const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubjectSchema = new Schema({
  faculty: { type: String },
  year: { type: Number },
  subject: { type: String },
});

module.exports = model("Subject", SubjectSchema);
