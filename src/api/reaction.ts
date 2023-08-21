import axiosInstance from "@src/config/axiosConfig";


const BASE_URL = "/reaction"

export const reaction = async (roadmapId:string, reactionType: 'LIKE'|'DISLIKE') => {
	const response = await axiosInstance.post(`${BASE_URL}/roadmap/`, {roadmapId, type:reactionType});
	return response;
}