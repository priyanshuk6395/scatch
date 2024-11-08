const express = require('express');
const router = express.Router();
const isLoggedin= require('../middlewares/isLoggedin');
const productSchema=require('../models/product-model');

router.get("/", (req, res) => {
    let error = req.flash('error'); // Or use [] if `error` is an array
    res.render("index", { error });
});

router.get("/shop",isLoggedin,async(req,res)=>{
    let products=await productSchema.find();
    console.log(products);
    res.render("shop",{products});
});
module.exports = router;