const userModel=require('../models/user-model');
const Joi = require('joi');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { use } = require('../routes');
require('dotenv').config();


const userSchema = Joi.object({
    fullname: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required()
});

module.exports.registerUser=async (req, res) => {
    try {
        // Validate the request body against the schema
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message); // Send validation error message
        }

        // Destructure validated fields from req.body
        const { fullname, email } = req.body;
        let user= await userModel.findOne({email:email});
        if (user) {
            let error = req.flash('error'); // Or use [] if `error` is an array
    res.render("index", { error });
        }
        //encrypting password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(req.body.password,salt,async(err,hash)=>{
                if(err) return res.send(err.message);
                else{
                    // Create a new user
                    let newUser = await userModel.create({
                        fullname,
                        email,
                        password:hash
                    });
                    let token=await jwt.sign({email,id:newUser._id},process.env.SECRET,{expiresIn:'48h'});
                    res.cookie("token",token);
                    res.send("user created success");
                }
            });
        });
        
    } catch (err) {
        res.status(500).send(err.message); // Send server error message
    }
};

module.exports.loginUser=async (req, res) => {
    try {
        // Validate the request body against the schema
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message); // Send validation error message
        }

        // Destructure validated fields from req.body
        const { email } = req.body;
        let user= await userModel.findOne({email:email});
        if(!user) return res.status(401).send("User not exist");
        //checking password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).send("Invalid credentials");

        //cookie setup
        const token = jwt.sign({ email, id: user._id }, process.env.SECRET, { expiresIn: '48h' });
        res.cookie("token", token);

        //redirect
        res.redirect("/shop");
        
    } catch (err) {
        res.status(500).send(err.message); // Send server error message
    }
};

module.exports.logout=(req,res)=>{
    res.cookie="";
    res.redirect("/");
}