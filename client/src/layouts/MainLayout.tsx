import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Center } from "@chakra-ui/layout";
import { TheHeader } from "~/components/common/TheHeader";
import { TheNav } from "~/components/common/TheNav";
import { TheFooter } from "~/components/common/TheFooter";

type Props = {};

const MainLayout = (props: Props) => {
	return (
		<Box w="full">
			{/* Header */}
			<Box
				w="full"
				as="header"
				backgroundColor="bg.white"
			>
				<Center>
					<Box
						w="full"
						maxW={{
							md: "768px",
							xl: "1200px",
						}}
						px={{
							sm: 4,
							md: 6,
							xl: 0,
						}}
					>
						<TheHeader />
					</Box>
				</Center>
			</Box>

			{/* Nav */}
			<Box
				w="full"
				as="nav"
				position="sticky"
				top="0"
				zIndex="90"
				borderStyle="solid"
				borderTopWidth="1px"
				borderColor="#f0f2f4"
				backgroundColor="bg.white"
			>
				<Center backgroundColor="bg.white">
					<Box
						w="full"
						maxW={{
							md: "768px",
							xl: "1200px",
						}}
						px={{
							sm: 4,
							md: 6,
							xl: 0,
						}}
					>
						<TheNav />
					</Box>
				</Center>
			</Box>

			{/* Main */}
			<Box
				w="full"
				as="main"
				backgroundColor="bg.gray"
			>
				<Center>
					<Box
						w="full"
						maxW={{
							md: "768px",
							xl: "1200px",
						}}
						px={{
							sm: 4,
							md: 6,
							xl: 0,
						}}
					>
						<Outlet />
					</Box>
				</Center>
			</Box>

			{/* Footer */}
			<Box
				w="full"
				as="footer"
				backgroundColor="bg.white"
			>
				<Center>
					<Box
						w="full"
						maxW={{
							md: "768px",
							xl: "1200px",
						}}
					>
						<TheFooter />
					</Box>
				</Center>
			</Box>
		</Box>
	);
};

export default MainLayout;
