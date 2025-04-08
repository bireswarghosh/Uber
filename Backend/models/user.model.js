const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");










const user_schema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: [3, "Minimum 3 characters required"],
    maxlength: 20,
    required: true,
  },
  last_name: {
    type: String,
    minlength: [3, "Minimum 3 characters required"],
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Minimum 5 characters required"],
    maxlength: 50,
  },
    password: {
        type: String,
      required: true,
        select: false,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v); // At least one uppercase letter, one lowercase letter, one number, and at least 8 characters
            },
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.",
        },
        minlength: [8, "Minimum 8 characters required"],
        maxlength: 1024,
    },
    socket_id: {
        type: String,
    },
});




user_schema.methods.generateAuthToken = function () { // Fix syntax error
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: "24h" });
  return token;
};


user_schema.methods.comparePassword = async function (password)  {
    return await bcrypt.compare(password, this.password);
};


user_schema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};












const userModel = mongoose.model("User", user_schema);
module.exports = userModel;