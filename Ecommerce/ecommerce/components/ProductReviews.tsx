"use client";

import { useState, useEffect } from "react";
import { getProductReviews, createReview, deleteReview } from "@/services/review.service";
import { Star, Trash2, Loader2, User } from "lucide-react";

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await getProductReviews(productId);
      setReviews(response?.data || []);
    } catch (error) {
      console.error("خطأ في جلب التقييمات", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    
    if (!token) {
      alert("يجب تسجيل الدخول أولاً لإضافة تقييم!");
      return;
    }

    if (!reviewText.trim()) return;

    setIsSubmitting(true);
    try {

      await createReview(productId, { title: reviewText, ratings: rating }, token);
      alert("تم إضافة تقييمك بنجاح!");
      setReviewText("");
      setRating(5);
      fetchReviews();
    } catch (error: any) {
      alert(error?.response?.data?.message || "حدث خطأ أثناء إضافة التقييم. قد تكون قمت بتقييم هذا المنتج مسبقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    if (!window.confirm("هل أنت متأكد من حذف تقييمك؟")) return;

    try {
      await deleteReview(reviewId, token);
      fetchReviews();
    } catch (error) {
      alert("لا يمكنك حذف هذا التقييم (مسموح لصاحب التقييم فقط).");
    }
  };

  if (loading) {
    return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-zinc-500" /></div>;
  }

  return (
    <div className="mt-12 border-t pt-10">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900">تقييمات العملاء</h2>

      <form onSubmit={handleAddReview} className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 mb-8">
        <h3 className="font-semibold mb-4 text-zinc-800">أضف تقييمك للمنتج</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-zinc-600">تقييمك:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`transition-colors ${rating >= star ? 'text-yellow-400' : 'text-zinc-300'}`}
              >
                <Star size={24} fill={rating >= star ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>

        <textarea
          required
          rows={3}
          placeholder="اكتب رأيك في المنتج هنا..."
          className="w-full p-3 border rounded-lg outline-none focus:border-zinc-500 mb-4 resize-none"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-zinc-900 text-white px-6 py-2 rounded-lg hover:bg-zinc-800 transition disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          إرسال التقييم
        </button>
      </form>

      {reviews.length === 0 ? (
        <p className="text-zinc-500 text-center py-6">لا توجد تقييمات لهذا المنتج حتى الآن. كن أول من يقيم!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="p-5 border rounded-xl bg-white flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-zinc-200 p-2 rounded-full">
                    <User size={16} className="text-zinc-600" />
                  </div>
                  <span className="font-semibold text-zinc-900">{review.user?.name || "مستخدم"}</span>
                </div>
                
                <div className="flex gap-1 mb-2 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.ratings ? "currentColor" : "none"} className={i >= review.ratings ? "text-zinc-300" : ""} />
                  ))}
                </div>
                
                <p className="text-zinc-700">{review.title}</p>
              </div>

              <button 
                onClick={() => handleDeleteReview(review._id)}
                className="text-red-400 hover:text-red-600 transition p-2"
                title="حذف تقييمي"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}