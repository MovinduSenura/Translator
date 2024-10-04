const savedTranslationsModel = require("../models/savedTranslations.model");

const inputTranslation = async (req, res) => {
    const { translation } = req.body;

    try {
        if (!translation) {
            return res.status(400).send({ message: "translation is required" });
        }
        const user = new savedTranslationsModel({ translation });
        const data = await user.save();
        res.send({ message: "Translation input successful!", data });
    } catch (err) {
        console.error("Translation input error:", err.message);
        res.status(500).send({ message: "An error occurred while inputting translation." });
    }
}

const getAllTranslations = async (req, res) => {
    try {
        const allTranslations = await savedTranslationsModel.find();
        return res.status(200).send({
            status: true,
            message: "✨ :: All translations are fetched",
            AllTranslations: allTranslations,
        });
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

const getTranslationById = async (req, res) => {
    const { id } = req.params;
    try {
        const translation = await savedTranslationsModel.findById(id);
        if (!translation) {
            return res.status(404).json({ message: 'Translation not found' });
        }
        res.json({ translation });
    } catch (error) {
        console.error('Error fetching translation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteSavedTranslations = async (req, res) => {
    try {
        const SavedTranslationID = req.params.id;
        const delSavedTranslation = await savedTranslationsModel.findByIdAndDelete(SavedTranslationID);
        return res.status(200).send({
            status: true,
            message: "✨ :: Saved Translation Deleted!",
        });
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

const updateTranslation = async (req, res) => {
    try {
        const SavedTranslationID = req.params.id;
        const { translation } = req.body;

        if (!translation) {
            return res.status(400).send({
                status: false,
                message: "All fields are required."
            });
        }

        const existingTranslation = {
            translation: translation,
        }

        await savedTranslationsModel.findByIdAndUpdate(SavedTranslationID, existingTranslation);
        return res.status(200).send({
            status: true,
            message: "✨ :: Translation Updated!",
        });
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

module.exports = {
    inputTranslation,
    getAllTranslations,
    getTranslationById, // Add this line
    deleteSavedTranslations,
    updateTranslation,
}
