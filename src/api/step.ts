import axiosInstance from "@src/config/axiosConfig";
import { IStep, SlecteOptions } from "./types/modelType";

const BASE_URL = "/step"

export const getOneStep = async (id:string|number, options?:SlecteOptions) => {
	const response =  axiosInstance.get(`${BASE_URL}/show/${id}`,{params: { select:JSON.stringify(options)}});
	return response;
}

export const createStep = async (data:IStep) => {
	const response =  await axiosInstance.post(`${BASE_URL}/new`, {...data});
	return response;
}

export const getAllStep = async (options?:SlecteOptions) => {
	const response =  axiosInstance.get(`${BASE_URL}`, {params: { select:JSON.stringify(options)}});
	return response;
}

export const updateStep = async (id:string|number,data:IStep ) => {
	const response =  axiosInstance.put(`${BASE_URL}/update/${id}`, {...data});
	return response;
}

export const deleteStep = async (id:string|number) => {
	const response =  axiosInstance.delete(`${BASE_URL}/delete/${id}`);
	return response;
}
