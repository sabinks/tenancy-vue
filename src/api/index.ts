import axios from "axios";

let headers: any = {
  "Content-Type": "application/json",
};
export const baseUrl = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    ...headers,
  },
});

export const login = async (
  email: string,
  password: string,
  remember: boolean
) => {
  const response = await apiClient.post(`/login`, {
    email,
    password,
  });
  const token = response.data.access_token;
  if (token && remember) {
    localStorage.setItem("consultancyToken", token);
  }
  if (token && !remember) {
    sessionStorage.setItem("consultancyToken", token);
  }
  return response.data;
};
export const resetPassword = async (
  token: string,
  email: string,
  password: string
) => {
  const response = await apiClient.post(`/reset-password`, {
    token,
    email,
    password,
  });
  return response.data;
};
export const forgotPassword = async (email: string) => {
  await apiClient.post(`/forgot-password`, {
    email,
  });
};
