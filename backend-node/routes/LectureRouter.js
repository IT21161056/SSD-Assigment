const express = require("express");
const router = express.Router();
const { upload } = require("../utils/multer");
const verifyJWT = require("../middleware/verifyJWT");

const {
  getLectureById,
  addLecture,
  updateLecture,
  getAllLecture,
  deleteLecture,
} = require("../Controller/LectureController");

router.post("/", upload.array("uploaded_Image", 10), addLecture);

router.use(verifyJWT);

router.get("/", getAllLecture);
router.post("/", addLecture);
router.get("/:id", getLectureById);
router.put("/:id", updateLecture);
router.delete("/:id", deleteLecture);

module.exports = router;
