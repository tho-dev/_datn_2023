import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Button, Input, Text, Tooltip } from "@chakra-ui/react";
import { MinusIcon, PlusIcon, WarningIcon } from "~/components/common/Icons";
import Gift from "./Gift";
import Buy from "./Buy";
type Props = {};

const tooltiptext =
	"Mới, Sealed: Là sản phẩm mới 100% chưa qua sử dụng còn nguyên tem niêm phong của nhà sản xuất trên vỏ hộp hoặc bao bì sản phẩm.";
const Sku = (props: Props) => {
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
			<Box bgColor={"white"} borderRadius={"6px"}>
				<Text
					fontSize={"16px"}
					fontWeight={600}
					borderBottom={"1px solid #E6E8EA"}
					mx={"2"}
					my={"4"}
					py={"4"}
					borderRadius={"6px"}
				>
					Dell Inspiron 16 5630
				</Text>
				<Box mx={"4"}>
					<Text fontSize={"14px"} fontWeight={600} color={"#6B7075"}>
						Phiên bản
					</Text>
					<Button
						bg={"#EBF3FF"}
						color={"#0065EE"}
						border={"#0065EE 1px solid"}
						w={"121px"}
						style={{ whiteSpace: "normal" }}
						fontSize={"12px"}
						my={"2"}
						fontWeight={600}
						px={3}
						py={"6px"}
						lineHeight={"150%"}
						h={"max-content"}
					>
						i5 1340P, QHD+ 16GB, 512GB
					</Button>
					<Text fontSize={"14px"} fontWeight={600} color={"#6B7075"}>
						Màu
					</Text>
					<Button
						bg={"#EBF3FF"}
						color={"#0065EE"}
						border={"#0065EE 1px solid"}
						w={"121px"}
						style={{ whiteSpace: "normal" }}
						fontSize={"12px"}
						my={"2"}
						fontWeight={600}
						px={3}
						py={"6px"}
						lineHeight={"150%"}
						h={"max-content"}
					>
						Plantium Silver
					</Button>
					<Text fontSize={"14px"} fontWeight={600} color={"#6B7075"}>
						Loại hàng
					</Text>
					<Flex gap={"4"} flexWrap={"wrap"}>
						<Tooltip hasArrow label={tooltiptext} bg="gray">
							<Button
								bg={"#EBF3FF"}
								color={"#0065EE"}
								border={"#0065EE 1px solid"}
								fontSize={"12px"}
								my={"2"}
								fontWeight={600}
								px={3}
								py={"6px"}
								lineHeight={"150%"}
								h={"max-content"}
							>
								Mới, full box, nhập khẩu
								<WarningIcon size={4} />
							</Button>
						</Tooltip>
						<Button
							bg={"white"}
							color={"black"}
							border={" 1px solid #E6E8EA"}
							fontSize={"12px"}
							my={"2"}
							px={3}
							py={"6px"}
							lineHeight={"150%"}
							h={"max-content"}
						>
							Mới, full box, nhập khẩu
							<WarningIcon size={4} />
						</Button>
						<Button
							bg={"white"}
							color={"black"}
							border={" 1px solid #E6E8EA"}
							fontSize={"12px"}
							my={"2"}
							px={3}
							py={"6px"}
							lineHeight={"150%"}
							h={"max-content"}
						>
							Mới, full box, nhập khẩu
							<WarningIcon size={4} />
						</Button>
					</Flex>
					<Text fontSize={"14px"} fontWeight={600} color={"#6B7075"}>
						Số lượng
					</Text>
					<Box display={"flex"} my={"2"} borderBottom={"1px solid #E6E8EA"} pb={"5"}>
						<Button
							border={"1px solid #1C1F23"}
							w={"20px"}
							borderRadius={"4px 0px 0px 4px"}
							bgColor={"White"}
							borderRight={"none"}
							color={"black"}
							onClick={() => dercement()}
						>
							<MinusIcon size={5} />
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
							<PlusIcon size={5} />
						</Button>
					</Box>
					<Grid templateColumns="repeat(3, 1fr)" gap={2} py={"4"}>
						<GridItem>
							<Text fontSize={"20px"} fontWeight={600} color={"#FE3464"}>
								19.790.000
							</Text>
							<Flex pt={"1"}>
								<Text
									as={"p"}
									textDecoration={"line-through"}
									fontSize={"12px"}
									lineHeight={"18px"}
									pl={"1"}
								>
									28.990.000
								</Text>
								<Text as={"p"} fontSize={"12px"} lineHeight={"18px"} color={"#FE3464"}>
									-32%
								</Text>
							</Flex>
						</GridItem>
						<GridItem>
							<Button fontSize={"16px"} fontWeight={600} color={"#0065EE"} bg={"#F5F6FC"}>
								Thêm vào giỏ
							</Button>
						</GridItem>
						<GridItem>
							<Button fontSize={"16px"} fontWeight={600}>
								Mua Ngay
							</Button>
						</GridItem>
					</Grid>
				</Box>
			</Box>
			{/* Quà Tặng kèm */}
			<Gift />
			{/* Mua thêm được giảm */}
			<Buy />
		</>
	);
};

export default Sku;
