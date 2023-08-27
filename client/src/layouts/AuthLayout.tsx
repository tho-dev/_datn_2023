import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
	return (
		<Grid
			templateColumns="repeat(12, 1fr)"
			h="100vh"
		>
			<GridItem
				w="100%"
				h="full"
				colSpan={{
					sm: 12,
					md: 12,
					lg: 12,
					xl: 5,
					"2xl": 5,
				}}
			>
				<Outlet />
			</GridItem>
			<GridItem
				w="100%"
				h="full"
				colSpan={{
					sm: 0,
					md: 0,
					lg: 0,
					xl: 7,
					"2xl": 7,
				}}
				bgColor="bg.gray"
			></GridItem>
		</Grid>
	);
};

export default AuthLayout;
