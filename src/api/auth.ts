import axiosInstance from "@src/config/axiosConfig";

interface LoginData {
	name?: string;
	email: string;
	password: string;
}

export const signin = async (data:LoginData) => {
	const response = await axiosInstance.post("/auth/signin", {...data});
	return response;
}

export const register = async (data:LoginData) => {
	const response = await axiosInstance.post("/auth/signup", {...data});
	return response;
}