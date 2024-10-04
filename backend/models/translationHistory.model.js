const mongoose = require('mongoose');

const translationHistorySchema = mongoose.Schema({
    english: { type: String, required: true, trim: true },
    sinhala: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }  // Optional: To track when the translation was saved
});

const translationHistoryModel = mongoose.model('TranslationHistory', translationHistorySchema);

module.exports = translationHistoryModel;
