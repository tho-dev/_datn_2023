import React from "react";
import { NavLink as ReactRouterLink, useLocation } from "react-router-dom";
import { Link, Image, Collapse, useDisclosure } from "@chakra-ui/react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { DownIcon } from "~/components/common/Icons";

type Props = {
	item?: any;
};

const NavItem = ({ item }: Props) => {
	const location = useLocation();
	const { isOpen, onToggle } = useDisclosure();
	const Icon = item?.icon;

	return (
		<>
			<Link
				as={ReactRouterLink}
				to={item?.to}
				py="4"
				px="4"
				rounded="md"
				display="flex"
				alignItems="center"
				transition="all 0.25s ease"
				justifyContent={{
					sm: "center",
					md: "center",
					lg: "space-between",
					xl: "space-between",
					"2xl": "space-between",
				}}
				backgroundColor={location.pathname == item?.to ? "#12AFF033" : ""}
				_hover={{
					textDecor: "none",
					backgroundColor: "#12AFF033",
				}}
				onClick={() => {
					item?.children?.length > 0 && onToggle();
				}}
			>
				<Flex
					gap="3"
					alignItems="center"
					display="flex"
					justifyContent="space-between"
				>
					<Flex
						as="span"
						justifyContent="center"
						alignItems="center"
					>
						<Icon
							size="5"
							color={location.pathname == item?.to ? "#12AFF0" : "#809FB8"}
						/>
					</Flex>
					<Text
						fontSize="sm"
						lineHeight="0.5"
						fontWeight="medium"
						color={location.pathname == item?.to ? "#12AFF0" : "#809FB8"}
						display={{
							sm: "none",
							md: "none",
							lg: "block",
							xl: "block",
							"2xl": "block",
						}}
					>
						{item?.title}
					</Text>
				</Flex>
				{item?.children?.length > 0 && (
					<Flex
						as="span"
						alignItems="center"
						justifyContent="center"
						cursor="pointer"
						transition="all 0.25s ease"
						transform={isOpen ? "rotateZ(360deg)" : "rotateZ(270deg)"}
						display={{
							sm: "none",
							md: "none",
							lg: "flex",
							xl: "flex",
							"2xl": "flex",
						}}
					>
						<DownIcon
							size={5}
							strokeWidth={0.5}
							color={location.pathname == item?.to ? "#12AFF0" : "#809FB8"}
						/>
					</Flex>
				)}
			</Link>
			<Collapse
				in={isOpen}
				animateOpacity
			>
				<Flex
					gap="1"
					flexDir="column"
				>
					{item?.children?.map((item: any, index: number) => (
						<Link
							as={ReactRouterLink}
							to={item?.to}
							key={index}
							gap="2"
							py="3"
							px="5"
							pl="12"
							w="full"
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							fontSize="sm"
							fontWeight="medium"
							color="text.admin2"
							_hover={{
								textDecor: "none",
							}}
						>
							{item?.title}
						</Link>
					))}
				</Flex>
			</Collapse>
		</>
	);
};

export default NavItem;
