import express from "express";
import { deleteCategory, getAllCategories, postCategories } from "../controllers/categories.js";
const router = express.Router();


router.route("/").get(getAllCategories);
router.route("/").post(postCategories);
router.route("/:id").delete(deleteCategory);


export default router;