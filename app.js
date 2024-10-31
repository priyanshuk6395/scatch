const express = require('express');
const userModel = require('./model/user');
const postModel = require('./model/post');

const app=express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{

})

app.listr