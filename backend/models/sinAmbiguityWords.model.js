const mongoose = require("mongoose");

const SinAmbiSchema = new mongoose.Schema({
    sinWord: {
        type: String,
        required: true
    },
    engambiWords: {
        type: [String],
        required: true
    },
});

module.exports = mongoose.model("ambiSIN", SinAmbiSchema);