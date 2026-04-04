const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

//  Store file in memory (NOT disk)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

//  Upload to Cloudinary
const uploadToCloudinary = (folder = "uploads") => {
  return async (req, res, next) => {
    try {
      if (!req.file) {
        return next(); // no file uploaded
      }

      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();

      // attach uploaded image URL to request
      req.fileUrl = result.secure_url;
      req.filePublicId = result.public_id;

      next();
    } catch (error) {
      return res.status(500).json({
        message: "File upload failed",
        error: error.message
      });
    }
  };
};

module.exports = {
  upload,
  uploadToCloudinary
};