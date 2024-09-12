const express = require("express");
const router = express.Router();
const {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  login,
  updateUser,
} = require("../controller/UserController");
const loginLimitter = require("../middleware/loginLimitter");
const apiRateLimitter = require("../middleware/apiRateLimitter");

router.get("/", apiRateLimitter, getAllUsers);
router.post("/", addUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUserById);
router.post("/login", loginLimitter, login);

module.exports = router;
