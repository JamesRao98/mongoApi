const mongoose = require("mongoose");

const PlayerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Players", PlayerSchema);