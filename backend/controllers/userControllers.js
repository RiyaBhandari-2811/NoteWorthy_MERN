const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // We've to check if the user already exist in our database
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // If it doesn't exist then we'll create new user in DB
  // The create() method is a convenient and concise way to create a new document and save it to the database in a single step. It takes an object as an argument, representing the data for the new document, and returns a promise that resolves to the newly created document.
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // If user is sucessfully created then we'll send ok response
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured While Creating User !!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password !");
  }
});

module.exports = { registerUser, authUser };
