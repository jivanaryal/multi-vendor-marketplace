import express from "express";
import multer from "multer";
import { deleteCategory, getAllCategories, getDirectChild, getParentCategories, postCategories } from "../controllers/categories.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

cloudinary.config({ 
    cloud_name: 'dhuqhwez5', 
    api_key: '922586393391723', 
    api_secret: 'ggq1mErIKRv8VBwNzeEIzFDGj-U' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Use req.body.name instead of req.body.categoryName
        const folderName = `categories/${req.body.name || 'default_folder'}`;
        return {
            folder: folderName,
            allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        };
    },
});


const upload = multer({ storage: storage });

// Define routes
router.route("/").get(getAllCategories);
router.route("/parent").get(getParentCategories);
router.route("/:parentID").get(getDirectChild);
router.route("/", upload.array('images')).post(postCategories); // Use multer middleware
router.route("/:id").delete(deleteCategory);

export default router;
