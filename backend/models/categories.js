import db from "../database/connect.js"


const getCategories = async () => {
    const result = await db`
   SELECT * FROM categories
    `;
    return result;
}


const createCategory = async (name,parent_id) => {
    const result = await db`
    INSERT INTO categories(name,parent_id)VALUES(${name},${parent_id})
      RETURNING *;
    `;
    console.log(result)
    return result;
    
}


const deleteCat =async (id) => {
    const result = await db`
    delete from categories where id = ${id}
    RETURNING *;
    `;
    console.log(result);
    return result;
}



export {
    getCategories,
    createCategory,
    deleteCat
}