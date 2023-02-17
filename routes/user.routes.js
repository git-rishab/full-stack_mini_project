const express = require("express");
const {UserModel} = require("../models/user.models");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Creating user Data
userRoute.post("/create",async(req,res)=>{
    let data = await UserModel.find({email:req.body.email});
    if(data.length > 0){
        res.send({"msg":"User already exist","ok":false});
        return;
    }
    bcrypt.hash(req.body.password,5, async(err, hash)=> {
        let {username,email,password,location,DOB,role} = req.body;
        try {
            let data = new UserModel({username,email,password:hash,location,DOB,role});
            await data.save();
            res.send({"ok":true});
        } catch (error) {
            res.send(error);
        }
    });
    
})

// Checking if user Exists
userRoute.post("/check",async(req,res)=>{
    let {email} = req.body;
    try {
        let data = await UserModel.find({email});

        if(data.length > 0){
            bcrypt.compare(req.body.password, data[0].password, (err, result)=>{
                if(err){
                    res.send({"msg":err.message});
                }

                if(result){
                    var token = jwt.sign({ userID: data[0]._id }, 'check');
                    res.send({"ok":true,"token":token,"userID":data[0]._id});
                } else {
                    res.send({"ok":false,"msg":"wrong password"});
                }
            });
        } else {
            res.send({"ok":false,"msg":"User not found"});
        }
    } catch (error) {
        res.send({"ok":false,"msg":error.message});
    }
})



module.exports = {
    userRoute
}