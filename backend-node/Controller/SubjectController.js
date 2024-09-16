const SubjectModel = require("../Model/SubjectModel");
const { tryCatch } = require("../utils/tryCatchWrapper");
const { CustomError } = require("../exceptions/baseException");

const getAllSubject = tryCatch(async (req, res, next) => {
  const subjects = await SubjectModel.find();

  if (!subjects) throw new CustomError("Resources Not found!", 404);

  return res.status(200).json(subjects);
});

const addSubject = tryCatch(async (req, res, next) => {
  const { faculty, year, subject } = req.body;

  const sub = new SubjectModel({
    faculty,
    year,
    subject,
  });

  const newSubject = await sub.save();

  if (!newSubject) throw new CustomError("unable to add");

  return res.status(201).json({ sub });
});

const deleteSubject = tryCatch(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new CustomError("ID is required");

  const subjectToDelete = await SubjectModel.findByIdAndDelete(id);

  if (!subjectToDelete) throw new CustomError("Subject not found", 400);

  return res.status(200).json(subjectToDelete);
});

module.exports = {
  getAllSubject,
  addSubject,
  deleteSubject,
};
