const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    let token = req.headers.authorization;

    jwt.verify(token, 'check', (err, decoded)=> {
        if(err){
            res.send({"msg":"something went wrong","error":err.message,"ok":false});
        }
        if(decoded){
            req.body.userID = decoded.userID;
            next();
        } else {
            res.send({"msg":"Wrong Token","ok":false});
        }
    });
}

module.exports = {
    authenticate
}