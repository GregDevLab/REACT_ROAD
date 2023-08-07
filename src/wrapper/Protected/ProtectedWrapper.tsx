import { AuthContext } from "@src/context/AuthContext";
import { Login } from "@src/pages";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

const ProtectedWrapper = () => {
	const { user, loading } = useContext(AuthContext);

	if(loading) return <p>loading...</p>

	if(!user.isLoggedIn)  return (
		<>
			<p>Vous devez être authentifié</p>
			<Login />
		</>
	)
	
	return (
		<>
			<p>protected</p>
			<Outlet />
		</>
	)
}

export default ProtectedWrapper