import { createContext, useState } from "react";

interface Cache{
	[key:string]: any
}

export const CacheContext = createContext<any>(null);

export const CacheProvider = ({ children }: any) => {
	const [cache, setCache] = useState<Cache>({})
	
	const addKey = (key: any, value:any) => {
		setCache({
			...cache,
			[key]: value
		})
	}

	const invalidateKey = (key: string) => {
		const newCache = {...cache}
		delete newCache[key] 
		setCache(newCache)
	}

	const removeAll = () => {
		setCache({})
	}

	return (
		<CacheContext.Provider value={{cache,addKey,invalidateKey, removeAll}}>
			{children}
		</CacheContext.Provider>
	)
}