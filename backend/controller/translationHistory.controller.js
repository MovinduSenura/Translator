const translationHistoryModel = require("../models/translationHistory.model");

const inputTranslation = async (req, res) => {
    const { translation } = req.body;

    try {
        if (!translation || !translation.english || !translation.sinhala) {
            return res.status(400).send({ message: "Both English and Sinhala translations are required" });
        }

        const newTranslation = new translationHistoryModel({
            english: translation.english,
            sinhala: translation.sinhala,
        });

        const savedTranslation = await newTranslation.save();
        res.status(200).send({ message: "Translation saved successfully!", data: savedTranslation });
    } catch (err) {
        console.error("Translation input error:", err.message);
        res.status(500).send({ message: "An error occurred while inputting translation." });
    }
}

const getAllTranslations = async (req, res) => {
    try {
        const allTranslations = await translationHistoryModel.find();
        res.status(200).send({
            status: true,
            message: "✨ :: All translations are fetched",
            AllTranslations: allTranslations,
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

module.exports = {
    inputTranslation,
    getAllTranslations,
}
