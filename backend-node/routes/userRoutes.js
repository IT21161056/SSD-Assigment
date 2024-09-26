const express = require("express");
const router = express.Router();
const {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser,
  userByEmail,
} = require("../controller/UserController");

// const loginLimiter = require("../middleware/loginLimiter");
const apiRateLimitter = require("../middleware/apiRateLimitter");

const {
  addUserValidator,
  updateUserValidator,
  deleteUserByValidator,
  getUserByIdValidator,
  loginValidator,
  validateAndSanitize,
} = require("../validators/userValidator");

router.get("/", getAllUsers);
router.post(
  "/",
  // apiRateLimitter,
  // addUserValidator,
  validateAndSanitize,
  addUser
);
router.get("/:id", getUserByIdValidator, validateAndSanitize, getUserById);
router.put("/:id", updateUserValidator, validateAndSanitize, updateUser);
router.delete(
  "/:id",
  deleteUserByValidator,
  validateAndSanitize,
  deleteUserById
);

router.post("/user-by-email", userByEmail);

module.exports = router;
