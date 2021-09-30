const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
    playerOne: {
        type: String,
        required: true
    },
    playerTwo: {
        type: String,
        required: true
    },
    outcome: {
        type: Number, // 0 => tie, 1 => Player One Won, 2 => Player Two Won
        required: true
    },
});

module.exports = mongoose.model("Games", GameSchema);