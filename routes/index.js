var express = require("express");
var router = express.Router();
const cloudinary = require("cloudinary").v2;

router.post("/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.photoFromFront) {
      return res.status(400).json({
        result: false,
        error: "No file uploaded",
      });
    }

    const file = req.files.photoFromFront;

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            result: false,
            error: error.message,
          });
        }

        res.json({
          result: true,
          url: result.secure_url,
        });
      },
    );

    uploadStream.end(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: false,
      error: error.message,
    });
  }
});

module.exports = router;
