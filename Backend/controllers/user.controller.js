const user_model = require("../models/user.model");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req); // Fix syntax error here
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { first_name, last_name, email, password } = req.body;

  // Ensure `findOne` is awaited
  const userAlreadyExist = await user_model.findOne({ email });

  if (userAlreadyExist) {
    return res
      .status(400)
      .json({ success: false, message: "User Already Exist" }); // Fix `success` value
  }

  const hashPassword = await user_model.hashPassword(password);

  const user = new user_model({
    first_name,
    last_name,
    email,
    password: hashPassword,
  });

  try {
    await user.save(); // Use `await` for save
    const token = user.generateAuthToken(); // Generate token after saving user
    res.status(201).json({
      success: true,
      message: "User Created Successfully", // Fix typo in `message`
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message }); // Fix typo in `message`
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req); // Fix syntax error here
  if (!errors.isEmpty()) { // Add missing parentheses
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const isEmailExist = await user_model.findOne({ email }).select("+password");

  if (!isEmailExist) {
    return res.status(400).json({ success: false, message: "Invalid email or password" }); // Fix `success` and `message` typos
  }

  const isPasswordMatch = await isEmailExist.comparePassword(password); // Call `comparePassword` on the user instance

  if (!isPasswordMatch) {
    return res.status(400).json({ success: false, message: "Invalid email or password" }); // Fix `success` and `message` typos
  }

  const token = isEmailExist.generateAuthToken(); // Generate token after checking password
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    token,
    user: isEmailExist,
  });
};


