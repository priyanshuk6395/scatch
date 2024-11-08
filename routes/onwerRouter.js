const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const {registerOwner,loginOwner,logout} =require('../controllers/ownerController');
const productSchema = require("../models/product-model");
const isOwnerin= require('../middlewares/isOwnerin');

router.get("/", isOwnerin,async (req, res) => {
  let products = await productSchema.find();
  res.render("admin",{products});
});
router.get("/login", async (req, res) => {
  let error=req.flash("error");
  res.render('owner-login',{error});
});

router.post("/login", loginOwner);
router.get("/create", async (req, res) => {
  let error=req.flash("error");
  res.render('owner-create',{error});
});
router.post("/create",registerOwner);


router.get("/admin", isOwnerin,(req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

router.get("/logout",logout);
module.exports = router;
