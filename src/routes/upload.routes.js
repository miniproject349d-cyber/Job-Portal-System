const express = require("express");

const {
    uploadResume,
    uploadProfileImage,
    uploadCompanyDocument
} = require("../middleware/uploadMiddleware");

const {
    uploadFile
} = require("../controllers/uploadController");

// Apne existing authentication middleware ka path use karna.
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/resume",
    authMiddleware,
    uploadResume,
    uploadFile
);

router.post(
    "/profile-image",
    authMiddleware,
    uploadProfileImage,
    uploadFile
);

router.post(
    "/company-document",
    authMiddleware,
    uploadCompanyDocument,
    uploadFile
);

module.exports = router;
