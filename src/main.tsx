import { AuthProvider } from "@src/context/AuthContext";
import Router from "@src/routes";
import "@src/styles/global.css";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
		<ConfigProvider theme={{ token: { colorPrimary: '#67a5df' } }}>
			<AuthProvider>
				<RouterProvider router={Router} />
			</AuthProvider>
		</ConfigProvider>
    </React.StrictMode>
);
