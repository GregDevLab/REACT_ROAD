import axiosInstance from "@src/config/axiosConfig";

interface  OptionsType  {
	[key: string]: any;
}

export const getMe = async (options?:OptionsType) => {
	const response =  axiosInstance.get("/auth/me", {params: { select:JSON.stringify(options)}});
	return response;
}

export const logOut = async () => {
	const response =  await axiosInstance.get("/auth/logout");
	return response;
}

export const getAllUser = async () => {
	const response =  axiosInstance.get("/user");
	return response;
}

