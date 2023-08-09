import { useSort } from "@src/hooks/useFilter";
import { createContext, useEffect, useState } from 'react';

type Order = 'ASC' | 'DESC';
export const FilterContext = createContext<any>(null);

export const FilterProvider = ({children}:any) => {
	const [originalData, setOriginalData] = useState<any[]>([]);
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const {sortByNumber, sortByString,sortByDate} = useSort();

	const sort = {
		byNumber: (key:string,order:Order= 'ASC', data=filteredData) => setFilteredData(sortByNumber(key,order, data)),
		byString: (key:string,order:Order= 'ASC', data=filteredData) => setFilteredData(sortByString(key,order, data)),
		byDate: (key:string,order:Order= 'ASC', data=filteredData) => setFilteredData(sortByDate(key,order, data)),
	}

	const search = (key:string, value:string, data=filteredData) => {
		if(!value) return setFilteredData(originalData);
		const filtered = [...data].filter((item) => String(item[key]).toLowerCase().includes(value.toLowerCase()));
		setFilteredData(filtered);
	}



	useEffect(() => {
		setFilteredData(originalData);
	}, [originalData]);

	useEffect(() => {
		console.log("🚀 ~ file: FilterContext.tsx:26 ~ FilterProvider ~ filteredData:", filteredData)
	}, [filteredData]);

	return (
		<FilterContext.Provider value={{setOriginalData, sort,search, filteredData}}>
			{children}
		</FilterContext.Provider>
	);
}