const { handleMongooseError } = require("../helpers");
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required(emailRegexp).messages({
    "any.required": `Missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `Missing required password field`,
  }),
});

const emailShema = Joi.object({
  email: Joi.string().required(emailRegexp).messages({
    "any.required": `Missing required email field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().required(emailRegexp).messages({
    "any.required": `Missing required email field`,
  }),
  password: Joi.string().required().messages({
    "any.required": `Missing required password field`,
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  emailShema,
  loginSchema,
  updateSubscriptionSchema,
  userEmailSchema,
};
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
