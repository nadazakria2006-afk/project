import { api } from "@/lib/api";

export const getCategories = async () => {

    const res = await api.get("https://ecommerce.routemisr.com/api/v1/categories");
    return res.data; 

};

export const getCategoryDetails = async (id: string) => {
    const res = await api.get(`https://ecommerce.routemisr.com/api/v1/subcategories`);
    return res.data;
};