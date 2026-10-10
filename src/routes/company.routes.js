const express= require('express');
const companyController=require("../controllers/company.controller");
const authmiddleware=require("../middleware/auth.middleware")
const companyModel = require('../models/company.model');


const router=express.Router();

router.post('/create',authmiddleware.authRecruiter,companyController.createCompany)
router.put('/update/:id',authmiddleware.authRecruiter,companyController.updateCompany)