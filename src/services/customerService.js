import  api  from "../utils/api";

const API_CUSTOMER_URL = "/profil"; 
const API_PRODUCTS_URL = "/produits";


export const fetchCustomer = async ( id ) => {
  const res = await api.get(`${API_CUSTOMER_URL}/${id}`);
  return res.data.customer;
}

export const updateCustomerProfile = async ( form ) => {

  const res = await api.post(`${API_CUSTOMER_URL}/${form.id}`, form);
  return res.data.customer;
}

export const fetchAllProducts = async () => {
    const res = await api.get(`${API_PRODUCTS_URL}/`);
    return res.data.products;
};

export const fetchProductById = async (productId) => {
    const res = await api.get(`${API_PRODUCTS_URL}/${productId}`);
    return res.data.product;
};

export const fetchCart = async (clientId) => {
    const res = await api.get(`${API_CUSTOMER_URL}/${clientId}/cart`);
    return res.data.cart;
};

export const addToCart = async (clientId, variantId, quantity = 1) => {
    const res = await api.post(`${API_CUSTOMER_URL}/${clientId}/cart`, { variantId, quantity });
    return res.data.item;
};

export const updateCartItem = async (cartItemId, quantity) => {
    const res = await api.put(`${API_CUSTOMER_URL}/cart/${cartItemId}`, { quantity });
    return res.data.item;
};

export const removeCartItem = async (cartItemId) => {
    await api.delete(`${API_CUSTOMER_URL}/cart/${cartItemId}`);
};

export const createOrder = async (clientId, cartItems, total, adresseLivraison) => {
    const res = await api.post(`${API_CUSTOMER_URL}/${clientId}/orders`, {
        cartItems,
        total,
        adresseLivraison,
    });
    return res.data.order;
};

export const fetchOrders = async (clientId) => {
    const res = await api.get(`${API_CUSTOMER_URL}/${clientId}/orders`);
    return res.data.orders;
};

export const cancelOrder = async (orderId) => {
    const res = await api.put(`${API_CUSTOMER_URL}/orders/${orderId}/cancel`);
    return res.data.order;
};

export const fetchNotifications = async (userId) => {
    const res = await api.get(`${API_CUSTOMER_URL}/${userId}/notifications`);
    return res.data.notifications;
};

export const markNotificationAsRead = async (notificationId) => {
    await api.put(`${API_CUSTOMER_URL}/notifications/${notificationId}/read`);
};

export const addReview = async (clientId, productId, commentaire, note) => {
    const res = await api.post(`${API_CUSTOMER_URL}/reviews`, { clientId, productId, commentaire, note });
    return res.data.review;
};

export const fetchReviews = async (productId) => {
    const res = await api.get(`${API_CUSTOMER_URL}/reviews/${productId}`);
    return res.data.reviews;
};