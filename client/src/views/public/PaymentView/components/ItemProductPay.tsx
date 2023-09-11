import React, { useState } from "react";
import { Box, Flex, HStack, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";
import ItemBonus from "./ItemProductBonus";

type Props = {};

const ItemProductPay = (props: Props) => {
	return (
		<>
			<Flex
				justifyContent={"space-between"}
				my={"4"}
				px={"5"}
			>
				<Flex>
					<Box>
						<Image
							src="https://res.cloudinary.com/dgpzzy5sg/image/upload/v1681573390/thinkpro/categories/owmv3uyns2zjpgbs6thb.png"
							alt="name"
						/>
					</Box>
					<Box ml={"5"}>
						<Text
							as={"p"}
							fontSize={"14px"}
						>
							Dell Inspiron 16 5630
						</Text>
						<Box>
							<Text
								as={"p"}
								fontSize={"12px"}
								backgroundColor={"#F6F9FC"}
								my={"2"}
								textOverflow={"ellipsis"}
								overflow={"hidden"}
								whiteSpace={"nowrap"}
								w={"257px"}
							>
								i5 1340P, QHD+ 16GB, 512GB, Mới, Full box, Nhập khẩu
							</Text>
						</Box>
						<Box>
							<Flex alignItems={"center"}>
								<Text
									as={"p"}
									fontSize={"md"}
									color={"text.red"}
									fontWeight={"semibold"}
								>
									28.490.000
								</Text>
								<Text
									as={"p"}
									ml={"8px"}
									fontSize={"sm"}
								>
									x1
								</Text>
							</Flex>
						</Box>
					</Box>
				</Flex>
			</Flex>
			{/* <ItemBonus /> */}
		</>
	);
};

export default ItemProductPay;
