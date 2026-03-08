import { api } from "@/lib/api";

export const createCashOrder = async (cartId: string, shippingAddress: { details: string; phone: string; city: string }, token: string) => {
    const res = await api.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, { shippingAddress }, {

        headers: { token: token } 
    });
    return res.data;
};

export const createCheckoutSession = async (cartId: string, shippingAddress: { details: string; phone: string; city: string }, url: string, token: string) => {

    const res = await api.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, { shippingAddress }, {

        headers: { token: token } 
    });
    return res.data;
};

export const getUserOrders = async (userId: string) => {
    const res = await api.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
    return res.data;
};