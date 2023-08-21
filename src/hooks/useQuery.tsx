import { CacheContext } from "@src/context/CacheContext"
import { AxiosResponse } from "axios"
import { useContext, useEffect, useState } from 'react'

interface QueryProps {
	queryFn: (id?:any) => Promise<AxiosResponse<any, any>>
	queryKey: [string, any?],
	onSuccess?: (data:any) => void
	onError?: (error:any) => void
	enabled?: boolean,
	ignoreCache?: boolean
}

const useQuery = ({queryFn, queryKey, onSuccess, onError, enabled = true, ignoreCache=false}:QueryProps) => {
	const {cache, addKey} = useContext(CacheContext)
	
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<any>(null)
	

	const fetchData = async () => {
		if(!enabled){
			return
		}
		setLoading(true);
		try {
			const cachedData = cache[queryKey.join("-")]
			if(!cachedData || ignoreCache){
				const response = await queryFn(queryKey[1]);
				addKey(queryKey.join('-'), response.data)
				setData(response.data);
				onSuccess && onSuccess(response.data)
			}
			else{
				setData(cachedData)
				onSuccess && onSuccess(cachedData)
			}
		} catch (error:any) {
			onError && onError(error)
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {

		fetchData();
	}, [queryFn, cache]);

	return {
		data,
		loading,
		error,
		queryFn,
		refetch	: () => { enabled = true; ignoreCache = true ;fetchData()}
	}
}

export default useQuery