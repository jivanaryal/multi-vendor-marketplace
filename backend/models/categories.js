import db from "../database/connect.js"


const getCategories = async () => {
    const result = await db`
   SELECT * FROM categories
    `;
    return result;
}

const getParent = async () => {
    const result = await db`
    SELECT * FROM categories where parent_id is null;
    `;
    console.log(result)
    return result;
}

const getChild = async (id) => {
    const result = await db`
    SELECT * FROM categories where parent_id = ${id}
    `;
    return result;
}


const createCategory = async (name, parent_id, imageUrls) => {
    console.log(name,parent_id,imageUrls)
    const result = await db`
    INSERT INTO categories(name,parent_id,hasChildren,image_urls)VALUES(${name},${parent_id},false,${imageUrls})
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
    deleteCat,
    getParent,
    getChild
}