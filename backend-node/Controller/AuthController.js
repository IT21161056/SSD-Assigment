const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { CustomError } = require("../exceptions/baseException");

// @desc Login
// @route POST /auth
// @access Public

const accessTokenExpiresIn = "1m"; // Access token expiry
const refreshTokenExpiresIn = "7d";

const login = asyncHandler(async (req, res) => {
  const { regNumber, password } = req.body;

  if (!regNumber || !password)
    throw new CustomError("All fields are required", 400);

  const foundUser = await User.findOne({ regNumber }).exec();

  if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
    // generateToken(res, foundUser._id);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          regNumber: foundUser.regNumber,
          initials: foundUser.initials,
          lastName: foundUser.lastName,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: accessTokenExpiresIn }
    );

    const refreshToken = jwt.sign(
      { regNumber: foundUser.regNumber },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: refreshTokenExpiresIn }
    );

    // Create secure cookie with refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    // Send accessToken containing regNumber and role

    res.json({ user: foundUser, accessToken });
  } else {
    throw new CustomError("Invalid email or password", 401);
  }
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  console.log("refresh token >>>", refreshToken);

  if (!refreshToken) throw new CustomError("Refresh token required", 401);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) throw new CustomError("Invalid refresh token", 403);

      const foundUser = await User.findOne({
        regNumber: decoded.regNumber,
      }).exec();

      if (!foundUser) throw new CustomError("User Not found", 403);

      const newAccessToken = jwt.sign(
        {
          UserInfo: {
            regNumber: foundUser.regNumber,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: accessTokenExpiresIn }
      );

      res.json({ accessToken: newAccessToken });
    })
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
