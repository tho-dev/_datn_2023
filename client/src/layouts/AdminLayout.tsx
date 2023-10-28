import React from "react";
import { Outlet } from "react-router";
import { Flex, Box } from "@chakra-ui/layout";
import Sidebar from "~/components/common/Sidebar";
import TopBar from "~/components/common/TopBar";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PrivateRoute from "~/routes/protected";
type Props = {};

const AdminLayout = (props: Props) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>ThinkPro | CMS</title>
			</Helmet>
			<Flex
				w="full"
				h="full"
			>
				{/* Sidebar */}
				<Sidebar />
				<Flex
					w="full"
					h="full"
					ml={{
						sm: "86px",
						md: "86px",
						lg: "86px",
						xl: "260px",
						"2xl": "260px",
					}}
					mt={{
						sm: "64px",
						md: "64px",
						lg: "86px",
						xl: "86px",
						"2xl": "86px",
					}}
					flexDir="column"
				>
					{/* Top bar */}
					<TopBar />
					<Box
						w="full"
						minH="100vh"
						pl="6"
						pr="8"
						pt="6"
						bgColor="bg.admin1"
						// bgGradient="linear-gradient(to top, rgb(11 203 224), #fff)"
					>
						<PrivateRoute component={AdminLayout} />
					</Box>
				</Flex>
			</Flex>
		</HelmetProvider>
	);
};

export default AdminLayout;
