const express= require('express');
const router= express.Router();
const {registerUser,loginUser,logout} =require('../controllers/authController');
const isLoggedin= require('../middlewares/isLoggedin');
const userModel = require('../models/user-model');


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/cart",isLoggedin,async(req,res)=>{
    let user = await userModel.findOne({ email: req.user.email }).populate('cart');
    res.render("cart",{user});
});
router.get("/logout",logout);
module.exports=router;