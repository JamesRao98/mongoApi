const express = require("express");
const router = express.Router();
const Game = require("../../models/v1/Game");

router.get("/:id?", async (req, res) => {
    try {
        if(req.params._id) {
            res.status(200).json((await Game.findById(req.params._id)));
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

            res.status(200).json((await Game.find(req.query).setOptions(options)));
        }
    } catch (error) {
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
        res.status(201).json((await (new Game({
            playerOne: req.body.playerOne,
            playerTwo: req.body.playerTwo,
            outcome: req.body.outcome
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

router.put("/:id", async (req, res) => {
    try {
        res.status(200).json((await Game.findOneAndReplace({_id: req.params._id}, {
            playerOne: req.body.playerOne,
            playerTwo: req.body.playerTwo,
            outcome: req.body.outcome
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

router.delete("/:id", async (req, res) => {
    try {
        res.status(200).json((await Game.findOneAndRemove({_id: req.params._id})));
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