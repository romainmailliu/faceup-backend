var express = require("express");
var router = express.Router();

const cloudinary = require("cloudinary").v2;

router.post("/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.photoFromFront) {
      return res.status(400).json({ result: false, error: "No file uploaded" });
    }

    const file = req.files.photoFromFront;

    const resultCloudinary = await cloudinary.uploader.upload(
      file.tempFilePath || file.data,
      {
        resource_type: "image",
      },
    );

    res.json({
      result: true,
      url: resultCloudinary.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false, error: error.message });
  }
});

module.exports = router;
