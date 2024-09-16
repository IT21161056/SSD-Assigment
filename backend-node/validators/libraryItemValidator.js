const { body, param, validationResult } = require("express-validator");

// Validation rules for adding an item

const validateAddLibraryItem = [
  body("faculty").notEmpty().withMessage("Faculty is required").escape(),
  body("year")
    .isISO8601()
    .withMessage("Date must be in a valid format (YYYY-MM--DD)")
    .escape(),
  body("subject").notEmpty().withMessage("Subject is required").escape(),
  body("pdf").optional().isURL().withMessage("Invalid PDF URL format"),
];

const getLibraryItemByIdValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),
];

const deleteLibraryItemByIdValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),
];

const validateAndSanitize = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateAddLibraryItem,
  getLibraryItemByIdValidator,
  deleteLibraryItemByIdValidator,
  validateAndSanitize,
};
