const NoticeModel = require("../Model/NoticeModel");
const { tryCatch } = require("../utils/tryCatchWrapper");
const { CustomError } = require("../exceptions/baseException");

//getAll
const getAllNotices = tryCatch(async (req, res, next) => {
  const notices = await NoticeModel.find();

  if (!notices) throw new CustomError("Not found", 404);

  return res.status(200).json({ notices });
});

//add
const addNotice = tryCatch(async (req, res, next) => {
  const { faculty, date, topic, notice } = req.body;

  const notices = new NoticeModel({
    faculty,
    date,
    topic,
    notice,
  });
  const newNotice = await notices.save();

  if (!newNotice) throw new CustomError("unable to add.", 400);

  return res.status(201).json({ notices });
});

//getByid
const getNoticeById = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const notices = await NoticeModel.findById(id);

  if (!notices) throw new CustomError("Not found");

  return res.status(200).json({ notices });
});

//delete
const DeleteNotice = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const notices = await NoticeModel.findByIdAndRemove(id);

  if (!notices) throw new CustomError("cannot delete");

  return res.status(204).json({ message: `product ${id} deleted` });
});

//update
const updateNotice = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const { faculty, date, topic, notice } = req.body;

  const notices = await NoticeModel.findByIdAndUpdate(id, {
    faculty,
    date,
    topic,
    notice,
  });

  const newNotice = await notices.save();

  if (!newNotice) throw new CustomError("cannot update");

  return res.status(200).json({ message: "Update Successful." });
});

module.exports = {
  addNotice,
  updateNotice,
  DeleteNotice,
  getNoticeById,
  getAllNotices,
};
