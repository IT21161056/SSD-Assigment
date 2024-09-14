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
} = require("../middleware/userValidator");

router.get("/", getAllUsers);
router.post("/", apiRateLimitter, addUserValidator, addUser);
router.get("/:id", getUserByIdValidator, getUserById);
router.put("/:id", updateUserValidator, updateUser);
router.delete("/:id", deleteUserByValidator, deleteUserById);
router.post("/login", loginLimitter, loginValidator, login);

module.exports = router;
