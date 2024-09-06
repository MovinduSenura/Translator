const mongoose = require("mongoose");

const savedTranslationsSchema = mongoose.Schema({
    translation: {
        type: String,
        required: true,
        trim: true,
    },
     
})

const savedTranslationsModel = mongoose.model("savedTranslation",savedTranslationsSchema);

module.exports = savedTranslationsModel;