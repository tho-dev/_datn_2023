import React, { useState, useRef } from "react";
import { useDisclosure, Text, Flex, Box, Image } from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";
import { GiftIcon } from "~/components/common/Icons";
import { Link as ReactRouterLink } from "react-router-dom";
import logo from "~/assets/images/logo-thinkpro.svg";

type Props = {
	brand: any;
	category: any;
};

const Subcate = ({ brand, category }: Props) => {
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
								src={brand?.thumbnail?.url}
							/>
						</Box>
						<Text
							fontSize={"sm"}
							fontWeight={600}
							pl={"2"}
						>
							{category?.name + " " + brand?.name}
						</Text>
					</Flex>
					<Box>
						<Flex
							to={`/${brand?.shared_url}`}
							as={ReactRouterLink}
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
