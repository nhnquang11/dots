require('dotenv').config();
const express = require('express');
const uploadRouter = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});
const upload = multer({ storage: storage });

uploadRouter.post('/', upload.single('image'), async (req, res) => {
  try {
    // console.log(req.file);
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path , {
       folder:'dots'
    });

    // Send the Cloudinary URL in the response
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  }
});

module.exports = uploadRouter
