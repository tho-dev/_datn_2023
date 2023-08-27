import React, { useState } from "react";
import { Box, Flex, HStack, Heading } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";
import ItemBonus from "./ItemBonus";

type Props = {};

const ItemCart = (props: Props) => {
	const [quantity, setQuantity] = useState<number>(1);
	const dercement = () => {
		setQuantity(quantity - 1);
	};
	const incement = () => {
		setQuantity(quantity + 1);
	};
	console.log(quantity);
	return (
		<>
			<Flex justifyContent={"space-between"} my={"4"} px={"5"}>
				<Flex>
					<Box>
						<Image
							src="https://res.cloudinary.com/dgpzzy5sg/image/upload/v1681573390/thinkpro/categories/owmv3uyns2zjpgbs6thb.png"
							alt="name"
						/>
					</Box>
					<Box ml={"5"}>
						<Text as={"p"} fontSize={"14px"}>
							Dell Inspiron 16 5630
						</Text>
						<Box>
							<Text as={"p"} fontSize={"12px"} backgroundColor={"#F6F9FC"} my={"2"}>
								i5 1340P, QHD+ 16GB, 512GB, Mới, Full box, Nhập khẩu
							</Text>
						</Box>
						<Box display={"flex"}>
							<Button
								border={"1px solid #1C1F23"}
								w={"20px"}
								borderRadius={"4px 0px 0px 4px"}
								bgColor={"White"}
								borderRight={"none"}
								color={"black"}
								onClick={() => dercement()}
							>
								-
							</Button>
							<Input value={quantity} w={"70px"} textAlign={"center"} borderRadius={"0px"} />
							<Button
								border={"1px solid #1C1F23"}
								w={"20px"}
								borderRadius={"0px 4px 4px 0px"}
								bgColor={"White"}
								color={"black"}
								borderLeft={"none"}
								onClick={() => incement()}
							>
								+
							</Button>
						</Box>
					</Box>
				</Flex>
				<Box>
					<Text as={"p"} textDecoration={"line-through"} fontSize={"12px"}>
						28.490.000
					</Text>
					<Text as={"p"} fontSize={"xl"} color={"#FE3464"} fontWeight={"20px"}>
						28.490.000
					</Text>
					<Button backgroundColor={"white"} onClick={() => console.log("hello")} color={"black"}>
						Xóa
					</Button>
				</Box>
			</Flex>
			<ItemBonus />
		</>
	);
};

export default ItemCart;
