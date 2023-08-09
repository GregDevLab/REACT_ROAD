import { AuthContext } from "@src/context/AuthContext";
import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

const AuthWrapper = ():any => {
	const { user, loading } = useContext(AuthContext);
	const navigate = useNavigate();
	
	
	useEffect(() => {
		if (!loading && user.isLoggedIn) {
			return navigate("/", { replace: true });
		}
	}, [loading, user, navigate]);
	
	if (loading) return <p>loading...</p>;
	
	return (
		<>
			{!user.isLoggedIn && <Outlet />}
		</>
	)
}

export default AuthWrapper