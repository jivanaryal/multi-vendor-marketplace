import express from "express";
import { deleteCategory, getAllCategories, getDirectChild, getParentCategories, postCategories } from "../controllers/categories.js";
const router = express.Router();


router.route("/").get(getAllCategories);
router.route("/parent").get(getParentCategories);
router.route("/:parentID").get(getDirectChild);
router.route("/").post(postCategories);
router.route("/:id").delete(deleteCategory);


export default router;