const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function adminMiddleWare(req, res, next){
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    try {
        if(decodedValue.username){
            next();
        }else{
            res.status(403).json({
                "msg": "You are not authenticated"
            })
        }    
    } catch (error) {
        res.json({
            msg : "Incorrect inputs"
        })
    }
    
}

module.exports = adminMiddleWare