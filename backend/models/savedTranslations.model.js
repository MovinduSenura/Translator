const mongoose = require("mongoose");

const savedTranslationsSchema = mongoose.Schema({
    translation: {
        english: { type: String, required: true, trim: true },
        sinhala: { type: String, required: true, trim: true },
    },
});

const savedTranslationsModel = mongoose.model("savedTranslation", savedTranslationsSchema);

module.exports = savedTranslationsModel;
