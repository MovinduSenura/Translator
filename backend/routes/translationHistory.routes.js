const translationHistoryRouter = require("express").Router();
const translationHistoryCtrl = require("../controller/translationHistory.controller");

translationHistoryRouter.post('/inputTranslation2', translationHistoryCtrl.inputTranslation);
translationHistoryRouter.get('/allTranslations2/:username', translationHistoryCtrl.getAllTranslations);
translationHistoryRouter.get('/generateHistoryReport/:username', translationHistoryCtrl.generateHistoryReport);

module.exports = translationHistoryRouter;
