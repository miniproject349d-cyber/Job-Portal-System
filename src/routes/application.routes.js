const express=require('express');
const applicationController=require("../controllers/application.controller");
const authmiddleware=require("../middleware/auth.middleware")
const applicationModel = require('../models/application.model');

const router=express.Router();

router.post('/create',authmiddleware.authJobseeker,applicationController.createApplication)
router.get('/all',authmiddleware.authJobseeker,applicationController.getAllApplications)
router.get('/:id',authmiddleware.authJobseeker,applicationController.getApplicationById)

module.exports=router;