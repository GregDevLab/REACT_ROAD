import axiosInstance from "@src/config/axiosConfig";
import { IRoadmap, SlecteOptions } from "./types/modelType";

const BASE_URL = "/roadmap"

export const getOneRoadmap = async (id:string|number) => {
	const response =  axiosInstance.get(`${BASE_URL}/show/${id}`);
	return response;
}

export const createRoadmap = async (data:IRoadmap) => {
	const response =  await axiosInstance.post(`${BASE_URL}/new`, {...data});
	return response;
}

export const getAllRoadmap = async (options?:SlecteOptions) => {
	const response =  axiosInstance.get(`${BASE_URL}`, {params: { select:JSON.stringify(options)}});
	return response;
}

export const updateRoadmap = async (id:string|number,data:IRoadmap ) => {
	const response =  axiosInstance.put(`${BASE_URL}/update/${id}`, {...data});
	return response;
}

export const deleteRoadmap = async (id:string|number) => {
	const response =  axiosInstance.get(`${BASE_URL}/delete/${id}`);
	return response;
}
