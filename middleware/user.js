const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function userMiddleWare(req, res, next){
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if(decodedValue.username){
        req.username = decodedValue.username;
        next();
    }else{
        res.status(403).json({
            "msg": "You are not authenticated"
        })
    }
}

module.exports = userMiddleWare