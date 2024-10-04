const savedTranslationsRouter = require("express").Router();
const savedTranslationsCtrl = require("../controller/savedTranslations.controller");

savedTranslationsRouter.post('/inputTranslation', savedTranslationsCtrl.inputTranslation);
savedTranslationsRouter.get('/allTranslations', savedTranslationsCtrl.getAllTranslations);
savedTranslationsRouter.get('/allTranslations/:id', savedTranslationsCtrl.getTranslationById); // Add this line
savedTranslationsRouter.delete('/deleteSavedTranslation/:id', savedTranslationsCtrl.deleteSavedTranslations);
savedTranslationsRouter.patch('/updateTranslation/:id', savedTranslationsCtrl.updateTranslation);

module.exports = savedTranslationsRouter;
