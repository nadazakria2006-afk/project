import { api } from "@/lib/api";

export const addAddress = async (data: { name: string; details: string; phone: string; city: string }, token: string) => {
    const res = await api.post("https://ecommerce.routemisr.com/api/v1/addresses", data, {
        headers: { token: token }
    });
    return res.data;
};

export const removeAddress = async (addressId: string, token: string) => {
    const res = await api.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
        headers: { token: token }
    });
    return res.data;
};

export const getSpecificAddress = async (addressId: string, token: string) => {
    const res = await api.get(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
        headers: { token: token }
    });
    return res.data;
};

export const getUserAddresses = async (token: string) => {
    const res = await api.get("https://ecommerce.routemisr.com/api/v1/addresses", {
        headers: { token: token }
    });
    return res.data;
};