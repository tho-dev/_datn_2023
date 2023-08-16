import React from "react";
import { Box } from "@chakra-ui/layout";
import { Outlet } from "react-router-dom";

type Props = {};

const DefaultLayout = (props: Props) => {
	return <Outlet />;
};

export default DefaultLayout;
