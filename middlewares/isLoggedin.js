const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async(req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","Login Required");
        return res.redirect("/");
    }
    try{
        let decoded= jwt.verify(req.cookies.token,process.env.SECRET);
        let user=await userModel.findOne({_id:decoded.id}).select('-password');
        req.user=user;
        next();
    }catch{
        req.flash("error","something went wrong");
        res.redirect('/');
    }
}