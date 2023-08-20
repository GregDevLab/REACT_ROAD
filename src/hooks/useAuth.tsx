import { getMe, logOut } from "@src/api/user";
import { CacheContext } from "@src/context/CacheContext";
import { useContext, useEffect, useState } from 'react';

export interface UserAuth {
	id?: string;
	name?: string;
	email?: string;
	role?: string;
	isLoggedIn: boolean;
}

const useAuth = () => {
	const {removeAll} = useContext(CacheContext);
	const [user, setUser] = useState<UserAuth>({ isLoggedIn: false });	
	const [loading, setLoading] = useState(true);

	const handleConnect = (user: UserAuth) => {
		setUser(user);
		window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
	}

	const handleDisconnect = () => {
		logOut()
		.then(() => {
			removeAll()
			setUser({isLoggedIn: false});
			window.localStorage.setItem('isLoggedIn', JSON.stringify(false));
			window.localStorage.removeItem('key');
		})
		.catch((error) => {
			console.log("🚀 ~ file: useAuth.tsx:15 ~ handleDisconnect ~ error", error)
		})

	}

	useEffect( () => {
		const isLoggedIn = window.localStorage.getItem('isLoggedIn');

		if (isLoggedIn) {
			getMe()
			.then(({ data }) => {
				handleConnect({ isLoggedIn: true, ...data.object });
			})
			.catch((error) => {
				console.log("🚀 ~ file: useAuth.tsx:45 ~ useEffect ~ error:", error)
				handleDisconnect()
			})
			.finally(() => {
				setLoading(false);
			});
		}

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);
	
	return {
		user,
		setUser,
		loading,
		handleConnect,
		handleDisconnect
	}
}

export default useAuth