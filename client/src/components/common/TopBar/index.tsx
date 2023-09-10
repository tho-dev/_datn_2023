import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { Avatar, Collapse, Input, useDisclosure, Link } from "@chakra-ui/react";
import { DownArrowIcon, SearchAdminIcon, BellIcon, CheveronUpIcon, ChevronDownIcon } from "~/components/common/Icons";

type Props = {};

const TopBar = (props: Props) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Flex
			w={{
				sm: "calc(100% - 86px)",
				md: "calc(100% - 86px)",
				lg: "calc(100% - 260px)",
				xl: "calc(100% - 260px)",
				"2xl": "calc(100% - 260px)",
			}}
			maxH={{
				sm: "64px",
				md: "64px",
				lg: "86px",
				xl: "86px",
				"2xl": "86px",
			}}
			h="100%"
			pl="6"
			pr="8"
			transition="all 0.25s ease"
			borderBottomWidth="1px"
			borderColor="bg.admin1"
			backgroundColor="bg.white"
			position="fixed"
			top="0"
			zIndex="100"
			alignItems="center"
			justifyContent="space-between"
		>
			{/* <Flex
				as="span"
				mr="8"
				cursor="pointer"
				transform="rotateZ(90deg)"
				display={{
					sm: "none",
					md: "none",
					lg: "flex",
					xl: "flex",
					"2xl": "flex",
				}}
			>
				<DownArrowIcon
					size={8}
					strokeWidth={1}
					color="#809FB8"
				/>
			</Flex> */}
			<Flex
				w="full"
				h="full"
				px="4"
				maxW={{
					sm: "160px",
					md: "160px",
					lg: "360px",
					xl: "360px",
					"2xl": "360px",
				}}
				maxH="48px"
				alignItems="center"
				rounded="md"
				backgroundColor="bg.admin1"
				display={{
					sm: "flex",
					md: "flex",
					lg: "flex",
					xl: "flex",
					"2xl": "flex",
				}}
			>
				<Flex
					as="span"
					mt="1"
				>
					<SearchAdminIcon size={6} />
				</Flex>
				<Input
					h="full"
					border="none"
					bgColor="transparent"
					px="0"
					pl="1"
					placeholder="Tìm kiếm ..."
				/>
			</Flex>
			<Flex
				gap="5"
				alignItems="center"
				justifyContent="center"
			>
				<Flex
					as="span"
					alignItems="center"
					justifyContent="center"
					position="relative"
					_after={{
						content: "'1'",
						position: "absolute",
						top: "-6px",
						right: "-4px",
						w: "14px",
						h: "14px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						rounded: "full",
						color: "text.white",
						fontSize: "9px",
						fontWeight: "600",
						backgroundColor: "#F47690",
						border: "2px solid #fff",
					}}
				>
					<BellIcon
						size={6}
						color="text.admin2"
					/>
				</Flex>
				<Box h="8">
					<Divider orientation="vertical" />
				</Box>
				<Flex
					gap="4"
					alignItems="center"
					justifyContent="center"
					position="relative"
				>
					<Avatar
						name="ThinkPro"
						// src="https://bit.ly/broken-link"
						w="10"
						h="10"
						color="#12AFF0"
						fontSize="xs"
						bgColor="#12AFF033"
					/>
					<Box
						color="text.black"
						fontSize="sm"
					>
						<Text
							as="h3"
							fontWeight="semibold"
							lineHeight="1.2"
						>
							Truong Nguyen
						</Text>
						<Text
							as="h5"
							fontSize="xs"
							lineHeight="1.2"
						>
							Supper Admin
						</Text>
					</Box>
					<Flex
						flexDir="column"
						alignItems="center"
						justifyContent="center"
						cursor="pointer"
						onClick={onToggle}
					>
						<Flex as="span">
							<CheveronUpIcon
								size={4}
								color="bg.admin2"
							/>
						</Flex>
						<Flex as="span">
							<ChevronDownIcon
								size={4}
								color="bg.admin2"
							/>
						</Flex>
					</Flex>
					{/* <Collapse
						in={isOpen}
						animateOpacity
						style={{
							position: "absolute",
							right: 0,
							top: 32,
						}}
					>
						<Flex
							w="200px"
							p="3"
							mt="4"
							color="text.black"
							bg="bg.white"
							rounded="md"
							shadow="md"
							boxShadow="2xl"
							flexDir="column"
							style={{
								boxShadow:
									"rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
							}}
						>
							<Link
								as={ReactRouterLink}
								to="dang-xuat"
								fontSize="sm"
								fontWeight="semibold"
								display="flex"
								p="2"
								w="full"
								_hover={{
									textDecor: "none",
								}}
							>
								Đăng xuất
							</Link>
							<Link
								as={ReactRouterLink}
								to="dang-xuat"
								fontSize="sm"
								fontWeight="semibold"
								display="flex"
								p="2"
								w="full"
								_hover={{
									textDecor: "none",
								}}
							>
								Đăng xuất
							</Link>
						</Flex>
					</Collapse> */}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default TopBar;
