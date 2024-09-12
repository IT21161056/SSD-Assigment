const express = require("express");
const router = express.Router();
const {
  addSubject,
  getAllSubject,
} = require("../controller/SubjectController");

router.get("/", getAllSubject);
router.post("/add", addSubject);

module.exports = router;
