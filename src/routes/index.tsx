import { FilterProvider } from "@src/context/FilterContext";
import { Admin, Error, Home, Login, Profil, Register, Roadmap, Root } from "@src/pages";
import { AdminWrapper, AuthWrapper, ProtectedWrapper } from "@src/wrapper";

import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				element : <AuthWrapper />,
				children: [
					{
						path: "/connexion",
						element: <Login />
					},
					{
						path: "/inscription",
						element: <Register />
					},
				]
			},
			{
				element: <ProtectedWrapper />,
				children: [
					{
						path: "/profil",
						element: <Profil />,
					},
					{
						path: "/mes-roadmaps",
						element: <FilterProvider><Roadmap /></FilterProvider>,
					}
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