import { Admin, Error, Home, Login, Register, Root } from "@src/pages";
import { AdminWrapper, ProtectedWrapper } from "@src/wrapper";

import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/connexion",
				element: <Login />
			},
			{
				path: "/inscription",
				element: <Register />
			},
			{
				element: <ProtectedWrapper />,
				children: [
					
				]

			},
			{
				element: <AdminWrapper />,
				children: [
					
					{
						path: "/admin",
						element: <Admin />,
					}
				]
			}
		]
	}, 
]);

export default Router