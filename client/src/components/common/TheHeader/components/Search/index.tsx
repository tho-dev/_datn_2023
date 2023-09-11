import { Box, Fade, Flex, Heading, Input, Image, Divider, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { CloseSmallIcon, SearchIcon } from "~/components/common/Icons";

type Props = {};

const Search = (props: Props) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const handleFocus = () => {
		setIsFocus(true);
		onOpen();
	};

	const handleBlur = () => {
		setIsFocus(false);
		onClose();
	};

	return (
		<Flex
			w="full"
			maxW="360px"
			px="4"
			py="14px"
			ml="6"
			display={{
				sm: "none",
				md: "flex",
			}}
			rounded="full"
			alignItems="center"
			backgroundColor="bg.gray"
			borderWidth="1px"
			borderColor={isFocus ? "text.blue" : "none"}
			transition="all 0.2s ease"
			position="relative"
		>
			<SearchIcon size={4} />
			<Input
				w="full"
				h="full"
				px="0"
				pl="2"
				border="none"
				lineHeight="1.6"
				backgroundColor="bg.gray"
				placeholder="Tên sản phẩm, nhu cầu, hàng"
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<Fade
				in={isOpen}
				style={{
					position: "absolute",
					top: "60px",
					zIndex: 999,
					left: "-16px",
					width: "calc(100% + 32px)",
					height: "400px",
					maxHeight: "100%",
				}}
			>
				<Box
					display={isOpen ? "block" : "none"}
					bg="bg.white"
					rounded="md"
					shadow="md"
					w="full"
					px="4"
					py="5"
					h="400px"
					maxHeight="400px"
					overflowY="auto"
					overflowX="hidden"
				>
					<Box mb="5">
						<Heading as="h3" fontSize="md" fontWeight="semibold">
							Tìm kiếm gần đây
						</Heading>
						<Flex mt="4" gap="1" flexDir="column">
							<Text fontSize="sm" color="text.blue" cursor="pointer">
								Máy tính
							</Text>
							<Text fontSize="sm" color="text.blue" cursor="pointer">
								Máy tính
							</Text>
						</Flex>
					</Box>
					<Flex
						gap="2"
						p="4"
						ml="-4"
						w="calc(100% + 32px)"
						alignItems="center"
						justifyContent="center"
						bgColor="rgb(245 253 255 / 1)"
					>
						<Box
							w="5"
							h="5"
							rounded="full"
							bgColor="#00d4ff"
							justifyContent="center"
							alignItems="center"
							display="inline-flex"
						>
							<CloseSmallIcon size={3} />
						</Box>
						<Text flex="1" fontSize="xs" color="text.black" fontWeight="medium">
							Tăng thời gian khách đến 24h00, trở thành chuỗi cửa hàng bán lẻ Phục vụ khách hàng lâu nhất
						</Text>
					</Flex>
					{/* Sản phẩm */}
					<Flex mt="5" flexDir="column">
						<Heading as="h3" fontSize="sm" fontWeight="semibold">
							Sản phẩm
						</Heading>
						<Flex gap="3" mt="4" flexDir="column">
							<Flex gap="3" alignItems="center" justifyContent="space-between">
								<Box
									w="20"
									h="20"
									borderWidth="1px"
									borderColor="border.gray"
									rounded="6px"
									overflow="hidden"
								>
									<Image
										src="https://res.cloudinary.com/dgpzzy5sg/image/upload/v1681573395/thinkpro/products/omugsbb2a8rophjnfgru.jpg"
										w="full"
										h="full"
										objectFit="contain"
									/>
								</Box>
								<Flex flexDir="column" justifyContent="flex-start">
									<Text fontSize="15px" fontWeight="semibold">
										Lenovo ThinkPad X1 Cacbon Gen Pro
									</Text>
									<Flex gap="2">
										<Text as="span" color="text.red" fontSize="sm" fontWeight="semibold">
											20.999.999
										</Text>
										<Text as="span" fontSize="sm" fontWeight="semibold" textDecor="line-through">
											20.999.999
										</Text>
										<Text as="span" fontSize="sm" fontWeight="medium" color="text.red">
											-10%
										</Text>
									</Flex>
								</Flex>
							</Flex>
							<Flex gap="3" alignItems="center" justifyContent="space-between">
								<Box
									w="20"
									h="20"
									borderWidth="1px"
									borderColor="border.gray"
									rounded="6px"
									overflow="hidden"
								>
									<Image
										src="https://res.cloudinary.com/dgpzzy5sg/image/upload/v1681573395/thinkpro/products/omugsbb2a8rophjnfgru.jpg"
										w="full"
										h="full"
										objectFit="contain"
									/>
								</Box>
								<Flex flexDir="column" justifyContent="flex-start">
									<Text fontSize="15px" fontWeight="semibold">
										Lenovo ThinkPad X1 Cacbon Gen Pro
									</Text>
									<Flex gap="2">
										<Text as="span" color="text.red" fontSize="sm" fontWeight="semibold">
											20.999.999
										</Text>
										<Text as="span" fontSize="sm" fontWeight="semibold" textDecor="line-through">
											20.999.999
										</Text>
										<Text as="span" fontSize="sm" fontWeight="medium" color="text.red">
											-10%
										</Text>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					</Flex>

					{/* Khuyến mãi */}
					<Flex mt="5" flexDir="column">
						<Heading as="h3" fontSize="sm" fontWeight="semibold">
							Khuyến mãi nổi bật
						</Heading>
						<Flex gap="4" mt="5" flexDir="column">
							<Flex gap="3" alignItems="center">
								<Box w="5" h="5" rounded="full" bgColor="bg.red"></Box>
								<Text fontSize="sm" fontWeight="medium">
									Đặt hàng trước Dell Inspiron 14 Plus (7420)
								</Text>
							</Flex>
							<Divider bgColor="bg.gray" />
							<Flex gap="3" alignItems="center">
								<Box w="5" h="5" rounded="full" bgColor="bg.red"></Box>
								<Text fontSize="sm" fontWeight="medium">
									Đặt hàng trước Dell Inspiron 14 Plus (7420)
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Box>
			</Fade>
		</Flex>
	);
};

export default Search;
