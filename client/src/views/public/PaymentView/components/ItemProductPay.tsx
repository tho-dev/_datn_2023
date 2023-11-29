import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";

type Props = {
	product: any;
};

const ItemProductPay = ({ product }: Props) => {
	return (
		<>
			<Flex
				justifyContent={"space-between"}
				my={"4"}
				px={"2"}
			>
				<Flex gap="4">
					<Box
						w="64px"
						h="64px"
						border="1px solid #eef1f6"
						rounded="md"
						overflow="hidden"
					>
						<Image
							w="full"
							h="full"
							objectFit="cover"
							src={product?.image?.url}
							alt="name"
						/>
					</Box>
					<Box flex="1">
						<Text
							as={"p"}
							fontSize={"xs"}
							fontWeight="bold"
						>
							{product?.name}
						</Text>
						<Box>
							<Text
								as={"p"}
								fontSize={"12px"}
								backgroundColor={"#F6F9FC"}
								my={"1"}
								textOverflow={"ellipsis"}
								overflow={"hidden"}
								whiteSpace={"nowrap"}
								w={"257px"}
								fontWeight="semibold"
							>
								{product.option_value.toString()}
							</Text>
						</Box>
						<Box>
							<Flex alignItems={"center"}>
								<Text
									as={"p"}
									fontSize={"13px"}
									color={"text.red"}
									fontWeight={"semibold"}
								>
									{product.price.toLocaleString()}
								</Text>
								<Text
									as={"p"}
									ml={"8px"}
									fontSize={"13px"}
									fontWeight="bold"
								>
									x{product.quantity}
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
