import { createCategory, deleteCat, getCategories } from "../models/categories.js"


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


const postCategories = async (req, res) => {

    try {
          const { name, parent_id } = req.body;
    if (!name) {
        res.status(404).json({ message: "name  are required " });
    }
    console.log("hello")

    const result = await createCategory(name, parent_id);
     res.status(200).json({message:"category added sucessfully",result});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
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
    deleteCategory

}