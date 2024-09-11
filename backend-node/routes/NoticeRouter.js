const express = require("express");
const router = express.Router();
const {
  addNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  DeleteNotice,
} = require("../Controller/NoticeController");

router.get("/", getAllNotices);
router.post("/", addNotice);
router.get("/:id", getNoticeById);
router.put("/:id", updateNotice);
router.delete("/:id", DeleteNotice);

module.exports = router;
