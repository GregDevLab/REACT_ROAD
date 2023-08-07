import axios from "axios";

const axiosInstance = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': 'csrfToken'
		},
});

axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
)

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {

		const originalRequest = error.config;

		if ((Number(error.response.status) === 403 && originalRequest.url !== '/auth/refresh') && originalRequest.url !== '/auth/logout') {

			try {
				await axiosInstance.get('/auth/refresh');
				return axiosInstance(originalRequest); // Réessayer la requête originale
			} catch (refreshError) {
				await axiosInstance.get('/auth/logout');
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
)


export default axiosInstance;