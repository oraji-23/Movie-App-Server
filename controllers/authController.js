//REGISTER

const User = require("../models/user");
const bcrypt = require("bcrypt");
const customError = require("../utils/customError");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { email, password, repeatPassword } = req.body;
  if (!email) {
    return next(customError("Please Provide an Email", 400));
    // res.status(400).json({
    //   message: "please provide an Email",
    // });
  }
  if (!password) {
    return next(customError("Please provide a Password", 400));
    // res.status(400).json({
    //   message: "please provide a password",
    // });
  }

  if (password !== repeatPassword) {
    return next(customError("Password MisMatch", 400));
    // res.status(400).json({
    //   message: "password Mismatch",
    // });
  }

  //   Bcrypt is used for harshing and unharshing passwords

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // try to CREATE THE USER ON THE DATA BASE

  try {
    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    return res.status(200).json({ id: user._id, token });
  } catch (error) {
    if (error.code === 11000 && error.keyValue.email) {
      return next(customError("Email Already Exists", 400));
    }
    if (error.errors.email.message) {
      return next(customError(error.errors.email.message, 400));
    }
    next(customError("something went wrong", 500));
  }
};

//LOGIN
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(customError("Please Provide an Email", 400));
  }
  if (!password) {
    return next(customError("Please Provide a password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(customError("User does not exist", 400));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return next(customError("Wrong password", 401));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.status(200).json({
    token,
    id: user._id,
  });
};

const getUser = (req, res, next) => {
  const { userId } = req.user;
  res.status(200).json({ id: userId });
};

module.exports = { register, login, getUser };
