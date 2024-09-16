const express = require("express");
const router = express.Router();
const {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controller/UserController");
// const loginLimiter = require("../middleware/loginLimiter");
const apiRateLimitter = require("../middleware/apiRateLimitter");

router.get("/", apiRateLimitter, getAllUsers);
router.post("/", addUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUserById);

module.exports = router;
