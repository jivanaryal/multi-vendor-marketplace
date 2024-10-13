import express from "express";
import multer from "multer";
import { deleteCategory, getAllCategories, getDirectChild, getParentCategories, postCategories } from "../controllers/categories.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dhuqhwez5',
  api_key: '922586393391723',
  api_secret: 'ggq1mErIKRv8VBwNzeEIzFDGj-U',
});

// Cloudinary storage configuration for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folderName = `categories/${req.body.name || 'default_folder'}`;
    return {
      folder: folderName,
      format: 'jpeg', // You can specify the format or let Cloudinary determine it
      public_id: file.originalname.split('.')[0], // Use original filename without extension
    };
  },
});

// Multer configuration with CloudinaryStorage
const upload = multer({ storage });

// Define routes
router.route("/").get(getAllCategories);
router.route("/parent").get(getParentCategories);
router.route("/:parentID").get(getDirectChild);

router.post("/", upload.array('images', 10),postCategories);

router.route("/:id").delete(deleteCategory);

export default router;
