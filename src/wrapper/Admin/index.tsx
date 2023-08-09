import { AuthContext } from "@src/context/AuthContext";
import { Login } from "@src/pages";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
const AdminWrapper = () => {
	const { user , loading} = useContext(AuthContext);
	if(loading) return <p>loading...</p>
	if(!user.isLoggedIn )  return (
		<>
			<Login />
		</>
	)
	
	return (
		<>
			<Outlet />
		</>
	)
}

export default AdminWrapper