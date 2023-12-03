import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text, Input, Button } from "@chakra-ui/react";
import { CloseIcon, MinusIcon, PlusIcon } from "~/components/common/Icons";
import { Link } from "react-router-dom";
import { formatMoney, formatNumber } from "~/utils/fc";

type Props = {
	data: any;
	handleIncement: (product: any) => void;
	handleDercement: (product: any) => void;
	handleRemove: (product: any) => void;
};

const ItemCart = ({ data, handleDercement, handleIncement, handleRemove }: Props) => {
	return (
		<>
			{data.products.map((product: any) => {
				return (
					<Flex
						justifyContent={"space-between"}
						key={product?._id}
						pb="3"
						mb="3"
						borderBottomWidth="1px"
						borderColor="#e9ebec"
					>
						<Flex
							gap="2"
							alignItems="center"
						>
							<Box
								w="84px"
								h="84px"
								rounded="md"
								borderWidth="1px"
								borderColor="border.primary"
								bgColor="bg.gray"
								overflow="hidden"
							>
								<Image
									src={product?.image?.url}
									alt="name"
									w="full"
									h="full"
									objectFit="contain"
								/>
							</Box>
							<Box ml={"5"}>
								<Link
									to={`/${product?.shared_url}`}
									color="text.black"
								>
									<Text
										as={"p"}
										fontSize={"sm"}
										fontWeight="bold"
										css={{
											display: "-webkit-box",
											WebkitLineClamp: 1,
											WebkitBoxOrient: "vertical",
											overflow: "hidden",
										}}
									>
										{product.name}
									</Text>
								</Link>

								<Flex
									mt="1"
									gap="2"
								>
									{product.option_value.map((_x: any, i: number) => {
										return (
											<Text
												key={i}
												as={"p"}
												fontSize={"11px"}
												px="3"
												py="1"
												rounded="full"
												fontWeight="semibold"
												borderWidth="1px"
												borderColor="#eef1f6"
												boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
											>
												{_x}
											</Text>
										);
									})}
								</Flex>
								<Flex
									mt="2"
									h="7"
								>
									<Button
										border={"1px solid #e9ebec"}
										w={"12px"}
										h="full"
										px="4"
										borderRadius={"4px 0px 0px 4px"}
										bgColor={"White"}
										borderRight={"none"}
										color={"black"}
										onClick={() => handleIncement(product)}
									>
										<MinusIcon size={3} />
									</Button>
									<Input
										value={product.quantity}
										w={"48px"}
										textAlign={"center"}
										borderRadius={"0px"}
										border={"1px solid #e9ebec"}
										h="full"
										fontWeight="semibold"
										fontSize="sm"
									/>
									<Button
										border={"1px solid #e9ebec"}
										w={"12px"}
										h="full"
										px="4"
										borderRadius={"0px 4px 4px 0px"}
										bgColor={"White"}
										color={"black"}
										borderLeft={"none"}
										onClick={() => handleDercement(product)}
									>
										<PlusIcon size={3} />
									</Button>
								</Flex>
							</Box>
						</Flex>
						<Box float="right">
							<Text
								as={"p"}
								textDecoration={"line-through"}
								fontSize={"12px"}
								textAlign="right"
							>
								{formatNumber(`${product.price_before_discount}`)}
							</Text>
							<Text
								as={"p"}
								fontSize={"lg"}
								color={"#FE3464"}
								fontWeight={"semibold"}
							>
								{formatNumber(`${product.price}`)}
							</Text>
							<Button
								onClick={() => handleRemove(product)}
								fontSize="10px"
								px="4"
								h="6"
								mt="2"
								rounded="4px"
								float="right"
							>
								Xóa
							</Button>
						</Box>
					</Flex>
				);
			})}

			{/* <ItemBonus /> */}
		</>
	);
};

export default ItemCart;
