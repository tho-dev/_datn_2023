import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Center, Flex } from "@chakra-ui/layout";
import { TheHeader } from "~/components/common/TheHeader";
import { TheNav } from "~/components/common/TheNav";
import { TheFooter } from "~/components/common/TheFooter";
import CompareThinkPro from "~/components/CompareThinkPro";
import { useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";

type Props = {};

const MainLayout = (props: Props) => {
	const { pathname } = useLocation();
	const [checkRouter, setCheckRouter] = useState(false);

	const { items } = useAppSelector((state: RootState) => state.persistedReducer.global);

	useEffect(() => {
		window.scrollTo(0, 0);
		setCheckRouter(pathname.includes("so-sanh"));
	}, [pathname]);

	return (
		<Box
			w="full"
			position="relative"
		>
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
						<TheNav />
					</Box>
				</Center>
			</Box>

			{/* Main */}
			<Box
				w="full"
				as="main"
				backgroundColor={checkRouter ? "bg.white" : "bg.gray"}
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

			{/* so sanh san pham */}
			{items?.length > 0 && (
				<Box
					position="fixed"
					bottom="0"
					width="full"
					zIndex="90"
				>
					<CompareThinkPro items={items} />
				</Box>
			)}
		</Box>
	);
};

export default MainLayout;
