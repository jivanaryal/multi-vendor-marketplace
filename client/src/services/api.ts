import axios from "axios";

export const BASE_URI = 'http://localhost:5000/api/mv/';


export async function getItem(url: string) {
    try {
          const response = await axios.get(`${BASE_URI}${url}`);
    if (response.status === 200) {
        return response.data;
    }
    
    else {
        console.log("error while fecthing the data")
      }
    } catch (error) {
        console.error(error);   
    }
  
}

