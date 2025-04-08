const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/user.controller");
// const {loginUser} = require("../controllers/user.controller");
const { body } = require("express-validator");


//     last_name,
// email,
// password

router.post("/user/register",[body("first_name").isLength({min:3}).withMessage("Minimum 3 characters required"),
body("last_name").isLength({min:3}).withMessage("Minimum 3 characters required"),
body("email").isEmail().withMessage("Invalid email address"),
body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
],registerUser);


router.post("/user/login", [body("email").isEmail().withMessage("Invalid email address"),
body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")], loginUser);


module.exports = router;




















