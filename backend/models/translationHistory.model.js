const mongoose = require("mongoose");

const translationHistorySchema = mongoose.Schema({
    translation: {
        type: String,
        required: true,
        trim: true,
    },

    // convertedTranslation: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
     
})

const translationHistoryModel = mongoose.model("translationHistory",translationHistorySchema);

module.exports = translationHistoryModel;