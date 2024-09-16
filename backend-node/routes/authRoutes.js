const express = require("express");
const router = express.Router();

const { login, refresh, logout } = require("../controller/AuthController");
const loginLimiter = require("../middleware/loginLimiter");
const {
  loginValidator,
  validateAndSanitize,
} = require("../validators/userValidator");

// const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router
  .route("/")
  .post(loginLimiter, loginValidator, validateAndSanitize, login);

router.route("/refresh").post(refresh);

router.route("/logout").post(logout);

module.exports = router;
