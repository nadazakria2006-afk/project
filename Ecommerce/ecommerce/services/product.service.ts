import { api } from "@/lib/api";

export const getProducts = async (params?: any) => {

    const res = await api.get("https://ecommerce.routemisr.com/api/v1/products", { params });
    return res.data;
};

export const getProductDetails = async (id: string) => {
    const res = await api.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return res.data;
};