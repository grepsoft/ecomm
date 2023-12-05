// Import Axios library

import axios from "axios";


// URL of the server endpoint you want to retrieve data from
const baseUrl = 'http://localhost:30000/bags/api/v1';



const getProducts = async (from, limit) => {
    // Making a GET request using Axios
    const response = await axios.get(`${baseUrl}/product/pagination/${from}/${limit}`);
    return response.data;
}


export const ProductService = {
    getProducts: getProducts,
}