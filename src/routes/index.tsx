import { FilterProvider } from "@src/context/FilterContext";
import { Admin, AllRoadmaps, EditStep, Error, Home, Login, Profil, Register, Roadmap, Roadmaps, Root, ViewStep } from "@src/pages";
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
						element: <FilterProvider><Roadmaps/></FilterProvider>,
					},
					{
						path: "/mes-roadmaps/:id",
						element: <FilterProvider><Roadmap isEditable={true}/></FilterProvider>,
					},
					{
						path: "/mes-roadmaps/:id/step/edit/:id",
						element: <FilterProvider><EditStep /></FilterProvider>,
					},
					{
						path: "/les-roadmaps",
						element: <FilterProvider><AllRoadmaps/></FilterProvider>,
					},
					{
						path: "/les-roadmaps/:id",
						element: <FilterProvider><Roadmap isEditable={false}/></FilterProvider>,
					},
					{
						path: "/les-roadmaps/:id/step/:id",
						element: <FilterProvider><ViewStep /></FilterProvider>,
					},
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