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

    try{

        // Fetch all translations
        const allTranslations = await savedTranslationsModel.find();

        return res.status(200).send({
            status: true,
            message: "✨ :: All translations are fetched",
            AllTranslations: allTranslations,
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })
    }

}

const deleteSavedTranslations = async (req, res) => {

    try{

        const SavedTranslationID = req.params.id;
        const delSavedTranslation = await savedTranslationsModel.findByIdAndDelete(SavedTranslationID);

        return res.status(200).send({
            status: true,
            message: "✨ :: Saved Translation Deleted!",
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })
    }
}

const updateTranslation = async (req, res) => {
   
    try{

    const SavedTranslationID = req.params.id;
    const {translation} = req.body;

        // Check if any required field is missing or empty
        if (!translation) {
            return res.status(400).send({
                status: false,
                message: "All fields are required."
            });
        }

    const existingTranslation = {
        translation: translation,
    }

    const updateTranslationObj = await savedTranslationsModel.findByIdAndUpdate(SavedTranslationID, existingTranslation);

    return res.status(200).send({
        status: true,
        message: "✨ :: Translation Updated!",
    })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })
    }
}

module.exports = {
    inputTranslation,
    getAllTranslations,
    deleteSavedTranslations,
    updateTranslation,
}