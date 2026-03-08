import { api } from "@/lib/api";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export const registerUser = async (data: RegisterData) => {
  const res = await api.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data);
  return res.data;
};

type LoginData = {
  email: string;
  password: string;
};

export const loginUser = async (data: LoginData) => {
  const res = await api.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data);
  return res.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const res = await api.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data);
  return res.data;
};

export const verifyResetCode = async (data: { resetCode: string }) => {
  const res = await api.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data);
  return res.data;
};

export const resetPassword = async (data: {
  email: string;
  newPassword: string;
}) => {
  const res = await api.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", data);
  return res.data;
};

export const changePassword = async (
  data: {
    currentPassword: string;
    password: string;
    rePassword: string;
  },
  token: string
) => {
  const res = await api.put(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    data,
    {
      headers: { token: token },
    }
  );

  return res.data;
};