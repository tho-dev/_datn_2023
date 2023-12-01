import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";

type Props = {
	product: any;
};

const ItemCart = ({ product }: Props) => {
	return (
		<>
			<Flex
				justifyContent={"space-between"}
				my={"4"}
			>
				<Flex
					gap="2"
					alignItems="center"
				>
					<Box
						w="54px"
						h="54px"
						rounded="md"
						borderWidth="1px"
						borderColor="#eef1f6"
						boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
						overflow="hidden"
					>
						<Image
							src={product?.image.url || ""}
							alt="name"
							w="full"
							h="full"
							objectFit="cover"
						/>
					</Box>
					<Box ml={"2"}>
						<Text
							as={"p"}
							fontSize={"12px"}
							fontWeight={"bold"}
						>
							{product?.name}
						</Text>
						<Flex
							gap="2"
							flexWrap="wrap"
							my={2}
						>
							{product.option_value?.map((x: any, i: any) => {
								return (
									<Text
										key={i}
										px="3"
										py="1"
										fontSize="10px"
										fontWeight="bold"
										rounded="4px"
										borderWidth="1px"
										borderColor="#eef1f6"
										boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
									>
										{x}
									</Text>
								);
							})}
						</Flex>
					</Box>
				</Flex>
			</Flex>
		</>
	);
};

export default ItemCart;
