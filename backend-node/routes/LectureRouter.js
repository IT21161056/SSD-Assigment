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
} = require("../controller/LectureController");
const {
  addLectureValidator,
  updateLectureValidator,
  getLectureByIdValidator,
  deleteLectureValidator,
  validateAndSanitize,
} = require("../validators/lectureValidator");
const { checkRole } = require("../middleware/authMiddleware");

router.post("/", upload.array("uploaded_Image", 10), addLecture);

router.use(verifyJWT);

router.get("/", checkRole("student"), getAllLecture);
router.post("/", addLectureValidator, validateAndSanitize, addLecture);
router.get(
  "/:id",
  getLectureByIdValidator,
  validateAndSanitize,
  getLectureById
);
router.put("/:id", updateLectureValidator, validateAndSanitize, updateLecture);
router.delete(
  "/:id",
  deleteLectureValidator,
  validateAndSanitize,
  deleteLecture
);

module.exports = router;
