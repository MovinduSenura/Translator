const router= require("express").Router();
const SinAmbiCtrl = require('../controller/sinAmbiguityWords.controller');


router.post('/insertambisinword',SinAmbiCtrl.insertSinAmbiWrds);
router.get('/ambisinwords',SinAmbiCtrl.getAllSinAmbiWrds);
router.get('/ambisinword/:id',SinAmbiCtrl.getSinAmbiWrdById);
router.put('/updateambisinword/:id',SinAmbiCtrl.updateSinAmbiWrdById);
router.delete('/deleteambisinword/:id',SinAmbiCtrl.deleteSinAmbiWrdById);

module.exports =  router;