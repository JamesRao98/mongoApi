const express = require("express");
const router = express.Router();
const Player = require("../../models/v1/Player");

router.get("/:_id?", async (req, res) => {
    try {
        if(req.params._id) {
            res.status(200).json((await Player.findById(req.params._id)));
        }
        else {
            var options = {};
            if(req.query.sort) {
                options.sort = {};
                var direction = "asc";
                if(req.query.direction) {
                    direction = req.query.direction;
                }
                options.sort[req.query.sort] = direction;
            }

            if(req.query.limit) {
                options.limit = Number(req.query.limit);
            }

            if(req.query.skip) {
                options.skip = Number(req.query.skip);
            }
            
            res.status(200).json((await Player.find(req.query).setOptions(options)));
        }
    } catch (error) {
        console.log(error)
        if(error.message) {
            res.status(400).send(error.message);
        }
        else {
            res.status(500).send(error);
        }
    }
})

router.post("/", async (req, res) => {
    try {
        res.status(201).json((await (new Player({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })).save()));
    } catch (error) {
        if(error.message) {
            res.status(400).send(error.message);
        }
        else {
            res.status(500).send(error);
        }
    }
})

router.put("/:_id", async (req, res) => {
    try {
        res.status(200).json((await Player.findOneAndReplace({_id: req.params._id}, {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })));
    } catch (error) {
        if(error.message) {
            res.status(400).send(error.message);
        }
        else {
            res.status(500).send(error);
        }
    }
})

router.delete("/:_id", async (req, res) => {
    try {
        res.status(200).json((await Player.findOneAndRemove({_id: req.params._id})));
    } catch (error) {
        if(error.message) {
            res.status(400).send(error.message);
        }
        else {
            res.status(500).send(error);
        }
    }  
})

module.exports = router;