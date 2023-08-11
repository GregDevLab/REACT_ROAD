import axios from "axios";


const axiosUplaod = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		withCredentials: true,
		headers: {
			'X-CSRFToken': 'csrfToken'
		},
});

export const uploadFile = async (file:any) => {
console.log("🚀 ~ file: upload.ts:14 ~ uploadFile ~ file:", file)


	const response = await axiosUplaod.post("/upload/file", file, {
		onUploadProgress: (progressEvent) => {
			const {loaded, total} = progressEvent;
			const percent = total && Math.floor((loaded * 100) / total);
			console.log(`${loaded}kb of ${total}kb | ${percent}%`);
		},
	});
	return response;
}

