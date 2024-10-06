const wordslistrouter= require("express").Router();
const wordslistCtrl = require('../controller/wordslist.controller');


wordslistrouter.post('/createword',wordslistCtrl.createWord);
wordslistrouter.get('/allwords',wordslistCtrl.getAllWords);
wordslistrouter.get('/word/:id',wordslistCtrl.getWordById);
wordslistrouter.put('/updateword/:id',wordslistCtrl.updateWordById);
wordslistrouter.delete('/deleteword/:id',wordslistCtrl.deleteWordById);
wordslistrouter.get('/generateWordListReport',wordslistCtrl.generateWordListReport);

module.exports = wordslistrouter;