const router= require("express").Router();
const EngAmbiCtrl = require('../controller/engAmbiguityWords.controller');


router.post('/insertambiengword',EngAmbiCtrl.insertEngAmbiWrds);
router.get('/ambiengwords',EngAmbiCtrl.getAllEngAmbiWrds);
router.get('/ambiengword/:id',EngAmbiCtrl.getEngAmbiWrdById);
router.put('/updateambiengword/:id',EngAmbiCtrl.updateEngAmbiWrdById);
router.delete('/deleteambiengword/:id',EngAmbiCtrl.deleteEngAmbiWrdById);

module.exports =  router;