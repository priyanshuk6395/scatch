const jwt = require('jsonwebtoken');
const ownerModel = require("../models/owner-model");

module.exports = async(req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","Login Required");
        return res.redirect("/");
    }
    try{
        let decoded= jwt.verify(req.cookies.token,process.env.SECRET);
        let owner=await ownerModel.findOne({_id:decoded.id}).select('-password');
        req.owner=owner;
        next();
    }catch{
        req.flash("error","something went wrong");
        res.redirect('/');
    }
}