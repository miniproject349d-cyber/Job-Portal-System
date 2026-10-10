const express= require('express');
const companyController=require("../controllers/company.controller");
const authmiddleware=require("../middleware/auth.middleware")
const companyModel = require('../models/company.model');
const profileController=require("../controllers/Profile.controller");


const router=express.Router();

router.post('/create',authmiddleware.authJobseeker,companyController.createCompany)
router.put('/update/:id',authmiddleware.authJobseeker,companyController.updateCompany)
router.post('/profile',authmiddleware.authJobseeker,profileController.createProfile)
router.get('/profile/:userId',authmiddleware.authJobseeker,profileController.getProfileByUserId)
router.put('/profile/:userId',authmiddleware.authJobseeker,profileController.updateProfile)


module.exports=router;
