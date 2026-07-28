import fastapi from "../utils/fastapi";
 
const API_ML_URL = "/ml"; 

export const fetchForecasts = async (entrepriseId) => {
    const res = await fastapi.get(`${API_ML_URL}/predictions/${entrepriseId}`);
    return res.data;
};

export const getMetrics = async (entrepriseId) => {
    const res = await fastapi.get(`${API_ML_URL}/metrics/${entrepriseId}`);
    return res.data;
};
