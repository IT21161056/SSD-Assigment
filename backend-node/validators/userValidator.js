const { body, validationResult, param } = require("express-validator");

// Validator for adding a new user

const addUserValidator = [
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .escape(),
  body("initials")
    .notEmpty()
    .withMessage("Initials is required")
    .trim()
    .escape(),
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("mobileNumber")
    .isMobilePhone()
    .withMessage("Invalid mobile Number")
    .trim()
    .escape(),
  body("faculty").notEmpty().withMessage("Faculty is required").trim().escape(),
  body("regNumber")
    .isLength({ min: 7, max: 7 })
    .withMessage("Registration number must be exact 7 chcarcters long")
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .trim()
    .escape(),
];

// Validator for updating a user

const updateUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),
  body("lastName").optional().trim().escape(),
  body("initials").optional().trim().escape(),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("mobileNumber")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid mobile Number")
    .trim()
    .escape(),
  body("faculty").optional().trim().escape(),
  body("regNumber")
    .optional()
    .isLength({ min: 7, max: 7 })
    .withMessage("Registration number must be exact 7 chcarcters long")
    .trim()
    .escape(),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must beat least 6 characters"),
];

// Validator for user login

const loginValidator = [
  body("email").notEmpty().withMessage("Email is required").trim().escape(),
  body("password")
    .notEmpty()
    .withMessage("Password must beat least 6 characters"),
];

// Validator for retiveving user by ID

const getUserByIdValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),
];

// Validator for deletign a user by ID

const deleteUserByValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),
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
  addUserValidator,
  updateUserValidator,
  deleteUserByValidator,
  getUserByIdValidator,
  loginValidator,
  validateAndSanitize,
};
