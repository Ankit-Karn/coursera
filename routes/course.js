const { Router } = require("express");
const { courseModel, purchaseModel } = require('../db');
const { userMiddleware } = require('../middlewares/user')

const courseRouter = Router();

//purchase course
courseRouter.post('/purchase', userMiddleware, async(req, res) => {

    try{
        const userId = req.userId;
        const courseId = req.body.courseId;

        await purchaseModel.create({
            userId,
            courseId
        })

        res.json({
            message: 'user purchased this course'
        })
    }catch(err){
        res.status(403).json({
            message: "you are not able to buy this course"
        })
    }
})

//get all the courses
courseRouter.get('/preview', async(req, res) => {

    const courses = await courseModel.find({})

    res.json({
        message: 'see all courses',
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}