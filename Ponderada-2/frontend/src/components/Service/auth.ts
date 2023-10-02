import axios from 'axios';
const API_URL = 'http://localhost:3001/auth'

interface IAuth {
    message: string;
    token: string;
}

export const getAuthenticationToken = async (email: string, password: string): Promise<IAuth> => {
    const response = await axios.post(`${API_URL}/token`, 
    {
        "email": email,
        "password": password,     
    });
    return response.data;
}
