const mongoose= require('mongoose');

const ownerSchema= mongoose.Schema({
    fullname: String,
    email:String,
    password:String,
    isAdmin: Boolean,
    Products: Array,
    gstin: String,
    picture: String
});

module.exports=mongoose.model("owner",ownerSchema);