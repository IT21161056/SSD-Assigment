const { body, param } = require("express-validator");

const validateAddNotice = [
  body("faculty")
    .notEmpty()
    .withMessage("Faculty is required")
    .isString()
    .withMessage("Faculty must be a string")
    .escape(),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601("Date must be in a valid format (YYYY-MM--DD)")
    .escape(),
  body("topic")
    .notEmpty()
    .withMessage("Notice content is required")
    .isString()
    .withMessage("Notice must be a string")
    .escape(),
  body("notice")
    .notEmpty()
    .withMessage("Notice content is required")
    .isString()
    .withMessage("Notice must be a string")
    .escape(),
];

const validateUpdateNotice = [
  param("id").isMongoId().withMessage("Invalid user id format"),
  body("faculty")
    .optional()
    .isString()
    .withMessage("Facuulty must be a string")
    .escape(),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be in a valid format (YYYY-MM--DD)")
    .escape(),
  body("topic")
    .optional()
    .isString()
    .withMessage("Notice must be a string")
    .escape(),
];

const validateNoticeById = [
  param("id").notEmpty().withMessage("Invalid ID format").escape(),
];

const validateDeleteNoticeById = [
  param("id").isMongoId().withMessage("Invalid ID format").escape(),
];

const validateAndSanitize = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateAddNotice,
  validateNoticeById,
  validateUpdateNotice,
  validateDeleteNoticeById,
  validateAndSanitize,
};
