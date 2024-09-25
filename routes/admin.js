const { Router } = require('express');
const { adminModel, courseModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_ADMIN_SECRET} = require('../config');
const { adminMiddleware} = require('../middlewares/admin');

const adminRouter = Router();

// admin sign up
adminRouter.post('/signup', async(req, res) => {

    try{
        const email = req.body.email;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
            email,
            password: hashedPassword
        });

        res.json({
            message: "Admin signed up!"
        })
    }catch(err){
        console.error(err);
        res.status(503).json({
            message: "Server Error"
        })
    }
})

// admin log in
adminRouter.post('/signin', async(req, res) => {

    try{
        const email = req.body.email;
        const password = req.body.password;

        const response = await adminModel.findOne({
            email
        })

        const passwordMatch = await bcrypt.compare(password, response.password);
        if(response && passwordMatch){
            const token = jwt.sign({
                id: response._id.toString()
            }, JWT_ADMIN_SECRET)

            res.json({
                token: token
            })
        }else{
            res.json({
                message: "Invalid credentials!"
            })
        }
    }catch(err){
        console.error(err);
        res.status(403).json({
            message: "Admin not found!"
        })
    }

})

// create course
adminRouter.post('/createCourse', adminMiddleware, async(req, res) => {

    try{
        const adminId = req.userId;
        const {title, desc, imageUrl, price} = req.body;

        const course = await courseModel.create({
            title, desc, price, imageUrl, creatorId: adminId
        })

        res.json({
            message: "course created!",
            courseId: course._id
        })
    }catch(err){
        res.status(403).json({
            message: "Could not create the course"
        })
    }   
})

//updating course content
adminRouter.put('/putCourseContent', adminMiddleware, async(req, res) => {
    try{
        const adminId = req.userId;
        const {courseId, title, desc, price, imageUrl} = req.body;

        const course = await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        },{
            title: title,
            desc: desc,
            price: price,
            imageUrl: imageUrl
        })

        res.json({
            message: "course updated",
            courseId: course._id
        })

    }catch(err){

    }
})

//get all created courses
adminRouter.get('/getAllCreatedCourses', adminMiddleware, async (req, res) => {
    
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    })

    res.json({
        message: "gettting all created courses",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}