const { Router } = require("express");
const { userModel } = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_USER_SECRET} = require('../config');
const userRouter = Router();
const bcrypt = require('bcrypt');

//user sign up
userRouter.post('/signup', async(req, res) => {

    try{
        const email = req.body.email;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedPassword
        })

        res.json({
            message: 'user signed up!'
        })
    }catch(err){
        console.error(err);
        res.status(403).json({
            message:"Something worng happend!"
        })
    }
})

// user log in
userRouter.post('/signin', async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const response = await userModel.findOne({email});

        const passwordMatch = await bcrypt.compare(password, response.password);

        if(response && passwordMatch){
            const token = jwt.sign({
                id: response._id.toString()
            }, JWT_USER_SECRET);

            res.json({
                token
            })
        }else{
            res.json({
                message: "Invalid Credentials!"
            })
        }
    }catch(err){
        console.error(err);
        res.status(403).json({
            message: "user not found!"
        })
    }
})

//get user purchased courses
userRouter.get('/purchases', (req, res) => {
    res.json({
        message: "User's purchased courses"
    })
})

module.exports = {
    userRouter: userRouter
}