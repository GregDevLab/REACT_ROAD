import axiosInstance from "@src/config/axiosConfig";

interface LoginData {
	email: string;
	password: string;
}

export const login = async (data:LoginData) => {
	const response = await axiosInstance.post("/auth/signin", {...data});
	return response;
}