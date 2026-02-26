var express = require("express");
var router = express.Router();

const uniqid = require("uniqid"); // Donne un nom aléatoire
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

router.post("/upload", async (req, res) => {
  console.log(req.files.photoFromFront);
  const photoPath = `./tmp/${uniqid()}.jpg`; //Route vers l'emplacement de la sauvegarde temporaire
  const resultMove = await req.files.photoFromFront.mv(photoPath); //Sauvegarde temporaire

  if (!resultMove) {
    // Si la sauvegarde a fonctionnée

    const resultCloudinary = await cloudinary.uploader.upload(photoPath); //On stock dans Cloudinary
    fs.unlinkSync(photoPath); //On suprime le fichier temporaire

    res.json({ result: true, url: resultCloudinary.secure_url });
  } else {
    res.json({ result: false, error: resultMove });
  }
});

module.exports = router;
