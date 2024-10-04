const mongoose = require("mongoose");

const wordslistSchema = new mongoose.Schema({

    englishWord: {
        type: String,
        required: true,
        trim: true,
    },

    sinhalaWord: {
        type: String,
        required: true,
        trim: true,
    },

    
});

module.exports = mongoose.model("Words_List",wordslistSchema);