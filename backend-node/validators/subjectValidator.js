const { body, param, validationResult } = require("express-validator");

// Validation rules for add a subject

const subjectValidator = [
  body("faculty")
    .isString()
    .withMessage("faculty must be a string")
    .notEmpty()
    .withMessage("Faculty is required"),
  body("year")
    .isInt({ min: 1, max: 5 })
    .withMessage("Year must be an integer between 1 and 5"),
  body("subject")
    .isString()
    .withMessage("Subject must be a string")
    .notEmpty()
    .withMessage("Subject is required"),
];

// Validation rules for delete a subject by Id

const deleteSubjectValidator = [
  param("id").isMongoId().withMessage("Invalid subject id format"),
];

// Middleware Function

const validateAndSanitize = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  subjectValidator,
  deleteSubjectValidator,
  validateAndSanitize,
};
