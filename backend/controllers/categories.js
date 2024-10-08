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

    try {
        const { name, parent_id } = req.body;
        
    if (!name) {
        res.status(400).json({ message: "Name  is required " });
        }


        if (parent_id) {
            const isCategoryAvailable = await db`
           SELECT * FROM categories WHERE id = ${parent_id} 
        `;
            
            if (isCategoryAvailable.length === 0) {
                return res.status(404).json({ message: 'provided category is not available' });
            }
            if (isCategoryAvailable[0].haschildren === 'false') {
                await db`
                   update categories set haschildren = true where id = ${parent_id}    
                `;
                }
        }
    const result = await createCategory(name, parent_id);
        res.status(200).json({ message: "category added sucessfully", result });
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }

}


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