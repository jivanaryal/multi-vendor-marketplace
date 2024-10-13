import db from "../database/connect.js";
import { createCategory, deleteCat, getCategories, getChild, getParent } from "../models/categories.js"


const getAllCategories = async (req, res) => {
    try {
        const result = await getCategories();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
       return res.status(500).json({error:"internal server error"})
    }
}
const getParentCategories = async (req, res) => {
    try {
        const result = await getParent();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
       return res.status(500).json({error:"internal server error"})
    }
}

const getDirectChild = async (req, res) => {
    const { parentID } = req.params;
    try {
        const result = await getChild(parentID);
        console.log(result);
        res.send(result);
    } catch (error) {
        
    }
}


const postCategories = async (req, res) => {
  console.log(req.body);  // Logs the body for debugging
  console.log(req.files);  // Logs the files uploaded

  try {
    const { name, parent_id } = req.body;
    const images = req.files || [];  // Ensure it's an empty array if no files are uploaded

    // Validate name
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Convert parent_id to null if it's 'null' string
    const normalizedParentId = parent_id === 'null' ? null : parent_id;

    if (normalizedParentId) {
      console.log("hello parent_id", normalizedParentId);

      // Check if the parent category exists
      const isCategoryAvailable = await db`SELECT * FROM categories WHERE id = ${normalizedParentId}`;
      if (isCategoryAvailable.length === 0) {
        return res.status(404).json({ message: 'Provided category is not available' });
      }

      // If the parent category has no children, update it
      if (isCategoryAvailable[0].haschildren === 'false') {
        await db`UPDATE categories SET haschildren = true WHERE id = ${normalizedParentId}`;
      }
    }

    // If images were uploaded, map their paths
    const imageUrls = images.length > 0 ? images.map(file => file.path) : [];

    // Create the category in the database
    const result = await createCategory(name, normalizedParentId, imageUrls);
    return res.status(200).json({ message: "Category added successfully", result });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};



const deleteCategory =async (req, res) => {
    const { id } = req.params;

    const result = await deleteCat(id);
    if (result.length === 0) {
        return res.status(404).json({ message: "category not found" })
    } 
    return res.status(200).json({ message: "category removed sucessfully", result })
   
    
}


export {
    getAllCategories,
    postCategories,
    deleteCategory,
    getParentCategories,
    getDirectChild

}