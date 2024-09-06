const savedTranslationsRouter = require("express").Router();

const savedTranslationsCtrl = require("../controller/savedTranslations.controller");

savedTranslationsRouter.post('/inputTranslation', savedTranslationsCtrl.inputTranslation);
savedTranslationsRouter.get('/allTranslations', savedTranslationsCtrl.getAllTranslations);

module.exports = savedTranslationsRouter;