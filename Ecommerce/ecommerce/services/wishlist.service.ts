import { api } from "@/lib/api";

export const getWishlist = async (token: string) => {
    const res = await api.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: token } 
    });
    return res.data;
};

export const addToWishlist = async (productId: string, token: string) => {
    const res = await api.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, {
        headers: { token: token }
    });
    return res.data;
};

export const removeFromWishlist = async (productId: string, token: string) => {
    const res = await api.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: token }
    });
    return res.data;
};