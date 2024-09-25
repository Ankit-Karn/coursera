const { Router } = require("express");
const { courseModel } = require('../db');

const courseRouter = Router();

//purchase course
courseRouter.post('/purchase', (req, res) => {
    res.json({
        message: 'user purchased this course'
    })
})

//get all the courses
courseRouter.get('/preview', (req, res) => {
    res.json({
        message: 'see all courses'
    })
})

module.exports = {
    courseRouter: courseRouter
}