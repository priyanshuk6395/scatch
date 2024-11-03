const express = require('express');
require('dotenv').config();
const db=require('./config/mongoose-connection');
const userModel = require('./models/user-model');
const postModel = require('./models/product-model');
const cookieParser=require('cookie-parser');
const path=require('path');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const ownerRouter = require('./routes/onwerRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

const app=express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));


app.use("/owners", ownerRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node connected at port : ${PORT}`);
});