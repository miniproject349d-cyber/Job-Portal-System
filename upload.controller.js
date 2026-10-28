const uploadFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid file"
            });
        }

        const fileData = {
            originalName: req.file.originalname,
            fileName: req.file.filename,
            fileSize: req.file.size,
            fileType: req.file.mimetype,
            filePath: req.file.path
        };

        return res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "File upload failed"
        });
    }
};

module.exports = { uploadFile };
