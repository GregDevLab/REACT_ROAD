import axiosInstance from "@src/config/axiosConfig";


export const getMe = async () => {
	const response =  axiosInstance.get("/auth/me");
	console.log("🚀 ~ file: user.ts:5 ~ getAll ~ response:", response)
	return response;
}

export const logOut = async () => {
	const response =  await axiosInstance.get("/auth/logout");
	return response;
}

export const getAll = async () => {
	const response =  axiosInstance.get("/user");
	console.log("🚀 ~ file: user.ts:5 ~ getAll ~ response:", response)
	return response;
}

