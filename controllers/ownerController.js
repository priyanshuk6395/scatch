const ownerModel = require("../models/owner-model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes");
require("dotenv").config();

const OwnerSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

module.exports.registerOwner = async (req, res) => {
  try {
    // Validate the request body against the schema
    const { error } = OwnerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const owners = await ownerModel.findOne();
    if (owners) {
      req.flash("error", "Not authorized to create a new owner");
      return res.redirect("/Ownerlogin");
    }

    // Destructure validated fields from req.body
    const { fullname, email } = req.body;

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new owner
    const newOwner = await ownerModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate token and set cookie
    const token = jwt.sign({ email, id: newOwner._id }, process.env.SECRET, {
      expiresIn: "48h",
    });
    res.cookie("token", token);
    res.redirect("/owners/admin");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.loginOwner = async (req, res) => {
  try {
    // Validate the request body against the schema
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email, password } = req.body;

    // Check if the owner exists in the database
    const owner = await ownerModel.findOne({ email: email });
    if (!owner) {
      req.flash("error", "User does not exist");
      return res.render("Ownerlogin", { error: req.flash("error") });
    }

    // Check if the provided password is correct
    const isPasswordValid = await bcrypt.compare(password, owner.password);
    if (!isPasswordValid) {
      req.flash("error", "Invalid credentials");
      return res.render("owner-login", { error: req.flash("error") });
    }

    // Generate JWT token and set it in a cookie
    const token = jwt.sign({ email, id: owner._id }, process.env.SECRET, {
      expiresIn: "48h",
    });
    res.cookie("token", token, { httpOnly: true });

    // Redirect to admin page after successful login
    res.redirect("/owners/admin");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports.logout = (req, res) => {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.redirect("/")
};
