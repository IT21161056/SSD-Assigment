const { CustomError } = require("../exceptions/baseException");
const UserModel = require("../Model/UserModel");
const generateToken = require("../utils/generateToken");
const { tryCatch } = require("../utils/tryCatchWrapper");

const getAllUsers = tryCatch(async (req, res) => {
  const users = await UserModel.find({});

  if (!users) throw new CustomError("Resource not found!", 404);

  res.json(users);
});

const addUser = tryCatch(async (req, res, next) => {
  const {
    lastName,
    initials,
    email,
    mobileNumber,
    faculty,
    regNumber,
    password,
  } = req.body;

  const existingUser = await UserModel.findOne({ regNumber: regNumber });

  if (existingUser) throw new CustomError("User Is already existing!", 409);

  const newUser = new UserModel({
    lastName,
    initials,
    email,
    mobileNumber,
    faculty,
    regNumber,
    password,
  });

  let roleName = regNumber.toLowerCase();
  roleName = roleName.substring(3, 0);

  // console.log(result)
  if (roleName == "adm") {
    newUser.role = "admin";
  } else if (roleName == "lec") {
    newUser.role = "lecturer";
  } else {
    newUser.role = "student";
  }
  // console.log(result)
  const result = await newUser.save();

  if (!result) new CustomError("User creation failed!", 400);

  res.status(201).json(result);
});

const getUserById = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);

  if (!user) throw new CustomError("Not Found", 400);

  return res.status(200).json(user);
});

const deleteUserById = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await UserModel.findByIdAndRemove(id);

  if (!user) throw new CustomError("Cannot delete", 400);

  return res.status(200).json(user);
});

/*
    @UPDATE
*/
const updateUser = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const {
    lastName,
    initials,
    email,
    mobileNumber,
    faculty,
    regNumber,
    password,
    role,
  } = req.body;

  // Find the user by ID
  let user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  // Update user fields with the provided values
  user.lastName = lastName || user.lastName;
  user.initials = initials || user.initials;
  user.email = email || user.email;
  user.mobileNumber = mobileNumber || user.mobileNumber;
  user.faculty = faculty || user.faculty;
  user.regNumber = regNumber || user.regNumber;

  // Handle role assignment if regNumber is updated
  if (regNumber) {
    const roleName = regNumber.toLowerCase().substring(0, 3);
    if (roleName === "adm") {
      user.role = "admin";
    } else if (roleName === "lec") {
      user.role = "lecturer";
    } else {
      user.role = "student";
    }
  }

  // Update password only if provided (password hashing will be handled in pre-save hook)
  if (password) {
    user.password = password;
  }

  // Save the updated user to the database
  const updatedUser = await user.save();
  if (!updatedUser) throw new CustomError("User update failed!", 400);

  // Respond with the updated user data (excluding password)
  res.status(200).json(updateUser);
});

const login = tryCatch(async (req, res, next) => {
  const { regNumber, password } = req.body;
  console.log(req.body);

  const user = await UserModel.findOne({ regNumber: regNumber });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.lastName,
      email: user.email,
      role: user.role,
    });
  } else {
    throw new CustomError("Invalid email or password", 401);
  }
});

const logoutUser = tryCatch(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User logged out" });
});

//get user details
const getUserProfile = tryCatch(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    res.status(200).json(user);
  } else {
    throw new CustomError("User not found", 404);
  }
});

module.exports = {
  login,
  logoutUser,
  updateUser,
  getUserById,
  deleteUserById,
  addUser,
  getAllUsers,
};
