const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header('Authentication');
    if(token) {
        try {
            req.user = jwt.verify(token, process.env.TOKEN_SECRET);
            next();
            
        } catch (error) {
            res.status(400).send("Invalid token.");
        } 
    }
    else {
        res.status(401).send("Access denied.")   
    }
}
