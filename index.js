const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const PORT = 3000
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
app.use(cors())
mongoose.connect(process.env.MONGO_URL);
// middleware
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})

