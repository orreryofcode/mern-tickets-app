const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const User = require("../models/usersModel");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// desc:      Create a user
// method:    POST
// route:     '/api/users'
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include a name, email and password");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// desc:    Authenticate user
// route:   POST /api/users/login
// access:  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    console.log(password, user.password);
    throw new Error("Invalid user credentials.");
  }
});

// desc:         Send reset password email to user
// route:        POST /api/users/forgot-password
// access:       Public
const forgotPass = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  console.log(user);

  // Check if user exists with email
  if (!user) {
    res.status(400);
    throw new Error("No user found with this email.");
  }

  // generate email verification token
  const emailVerificationToken = generateToken(user._id);
  // store path in variable
  const url = `http://localhost:5000/api/users/forgot-password/${emailVerificationToken}`;

  // send the email to the registered user
  transporter.sendMail({
    to: email,
    subject: "Reset password",
    html: `Click <a href='${url}> here</a> to reset your password.`,
  });

  res.status(201).send({
    message: "Reset email sent.",
  });
});

// desc:         Send reset password email to user
// route:        put /api/users/forgot-password/:token
// access:       Public
const forgotPassVerify = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token) {
    res.status(422).json({
      message: "Missing Token",
    });
  }

  // Verify token from email
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }

  const user = await User.findOne({ _id: payload.id });
  if (!user) {
    res.status(404).json({
      message: "User does not exist",
    });
  }

  // Clear old password
  user.password = "";

  // Generate hashed password from new password submitted in req.body
  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);

  const filter = { _id: payload.id };
  const update = { password: newHashedPassword };

  // Update user's password
  const updatedUser = await User.findOneAndUpdate(filter, update);

  if (updatedUser) {
    res.status(201).json({
      message: "User password has been updated.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// desc:    Get user data
// route:   GET /api/users/me
// access:  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  createUser,
  loginUser,
  getMe,
  forgotPass,
  forgotPassVerify,
};
