// Import Axios library

import axios from "axios";


// URL of the server endpoint you want to retrieve data from
const baseUrl = 'http://localhost:30000/bags/api/v1';


const chat = async (message) => {
    console.log(message)
    // Making a GET request using Axios
    const response = await axios.post(`${baseUrl}/bot/`, {message: message});

    return response.data;
}


export const BotService = {
    chat: chat,
}