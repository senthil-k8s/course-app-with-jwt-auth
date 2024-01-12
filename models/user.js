const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
})

const User = mongoose.model('User', UserSchema);

module.exports = { User }