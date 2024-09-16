const { body, param, validationResult } = require("express-validator");

const addLectureValidator = [
  body("year").notEmpty().withMessage("Year is required").trim().escape(),
  body("semester")
    .notEmpty()
    .withMessage("semester is required")
    .trim()
    .escape(),
  body("topic").optional().trim().escape(),
  body("subject").notEmpty().withMessage("Subject is required").trim().escape(),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage("Invalid date format")
    .trim()
    .escape(),
  body("time").notEmpty().withMessage("Time is required").trim().escape(),
  body("discription").notEmpty().withMessage("Description is required"),
  body("meeting_link")
    .optional()
    .isURL()
    .withMessage("Invalid URL")
    .trim()
    .escape(),
  body("pdf").optional().isURL().withMessage("Invalid PDF URL format"),
];

const updateLectureValidator = [
  body("year").optional().trim().escape(),
  body("semester").optional().trim().escape(),
  body("topic").optional().trim().escape(),
  body("subject").optional().trim().escape(),
  body("date")
    .optional()
    .isDate()
    .withMessage("Invalid date format")
    .trim()
    .escape(),
  body("time").optional().trim().escape(),
  body("discription").optional().trim().escape(),
  body("meeting_link")
    .optional()
    .isURL()
    .withMessage("Invalid URL")
    .trim()
    .escape(),
  body("pdf").optional().isURL().withMessage("Invalid PDF URL format"),
];

const getLectureByIdValidator = [
  param("id").isMongoId().withMessage("Invalid ID format"),
];

const deleteLectureValidator = [
  param("id").isMongoId().withMessage("Invalid ID format"),
];

const validateAndSanitize = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  addLectureValidator,
  updateLectureValidator,
  getLectureByIdValidator,
  deleteLectureValidator,
  validateAndSanitize,
};
