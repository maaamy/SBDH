import fastapi from "../utils/fastapi";

const API_CUSTOMER_ML_URL = "/client"; 
export const fetchDashboard = async (clientId) => {
    const res = await fastapi.get(`${API_CUSTOMER_ML_URL}/dashboard/${clientId}`);
    return res.data;
};

export const fetchHistory = async (clientId) => {
    const res = await fastapi.get(`${API_CUSTOMER_ML_URL}/history/${clientId}`);
    return res.data;
};

export const fetchTrending = async (limit = 10) => {
    const res = await fastapi.get(`${API_CUSTOMER_ML_URL}/trending?limit=${limit}`);
    return res.data;
};

export const fetchRecommendations = async (clientId) => {
    const res = await fastapi.get(`${API_CUSTOMER_ML_URL}/recommendations/${clientId}`);
    return res.data;
};


