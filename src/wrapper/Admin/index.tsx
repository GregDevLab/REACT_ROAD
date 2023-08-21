import { AuthContext } from "@src/context/AuthContext";
import { Login } from "@src/pages";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const AdminWrapper = () => {
	const navigate = useNavigate()
	const { user , loading} = useContext(AuthContext);
	if(loading) return <p>loading...</p>
	if(!user.isLoggedIn )  return (
		<>
			<Login />
		</>
	)
	
	if(user.role !== 'ADMIN') navigate('/', {replace: true})

	return (
		<>
			<Outlet />
		</>
	)
}

export default AdminWrapper