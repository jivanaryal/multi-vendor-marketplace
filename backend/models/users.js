import db from "../database/connect.js";

const createUser = async (fullname, email, password) => {
    try {
        const result = await db`
        INSERT INTO users(fullname,email,password,role)
        VALUES(${fullname},${email},${password},'user')
         RETURNING *;
        `;
        return result[0];
    } catch (error) {
        
    }
}

export {
    createUser
}