const express = require("express");
const router = express.Router();
const User = require("../../models/v1/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
    try {
        res.json((await (new User({
            email: req.body.email,
            password: (await bcrypt.hash(req.body.password, (await bcrypt.genSalt(10))))
        })).save()))
    } catch (error) {
        if(error.message) {
            res.status(400).send(error.message);
        }
        else {
            res.status(500).send(error);
        }
    }
})

router.post("/login", async (req, res) => {
    try {
        if(req.body.email && req.body.password) {
            let user = await User.findOne({
                email: req.body.email
            })
        
            if(!user) {
                res.status(400).send("Invalid email or password.");
            }
            
            if((await bcrypt.compare(req.body.password, user.password))) {
                let token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
                res.header("Authentication", token).send(token);
            }
            else {
                res.status(400).send("Invalid email or password.");
            }
        }
        else {
            res.status(400).send("Missing email or password.")
        }
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;