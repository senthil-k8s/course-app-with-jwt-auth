const { Router } = require('express');
const userMiddleWare = require('../middleware/user');
const { User } = require('../models/user');
const { Course } = require('../models/course');
const { JWT_SECRET } = require('../config');
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/signup", async (req, res)=>{
    const { username, password } = req.body;
    await User.create({
        username:username,
        password:password
    })

    res.json({
        "msg":"User created Successfully"
    })
})

router.post("/signin", async (req, res)=>{
    const {username, password} = req.body;

    const user = User.find({
        username:username,
        password:password
    })

    if(user){
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({token});
    }else{
        res.json({
            message: "User not Valid"
        })
    }
})

router.get("/courses", async (req, res) => {
    const resposne = await Course.find({});
    res.json({
        "courses":  resposne
    })
})

router.post("/courses/:courseId", userMiddleWare, async (req, res) => {
    const username = req.username;
    const courseId = req.params.courseId;
    await User.findOneAndUpdate({
        username:username
    },
    {
        "$push":{
            courses: courseId
        }
    })

    res.json({
        "msg" : "Course purchased sucessfully"
    })
})

router.get("/getPurchaseCourses", userMiddleWare, async (req, res) => {
    const username = req.username;
    const user = await User.find({
        username:username
    })
    const courses = user[0].courses;
    
    for (let index = 0; index < courses.length; index++) {
        const courseId = courses[index];
        const course = await Course.findById({
            _id: courseId
        })
        res.json(course)
    }
    
    
} )

module.exports = router;