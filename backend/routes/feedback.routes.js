
const feedbackrouter= require("express").Router();
const feedbackCtrl = require('../controller/feedback.controller');

feedbackrouter.post('/createfeedback',feedbackCtrl.createfeedback);
feedbackrouter.get('/allfeedback',feedbackCtrl.getAllFeedback);
feedbackrouter.get('/feedback/:id',feedbackCtrl.getFeedbackById);
feedbackrouter.put('/updatefeedback/:id',feedbackCtrl.updateFeedbackById);
feedbackrouter.delete('/deletefeedback/:id',feedbackCtrl.deleteFeedbackById);

module.exports = feedbackrouter;