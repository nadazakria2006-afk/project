import { api } from "@/lib/api";

export const getCart = async (token: string) => {
    const res = await api.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: token }
    });
    return res.data;
};

export const addToCart = async (productId: string, token: string) => {
    const res = await api.post("/api/v1/cart", { productId }, {
        headers: { token: token }
    });
    return res.data;
};

export const updateCartItemQuantity = async (productId: string, count: number, token: string) => {
    const res = await api.put(`/api/v1/cart/${productId}`, { count }, {
        headers: { token: token }
    });
    return res.data;
};

export const removeFromCart = async (productId: string, token: string) => {
    const res = await api.delete(`/api/v1/cart/${productId}`, {
        headers: { token: token }
    });
    return res.data;
};

export const clearCart = async (token: string) => {
    const res = await api.delete("/api/v1/cart", {
        headers: { token: token }
    });
    return res.data;
};