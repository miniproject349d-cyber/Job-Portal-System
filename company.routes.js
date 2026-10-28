const express= require('express');
const companyController=require("../controllers/company.controller");
const authmiddleware=require("../middleware/auth.middleware")
const companyModel = require('../models/Company');


const router=express.Router();

router.post('/create',authmiddleware.authRecruiter,companyController.createCompany)
router.put('/update/:id',authmiddleware.authRecruiter,companyController.updateCompany)

module.exports=router;