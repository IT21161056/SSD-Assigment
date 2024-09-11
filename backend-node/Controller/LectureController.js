const LectureModel = require("../Model/LectureModel");
const { CustomError } = require("../exceptions/baseException");
const { tryCatch } = require("../utils/tryCatchWrapper");
const path = require("path");
const cloudinary = require("../utils/cloudinary");

const fileInArray = [];

//getAll
const getAllLecture = tryCatch(async (req, res, next) => {
  const lectures = await LectureModel.find();

  if (!lectures) throw new CustomError("Not found");

  return res.status(200).json(lectures);
});

//add
const addLecture = tryCatch(async (req, res) => {
  console.log(req.files.length);
  console.log("Files", fileInArray);

  const {
    year,
    semester,
    topic,
    subject,
    date,
    time,
    discription,
    meeting_link,
  } = req.body;

  let pdf;

  for (let i = 0; i < fileInArray.length; i++) {
    let fileExtension = fileInArray[i][0].split(".")[1];
    console.log(path.resolve(__dirname, "../uploads"));

    if (fileExtension == "pdf") {
      pdf = await cloudinary.uploader.upload(
        `${path.resolve(__dirname, "../uploads")}/${fileInArray[i][0]}`,
        { pages: true }
      );
    }
  }

  const newPDF = new LectureModel({
    year,
    semester,
    topic,
    subject,
    date,
    time,
    description: discription,
    meeting_link,
    pdf: pdf.secure_url,
    cloudinary_id_pdf: pdf.public_id,
  });

  const response = await newPDF.save();

  res.json(response);
});

//getByid
const getLectureById = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const lecture = await LectureModel.findById(id);

  if (!lecture) throw new CustomError("Not found");

  return res.status(200).json(lecture);
});

//delete
const deleteLecture = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const lecture = await LectureModel.findByIdAndRemove(id);

  if (!lecture) throw new CustomError("cannot delete");

  return res.status(200).json({ message: `product ${id} deleted` });
});

// update
const updateLecture = tryCatch(async (req, res) => {
  const id = req.params.id;

  const {
    year,
    semester,
    topic,
    subject,
    date,
    time,
    discription,
    meeting_link,
  } = req.body;

  console.log(req.files.length);
  console.log("Files", fileInArray);
  // let img;

  let pdff;

  for (let i = 0; i < fileInArray.length; i++) {
    let fileext = fileInArray[i][0].split(".")[1];
    console.log(path.resolve(__dirname, "../uploads"));

    if (fileext == "pdf")
      pdff = await cloudinary.uploader.upload(
        `${path.resolve(__dirname, "../uploads")}/${fileInArray[i][0]}`,
        { pages: true }
      );
  }
  let pdf = await LectureModel.findByIdAndUpdate(id, {
    year,
    semester,
    topic,
    subject,
    date,
    time,
    description: discription,
    meeting_link,
    pdf: pdff.secure_url,
    cloudinary_id_pdf: pdff.public_id,
  });
  await pdf.save();

  res.json(pdf);
});

module.exports = {
  addLecture,
  deleteLecture,
  getLectureById,
  getAllLecture,
  updateLecture,
};
