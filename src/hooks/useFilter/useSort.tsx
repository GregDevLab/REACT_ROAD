import { useCallback, useState } from 'react';

type Order = 'ASC' | 'DESC';

const useSort = <T extends Record<string, any>>() => {
	const [sortedData, setSortedData] = useState<T[]>([]);

	const sortByString = useCallback((key: keyof T, order: Order, data: T[]) => {
		const factor = order === 'ASC' ? 1 : -1;
		const sorted = [...data].sort((a, b) => factor * String(a[key]).localeCompare(String(b[key])));
		return sorted;
	}, []);

	const sortByNumber = useCallback((key: keyof T, order: Order, data: T[]) => {
		const factor = order === 'ASC' ? 1 : -1;
		const sorted = [...data].sort((a, b) => factor * (Number(a[key]) - Number(b[key])));
		return sorted;
	}, []);

	const sortByDate = useCallback((key: keyof T, order: Order, data: T[]) => {
		const factor = order === 'ASC' ? 1 : -1;
		const sorted = [...data].sort((a, b) => factor * (new Date(a[key]).getTime() - new Date(b[key]).getTime()));
		return sorted;
	}, []);

	return { sortedData, sortByString, sortByNumber, sortByDate };
};

export default useSort;
