import { getMe, logOut } from "@src/api/user";
import { CacheContext } from "@src/context/CacheContext";
import { message } from "antd";
import { useContext, useEffect, useState } from 'react';

export interface UserAuth {
	[key: string]: any;
	isLoggedIn: boolean;
}

const useAuth = () => {
	const {removeAll} = useContext(CacheContext);
	const [user, setUser] = useState<UserAuth>({ isLoggedIn: false, id: null, name: null, email: null });	
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
				console.log("🚀 ~ file: useAuth.tsx:44 ~ .then ~ data:", data)
				handleConnect({
					id: data.object.id,
					name: data.object.name,
					email: data.object.email,
					role: data.object.role,
					isLoggedIn: true 
				});
			})
			.catch((error) => {
				message.error('vous avez été déconnecté');
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

	useEffect(() => {
		console.log("🚀 ~ file: useAuth.tsx:64 ~ useAuth ~ user:", user)
	},[user])
	
	return {
		user,
		setUser,
		loading,
		handleConnect,
		handleDisconnect
	}
}

export default useAuth