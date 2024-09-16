const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { CustomError } = require("../exceptions/baseException");

const accessTokenExpiresIn = "1m";
const refreshTokenExpiresIn = "7d";

function createAccessToken(user, token) {
  return jwt.sign(
    {
      UserInfo: {
        regNumber: user.regNumber,
        initials: user.initials,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    },
    token,
    { expiresIn: accessTokenExpiresIn }
  );
}

function createRefreshToken(user, token) {
  return jwt.sign({ regNumber: user.regNumber }, token, {
    expiresIn: refreshTokenExpiresIn,
  });
}

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  console.log(req.body);

  if (!email || !password)
    throw new CustomError("All fields are required", 400);

  const foundUser = await User.findOne({ email }).exec();

  if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
    // generateToken(res, foundUser._id);

    const accessToken = createAccessToken(
      foundUser,
      process.env.ACCESS_TOKEN_SECRET
    );

    const refreshToken = createRefreshToken(
      foundUser,
      process.env.REFRESH_TOKEN_SECRET
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

      console.log("email >>>", decoded.email);

      const foundUser = await User.findOne({
        email: decoded.email,
      }).exec();

      if (!foundUser) throw new CustomError("User Not found", 403);

      const newAccessToken = createAccessToken(
        foundUser,
        process.env.ACCESS_TOKEN_SECRET
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
