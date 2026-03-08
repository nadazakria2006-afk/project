export async function getBrands() {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
    });

    if (!response.ok) {
      throw new Error('حصلت مشكلة أثناء سحب بيانات الماركات');
    }

    const data = await response.json();
    return data; 

  } catch (error) {
    console.error("خطأ في جلب الماركات:", error);
    return null; 
  }
}

export async function getBrandDetails(id: string) {
  try {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);

    if (!response.ok) {
      throw new Error('حصلت مشكلة أثناء سحب تفاصيل الماركة');
    }

    const data = await response.json();
    return data; 

  } catch (error) {
    console.error("خطأ في جلب تفاصيل الماركة:", error);
    return null;
  }
}