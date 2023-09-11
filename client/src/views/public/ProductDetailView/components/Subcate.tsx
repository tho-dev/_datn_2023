import React, { useState, useRef } from "react";
import { useDisclosure, Text, Flex, Box, Image } from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";
import { GiftIcon } from "~/components/common/Icons";

type Props = {};

const Subcate = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box>
			<Box
				bgColor={"white"}
				borderRadius={"6px"}
				mt="4"
				p="6"
			>
				<Flex
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<Flex alignItems={"center"}>
						<Box
							w={"42px"}
							h={"42px"}
							objectFit={"cover"}
						>
							<Image
								w="full"
								h="full"
								objectFit="cover"
								src="https://images.thinkgroup.vn/unsafe/84x84/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/brands/2023/4/5/logo-dell-thinkpro-10.png"
							/>
						</Box>
						<Text
							fontSize={"16px"}
							fontWeight={600}
							pl={"2"}
						>
							Laptop Dell Inspiron 16
						</Text>
					</Flex>
					<Box>
						<Flex
							onClick={onOpen}
							as={"button"}
							fontSize={"12px"}
							bg={"white"}
							alignItems={"center"}
							color={"black"}
						>
							Xem tất cả
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
								pl={"-6"}
							>
								<NavArrowRightIcon
									size={3}
									strokeWidth={3}
									color="black"
								/>
							</Flex>
						</Flex>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};
export default Subcate;
