const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadRoot = path.join(__dirname, "../uploads");

const folders = {
    resume: "resumes",
    profileImage: "profile-images",
    companyDocument: "company-documents"
};

// Required upload folders automatically create karna
Object.values(folders).forEach((folder) => {
    const folderPath = path.join(uploadRoot, folder);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = folders[req.uploadType];

        if (!folder) {
            return cb(new Error("Invalid upload type"));
        }

        cb(null, path.join(uploadRoot, folder));
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();

        const uniqueName =
            `${Date.now()}-${require("crypto").randomUUID()}${extension}`;

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const allowedTypes = {
        resume: {
            extensions: [".pdf", ".doc", ".docx"],
            mimeTypes: [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ]
        },

        profileImage: {
            extensions: [".jpg", ".jpeg", ".png"],
            mimeTypes: ["image/jpeg", "image/png"]
        },

        companyDocument: {
            extensions: [".pdf"],
            mimeTypes: ["application/pdf"]
        }
    };

    const rules = allowedTypes[req.uploadType];

    if (
        !rules ||
        !rules.extensions.includes(extension) ||
        !rules.mimeTypes.includes(file.mimetype)
    ) {
        return cb(
            new Error("Invalid file type for this upload"),
            false
        );
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Maximum 5 MB
        files: 1
    }
});

const uploadResume = (req, res, next) => {
    req.uploadType = "resume";
    upload.single("file")(req, res, next);
};

const uploadProfileImage = (req, res, next) => {
    req.uploadType = "profileImage";
    upload.single("file")(req, res, next);
};

const uploadCompanyDocument = (req, res, next) => {
    req.uploadType = "companyDocument";
    upload.single("file")(req, res, next);
};

module.exports = {
    uploadResume,
    uploadProfileImage,
    uploadCompanyDocument
};
