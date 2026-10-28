const express = require('express');
const jobController = require("../controllers/job.controller");
const jobModel=require("../models/job.model")
const authmiddleware=require("../middleware/auth.middleware")

const router = express.Router();

router.post('/createjob',authmiddleware.authRecruiter,jobController.createJob);
router.get('/jobs' ,authmiddleware.authRecruiter,jobController.getAllJobs);
router.get('/jobs/:id' ,authmiddleware.authRecruiter,jobController.getJobById);
router.put('/jobs/:id' ,authmiddleware.authRecruiter,jobController.updateJob);
router.delete('/jobs/:id' ,authmiddleware.authRecruiter,jobController.deleteJob);



module.exports = router;