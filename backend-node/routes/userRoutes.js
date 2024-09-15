const express = require("express");
const router = express.Router();
const {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  login,
  updateUser,
} = require("../Controller/UserController");
const loginLimitter = require("../middleware/loginLimitter");
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
  apiRateLimitter,
  addUserValidator,
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
router.post(
  "/login",
  loginLimitter,
  loginValidator,
  validateAndSanitize,
  login
);

module.exports = router;
