const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
  res.send("hii");
});
if (process.env.NODE_ENV) {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(503).send("Not authorize to create new onwer");
    }
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send("Request body is empty");
    }
    
    
    let{fullname, email, password}=req.body;

    let createdOnwer=await ownerModel.create({
      fullname,
      email,
      password
    });

    res.status(201).send(createdOnwer);
  });
}

router.get("/admin",(req,res)=>{
  let success=req.flash("success");
  res.render("createproducts",{success});
})

module.exports = router;
