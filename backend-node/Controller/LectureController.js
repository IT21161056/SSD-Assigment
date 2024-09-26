// const LectureModel = require("../Model/LectureModel");
// const { CustomError } = require("../exceptions/baseException");
// const { tryCatch } = require("../utils/tryCatchWrapper");
// const path = require("path");
// const cloudinary = require("../utils/cloudinary");

// const fileInArray = [];

// //getAll
// const getAllLecture = tryCatch(async (req, res, next) => {
//   const lectures = await LectureModel.find();

//   if (!lectures) throw new CustomError("Not found");

//   return res.status(200).json(lectures);
// });

// //add
// const addLecture = tryCatch(async (req, res) => {
//   console.log(req.files);

//   const {
//     year,
//     semester,
//     topic,
//     subject,
//     date,
//     time,
//     discription,
//     meeting_link,
//   } = req.body;

//   let pdfData = null;

//   if (req.files && req.files.length > 0) {
//     for (let file of req.files) {
//       let fileExtension = path.extname(file.originalname).toLowerCase();
//       if (fileExtension === ".pdf") {
//         pdfData = await cloudinary.uploader.upload(file.path, {
//           pages: true,
//         });
//       }
//     }
//   }

//   const newLecture = new LectureModel({
//     year,
//     semester,
//     topic,
//     subject,
//     date,
//     time,
//     discription: discription,
//     meeting_link,
//     pdf: pdfData ? pdfData.secure_url : null,
//     cloudinary_id_pdf: pdfData ? pdf.public_id : null,
//   });

//   const response = await newLecture.save();

//   res.status(201).json(response);
// });

// //getByid
// const getLectureById = tryCatch(async (req, res, next) => {
//   const id = req.params.id;
//   const lecture = await LectureModel.findById(id);

//   if (!lecture) throw new CustomError("Not found");

//   return res.status(200).json(lecture);
// });

// //delete
// const deleteLecture = tryCatch(async (req, res, next) => {
//   const id = req.params.id;
//   const lecture = await LectureModel.findByIdAndRemove(id);

//   if (!lecture) throw new CustomError("cannot delete");

//   return res.status(200).json({ message: `Lecture ${id} deleted` });
// });

// // update
// const updateLecture = tryCatch(async (req, res) => {
//   const id = req.params.id;

//   const {
//     year,
//     semester,
//     topic,
//     subject,
//     date,
//     time,
//     discription,
//     meeting_link,
//   } = req.body;

//   let pdfData = null;

//   if (req.files && equal.files.length > 0) {
//     for (let file of req.files) {
//       let fileExtension = path.extname(file.originalname).toLowerCase();
//       if (fileExtension === ".pdf") {
//         pdfData = await cloudinary.uploader.upload(file.path, { pages: true });
//       }
//     }
//   }

//   let updatedLecture = await LectureModel.findByIdAndUpdate(
//     id,
//     {
//       year,
//       semester,
//       topic,
//       subject,
//       date,
//       time,
//       discription: discription,
//       meeting_link,
//       pdf: pdfData ? pdfData.secure_url : undefined,
//       cloudinary_id_pdf: pdfData ? pdfData.public_id : undefined,
//     },
//     { new: true }
//   );

//   if (!updatedLecture) throw new CustomError("Not found");
//   res.json(updatedLecture);
// });

// module.exports = {
//   addLecture,
//   deleteLecture,
//   getLectureById,
//   getAllLecture,
//   updateLecture,
// };

const LectureModel = require("../Model/LectureModel");
const { CustomError } = require("../exceptions/baseException");
const { tryCatch } = require("../utils/tryCatchWrapper");
const path = require("path");
const cloudinary = require("../utils/cloudinary");

const fileInArray = [];

// Get all lectures
const getAllLecture = tryCatch(async (req, res, next) => {
  const lectures = await LectureModel.find();

  if (!lectures || lectures.length === 0) throw new CustomError("Not found", 404);

  return res.status(200).json(lectures);
});

// Add new lecture
const addLecture = tryCatch(async (req, res) => {
  console.log(req.files);

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

  let pdfData = null;

  if (req.files && req.files.length > 0) {
    for (let file of req.files) {
      let fileExtension = path.extname(file.originalname).toLowerCase();
      if (fileExtension === ".pdf") {
        pdfData = await cloudinary.uploader.upload(file.path, {
          pages: true,
        });
      }
    }
  }

  const newLecture = new LectureModel({
    year,
    semester,
    topic,
    subject,
    date,
    time,
    discription: discription,
    meeting_link,
    pdf: pdfData ? pdfData.secure_url : null,
    cloudinary_id_pdf: pdfData ? pdfData.public_id : null,
  });

  const response = await newLecture.save();

  return res.status(201).json(response);
});

// Get lecture by ID
const getLectureById = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const lecture = await LectureModel.findById(id);

  if (!lecture) throw new CustomError("Lecture not found", 404);

  return res.status(200).json(lecture);
});

// Delete lecture by ID
const deleteLecture = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const lecture = await LectureModel.findByIdAndRemove(id);

  if (!lecture) throw new CustomError("Lecture not found", 404);

  return res.status(200).json({ message: `Lecture ${id} deleted` });
});

// Update lecture by ID
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

  let pdfData = null;

  if (req.files && req.files.length > 0) {
    for (let file of req.files) {
      let fileExtension = path.extname(file.originalname).toLowerCase();
      if (fileExtension === ".pdf") {
        pdfData = await cloudinary.uploader.upload(file.path, { pages: true });
      }
    }
  }

  let updatedLecture = await LectureModel.findByIdAndUpdate(
    id,
    {
      year,
      semester,
      topic,
      subject,
      date,
      time,
      discription: discription,
      meeting_link,
      pdf: pdfData ? pdfData.secure_url : undefined,
      cloudinary_id_pdf: pdfData ? pdfData.public_id : undefined,
    },
    { new: true }
  );

  if (!updatedLecture) throw new CustomError("Lecture not found", 404);

  return res.status(200).json(updatedLecture);
});

module.exports = {
  addLecture,
  deleteLecture,
  getLectureById,
  getAllLecture,
  updateLecture,
};
