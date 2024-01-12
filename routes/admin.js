const { Router } = require('express')
const adminMiddleWare = require('../middleware/admin');
const { Admin } = require('../models/admin');
const { Course } = require('../models/course');
const { JWT_SECRET } = require('../config');
const { User } = require('../models/user');
const router = Router();
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        "msg": "Admin created Successfully"
    })
})

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const user = User.find({
        username,
        password
    })

    if (user) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({
            token
        })
    }else{
        res.status(411).json({
          message : "You are not valid user"
        })
    }

})

router.post("/courses", adminMiddleWare, async (req, res) => {
    const { title, description, price, imageLink } = req.body;
    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    })

    res.json({
        "msg": "Course created successfully",
        "CourseId": newCourse._id
    })
})

router.get('/courses', adminMiddleWare, async (req, res) => {
    const response = await Course.find({})
    res.json(response);

})

module.exports = router;