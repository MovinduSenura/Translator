const adminrouter= require("express").Router();
const adminCtrl = require('../controller/admin.controller');


adminrouter.post('/createadmin',adminCtrl.createAdmin);
adminrouter.get('/alladmins',adminCtrl.getAllAdmin);
adminrouter.get('/admin/:id',adminCtrl.getAdminById);
adminrouter.put('/updateadmin/:id',adminCtrl.updateAdminById);
adminrouter.delete('/deleteadmin/:id',adminCtrl.deleteAdminById);

module.exports = adminrouter;