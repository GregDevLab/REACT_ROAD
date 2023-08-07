import { CacheContext } from "@src/context/useCache";
import { AxiosResponse } from "axios";
import { useContext } from "react";

interface QueryProps {
	mutationFn: (data?: any, select?: any) => Promise<AxiosResponse<unknown, unknown>>;
	onError?: (error: any) => void;
	onSuccess?: (data: any) => void;
	queryKey?: string;
}

const useMutation = ({mutationFn,queryKey, onError, onSuccess}: QueryProps) => {
	const {invalidateKey} = useContext(CacheContext)
	const mutate = async (data?: unknown, select?: unknown) => {
		try {
			const response = await mutationFn(data, select);
			onSuccess && onSuccess(response);
			if(queryKey){
				invalidateKey(queryKey)
			}
			return response;
		} catch (error) {
			onError && onError(error);
			throw error;
		}
	}

	return {
		mutate
	}
}

export default useMutation;