const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');
const { authenticateToken, generateAccessToken } = require('../utils/authenticateToken');


const router = express.Router();

router.post("/signup", async (req, res)=> {
    const {
        firstName,
        lastName,
        password
    } = req.body;

    const email = req.body.email.toLowerCase();

    if(!firstName){
        return res.send({
            success: false,
            message: "Error: First Name field cannot be empty"
        });
    }

    if(!lastName){
        return res.send({
            success: false,
            message: "Error: Last Name field cannot be empty"
        });
    }

    if(!email){
        return res.send({
            success: false,
            message: "Error: Email field cannot be empty"
        });
    }

    if(!password){
        return res.send({
            success: false,
            message: "Error: Password field cannot be empty"
        });
    }

    User.find({
        email: email
    }, (err, existingUser) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: Server Error"
            });
        } else if (existingUser.length > 0) {
            return res.send({
                success: false,
                message: "Error: Email already exists"
            });
        }
        
        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = password;

        newUser.save((err, response) => {
            if(err){
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                });
            };
            
            return res.send({
                success: true,
                message: "User Sign up successfully"
            });
        });

    });
});

router.post("/signin", async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    if(!email){
        return res.send({
            success: false,
            message: "Error: Email field cannot be empty"
        });
    }

    if(!password){
        return res.send({
            success: false,
            message: "Error: Password field cannot be empty"
        });
    }

    User.find({
        email: email,
    }, async (err, users) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: Server Error"
            });
        } else if(users.length != 1){
            return res.send({
                success: false,
                message: "Error: DB Error"
            });
        }

        const user = users[0];
        const passwordPromise = await bcrypt.compare(password, user.password);
        
        if(!passwordPromise){
            return res.send({
                success: false,
                message: "Error: Invalid Password"
            });
        }


        const accessToken = generateAccessToken(user._id);
        res.json({
            success: true,
            accessToken: accessToken,
        });

    });
    
});

router.get("/verify/user", authenticateToken, (req, res) => {
    const userid = req.userid;
    console.log(userid);
    console.log("user verified...");
    User.find({ 
        _id: userid.user 
    }, (err, currentUser) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: DB Error"
            });
        }

        return res.send({
            success: true,
            user: currentUser
        });
    })
});


module.exports = router;