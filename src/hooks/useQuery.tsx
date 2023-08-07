import { CacheContext } from "@src/context/useCache"
import { AxiosResponse } from "axios"
import { useContext, useEffect, useState } from 'react'

interface QueryProps {
	queryFn: (data?: any,select?:{}) => Promise<AxiosResponse<any, any>>
	queryKey: string
}

const useQuery = ({queryFn, queryKey}:QueryProps) => {
	const {cache, addKey} = useContext(CacheContext)
	
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<any>(null)
	
	const fetchData = async () => {
		setLoading(true);
		try {
			const cachedData = cache[queryKey]
			if(!cachedData){
				const response = await queryFn();
				addKey(queryKey, response.data)
				setData(response.data);
			}
			else{
				setData(cachedData)
			}
		} catch (error:any) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {

		fetchData();
	}, [queryFn]);

	return {
		data,
		loading,
		error,
		queryFn
	}
}

export default useQuery