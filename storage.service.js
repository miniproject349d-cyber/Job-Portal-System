const { ImageKit, toFile } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file, originalName = "upload", mimeType = "application/octet-stream") {
    const payload = Buffer.isBuffer(file)
        ? file
        : file && file.buffer
            ? Buffer.from(file.buffer)
            : file;

    const fileToUpload = await toFile(payload, originalName, { type: mimeType });

    const result = await ImageKitClient.files.upload({
        file: fileToUpload,
        fileName: `${Date.now()}-${originalName.replace(/\s+/g, "-")}`,
        folder: "spotify-clone",
    });

    return result;
}

module.exports = { uploadFile };