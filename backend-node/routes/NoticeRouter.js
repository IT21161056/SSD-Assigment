const express = require("express");
const router = express.Router();
const {
  addNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  DeleteNotice,
} = require("../Controller/NoticeController");
const {
  validateNoticeById,
  validateDeleteNoticeById,
  validateAddNotice,
  validateAndSanitize,
} = require("../validators/noticeValidator");

router.get("/", getAllNotices);
router.post("/", validateAddNotice, validateAndSanitize, addNotice);
router.get("/:id", validateNoticeById, validateAndSanitize, getNoticeById);
router.put("/:id", updateNotice);
router.delete(
  "/:id",
  validateDeleteNoticeById,
  validateAddNotice,
  DeleteNotice
);

module.exports = router;
