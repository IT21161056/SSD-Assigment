const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    lastName: {
      type: String,
      required: true, // Fixed typo: should be "required"
    },
    initials: {
      type: String,
      required: true, // Fixed typo: should be "required"
    },
    email: {
      type: String,
      required: true, // Fixed typo: should be "required"
    },
    mobileNumber: {
      type: String,
      required: true, // Fixed typo: should be "required"
    },
    faculty: {
      type: String,
      required: true, // Fixed typo: should be "required"
    },
    regNumber: {
      type: String,
      required: true, // Fixed typo: should be "required"
    },
    password: {
      type: String,
      required: true, // Fixed typo: should be "required"
    },
    role: {
      type: String,
      required: true,
      default: "student",
      enum: ["student", "user", "lecturer", "admin"], // Fixed roles
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing part
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// To check the password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model("User", UserSchema);
