const express = require('express');
const router = express.Router();
const isLoggedin= require('../middlewares/isLoggedin');
const productSchema=require('../models/product-model');
const userModel = require('../models/user-model');

router.get("/", (req, res) => {
    let error = req.flash('error');
    res.render("index", { error ,loggedin:false});
});

router.get("/shop",isLoggedin,async(req,res)=>{
    let products=await productSchema.find();
    let success=req.flash("success");
    res.render("shop",{products,success});
});

router.get("/addtocart/:id", isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.id); 
        await user.save();
        req.flash("success", "Added to cart");
        res.redirect("/shop");
    } catch (error) {
        req.flash("error", "Could not add to cart");
        res.redirect("/shop");
    }
});

module.exports = router;