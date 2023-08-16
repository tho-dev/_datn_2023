import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
	return (
		<Box>
			<h1>Layout Auth</h1>
			<Outlet />
		</Box>
	);
};

export default AuthLayout;
