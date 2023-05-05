const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://www.flaticon.com/free-icon/user_10542486?term=user&page=1&position=15&origin=tag&related_id=10542486",
    },
  },
  {
    timestamps: true,
  }
);

// Before saving the user we've to encrypt our users password and then store them in DB .
userSchema.pre("save", async function (next) {
  // isModified is mongoose method , here if the password is not modified we'll move to next operation But if it is modified we'll bcrypt it before saving the data in DB .
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Decrypting the password that will help us in during login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
