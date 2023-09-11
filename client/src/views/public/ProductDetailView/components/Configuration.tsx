import React, { useState, useRef } from "react";
import { useDisclosure, Text, Flex, Box, Grid, Heading } from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";

type Props = {};

const Configuration = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box mb={"2"}>
				<Flex justifyContent={"space-between"}>
					<Text
						as={"h5"}
						fontSize={"lg"}
						fontWeight={"600"}
					>
						Cấu hình đặc điểm
					</Text>
					<Flex
						onClick={onOpen}
						as={"button"}
						fontSize={"sm"}
						bg={"white"}
						alignItems={"center"}
						color={"text.blue"}
					>
						Xem cấu hình chi tiết
						<Flex
							w="9"
							h="9"
							right="4"
							top={"calc(50% - 24px)"}
							translateY="-50%"
							zIndex="5"
							rounded="full"
							cursor="pointer"
							alignItems="center"
							justifyContent="center"
							className="btn-next"
						>
							<NavArrowRightIcon
								size={4}
								strokeWidth={2}
								color="text.black"
							/>
						</Flex>
					</Flex>
				</Flex>
				<Box>
					<Grid
						templateColumns={"repeat(2, 1fr)"}
						gap={"4"}
					>
						{Array(6)
							.fill(0)
							.map((item, index: number) => {
								return (
									<Box key={index}>
										<Text
											fontSize="sm"
											fontWeight="semibold"
										>
											Cấu hình
										</Text>
										<Flex
											gap="1"
											fontSize="sm"
											flexDir="column"
											fontWeight="medium"
											mt="1"
										>
											<Text>Loại CPU: Intel Core i5 1340P, 12C/16T</Text>
											<Text>Loại CPU: Intel Core i5 1340P, 12C/16T</Text>
											<Text>Loại CPU: Intel Core i5 1340P, 12C/16T</Text>
										</Flex>
									</Box>
								);
							})}
					</Grid>
				</Box>
			</Box>
			<DialogThinkPro
				isOpen={isOpen}
				onClose={onClose}
				size="2xl"
				title={<Heading fontSize="xl">Cấu hình chi tiết</Heading>}
				isCentered
			>
				<Grid
					gap={"4"}
					templateColumns={"repeat(2, 1fr)"}
				>
					{Array(6)
						.fill(0)
						.map((item, index: number) => {
							return (
								<Box key={index}>
									<Text
										fontSize="sm"
										fontWeight="semibold"
									>
										Cấu hình
									</Text>
									<Flex
										gap="1"
										fontSize="sm"
										flexDir="column"
										fontWeight="medium"
										mt="1"
									>
										<Text>Loại CPU: Intel Core i5 1340P, 12C/16T</Text>
										<Text>Loại CPU: Intel Core i5 1340P, 12C/16T</Text>
										<Text>Loại CPU: Intel Core i5 1340P, 12C/16T</Text>
									</Flex>
								</Box>
							);
						})}
				</Grid>
			</DialogThinkPro>
		</>
	);
};

export default Configuration;
