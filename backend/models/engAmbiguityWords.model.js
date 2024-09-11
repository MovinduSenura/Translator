const mongoose = require("mongoose");

const EngAmbiSchema = new mongoose.Schema({
    engWord: {
        type: String,
        required: true
    },
    sinambiWords: {
        type: [String],
        required: true
    },
});

module.exports = mongoose.model("ambiENG", EngAmbiSchema);