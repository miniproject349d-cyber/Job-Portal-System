const express = require('express');
const authController = require("../controllers/auth.controller");
const authmiddleware=require("../middleware/auth.middleware")

const router = express.Router();

router.post('/register', authController.registerUser)

router.post('/login', authController.loginUser)

router.post('/logout', authController.logoutUser)

router.get('/getuser',authmiddleware.authJobseeker,authController.getUser)

router.patch('/patchuser',authmiddleware.authJobseeker,authController.patchUser)

module.exports = router;