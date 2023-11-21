import { Box, Flex } from "@chakra-ui/layout";
import { Button, Image, Input, Text } from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "~/components/common/Icons";
import { formatNumber } from "~/utils/fc";

type Props = {
	item: any;
	handleIncrementProduct: (sku_id: string) => void;
	handleDecrementProduct: (sku_id: string) => void;
};

const CartItem = ({ item, handleIncrementProduct, handleDecrementProduct }: Props) => {
	return (
		<Flex gap="4">
			<Box
				w="68px"
				h="68px"
				rounded="lg"
				overflow="hidden"
				borderWidth="1px"
				borderColor="#eef1f6"
				boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
			>
				<Image
					src={item?.sku_id?.image?.url}
					w="full"
					h="full"
					objectFit="cover"
				/>
			</Box>
			<Flex flex="1">
				<Flex
					flex="1"
					gap="1"
					flexDir="column"
				>
					<Text
						fontSize="13px"
						color="text.black"
						fontWeight="semibold"
					>
						{item?.sku_id?.name}
					</Text>

					<Flex
						gap="2"
						flexWrap="wrap"
					>
						{item.option_value?.map((x: any, i: any) => {
							return (
								<Text
									key={i}
									px="3"
									py="1"
									fontSize="xs"
									fontWeight="semibold"
									rounded="xl"
									borderWidth="1px"
									borderColor="#eef1f6"
									boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
								>
									{x}
								</Text>
							);
						})}
					</Flex>

					<Flex
						mt="2"
						h="8"
					>
						<Button
							border={"1px solid #ccc"}
							w={"2"}
							h="full"
							borderRadius={"4px 0px 0px 4px"}
							bgColor={"White"}
							borderRight={"none"}
							color={"black"}
							onClick={() => handleDecrementProduct(item.sku_id._id)}
							px="4"
						>
							<MinusIcon size={4} />
						</Button>
						<Input
							w={"10"}
							textAlign={"center"}
							borderRadius={"0px"}
							border={"1px solid #ccc"}
							h="full"
							fontWeight="bold"
							fontSize="md"
							value={item?.quantity}
						/>
						<Button
							px="4"
							border={"1px solid #ccc"}
							w={"2"}
							borderRadius={"0px 4px 4px 0px"}
							bgColor={"White"}
							color={"black"}
							borderLeft={"none"}
							h="full"
							onClick={() => handleIncrementProduct(item.sku_id._id)}
						>
							<PlusIcon size={4} />
						</Button>
					</Flex>
				</Flex>

				<Flex
					mr="4"
					gap="3"
					flexDir="column"
					justifyContent="flex-start"
				>
					<Text
						fontSize="sm"
						color="text.textDelete"
						fontWeight="black"
						display="inline-flex"
						textAlign="right"
					>
						x{item?.quantity}
					</Text>
					<Text
						fontSize="sm"
						fontWeight="bold"
						display="inline-flex"
						alignItems="center"
						justifyContent="center"
					>
						{formatNumber(`${item.total_money}`)} VND
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CartItem;
