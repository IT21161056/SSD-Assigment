const express = require("express");
const router = express.Router();
const {
  addSubject,
  getAllSubject,
  deleteSubject,
} = require("../Controller/SubjectController");
const {
  subjectValidator,
  deleteSubjectValidator,
  validateAndSanitize,
} = require("../validators/subjectValidator");

router.get("/", getAllSubject);
router.post("/add", subjectValidator, validateAndSanitize, addSubject);
router.delete(
  "/:id",
  deleteSubjectValidator,
  validateAndSanitize,
  deleteSubject
);

module.exports = router;
