import { api } from "@/lib/api";

export const getAllReviews = async () => {
    const res = await api.get("/api/v1/reviews");
    return res.data;
};

export const getReviewById = async (id: string) => {
    const res = await api.get(`/api/v1/reviews/${id}`);
    return res.data;
};

export const getProductReviews = async (productId: string) => {
    const res = await api.get(`/api/v1/products/${productId}/reviews`);
    return res.data;
};

export const createReview = async (productId: string, data: { title: string; ratings: number }, token: string) => {
    const res = await api.post(`/api/v1/products/${productId}/reviews`, data, {
        headers: { token: token }
    });
    return res.data;
};

export const updateReview = async (reviewId: string, data: { title?: string; ratings?: number }, token: string) => {
    const res = await api.put(`/api/v1/reviews/${reviewId}`, data, {
        headers: { token: token }
    });
    return res.data;
};

export const deleteReview = async (reviewId: string, token: string) => {
    const res = await api.delete(`/api/v1/reviews/${reviewId}`, {
        headers: { token: token }
    });
    return res.data;
};