import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Button, Checkbox, Divider, Image } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { addViewedItem, setItems, remoteItems } from "~/redux/slices/globalSlice";
import { formatNumber } from "~/utils/fc";
import { PlusIcon } from "../common/Icons";
import { useToast } from "@chakra-ui/react";

type Props = {
	product?: IProduct;
	mode?: string;
};

const CardThinkPro = ({ product, mode = "home" }: Props) => {
	const toast = useToast();
	const dispatch = useAppDispatch();
	const { items, isCompare } = useAppSelector((state) => state.persistedReducer.global);

	const handleViewProduct = () => {
		dispatch(addViewedItem(product));
	};

	return (
		<Box
			w="full"
			h="full"
			overflow="hidden"
			rounded="xl"
			display="inline-block"
			backgroundColor="bg.white"
			_hover={{
				textDecoration: "none",
			}}
			onClick={handleViewProduct}
		>
			<Box
				to={`/${product?.shared_url}`}
				as={ReactRouterLink}
				pb="100%"
				position="relative"
				display="block"
			>
				<Box
					top="0"
					position="absolute"
					bgColor="bg.white"
				>
					<Image
						w="full"
						h="full"
						objectFit="cover"
						src={product?.image}
					/>
				</Box>
			</Box>
			<Flex
				p="4"
				flexDirection="column"
			>
				<Heading
					as="h4"
					fontSize="sm"
					fontWeight="semibold"
				>
					{product?.name}
				</Heading>
				<Flex
					gap="1"
					mt="1"
					alignItems="center"
					fontWeight="semibold"
				>
					<Text
						fontSize="xs"
						color="text.gray"
					>
						Từ
					</Text>
					<Text
						fontSize="md"
						color="text.red"
					>
						{formatNumber(`${product?.price_before_discount}`)}
					</Text>

					{product?.price_discount_percent != 0 && (
						<Text
							p="2px"
							fontSize="10px"
							color="text.red"
							backgroundColor="#fff5f7"
						>
							{`${product?.price_discount_percent}%`}
						</Text>
					)}
				</Flex>
				<Flex
					gap="1"
					alignItems="center"
					fontWeight="semibold"
				>
					<Text
						fontSize="xs"
						color="text.gray"
					>
						Màu
					</Text>
					<Flex gap="1">
						{product?.colors?.map((color: any, index: number) => {
							return (
								<Box
									w="3"
									h="3"
									rounded="sm"
									backgroundColor={color?.value}
								/>
							);
						})}
					</Flex>
				</Flex>
				{product?.specs && <Divider my="3" />}
				{mode == "home" && (
					<>
						<Box
							color="text.black"
							fontSize="xs"
							fontWeight="medium"
							dangerouslySetInnerHTML={{ __html: product?.specs as string }}
						/>
					</>
				)}
				{isCompare && (
					<>
						<Divider my="3" />
						<Flex>
							{items?.find((item: any) => item.id == product?._id) ? (
								<Checkbox defaultChecked>
									<Text
										fontSize="xs"
										color="text.blue"
										fontWeight="semibold"
										onClick={() => {
											dispatch(
												remoteItems({
													id: product?._id,
												})
											);
										}}
									>
										Đã thêm vào so sánh
									</Text>
								</Checkbox>
							) : (
								<Button
									bgColor="white"
									color="blue"
									leftIcon={<PlusIcon size={4} />}
									padding={1}
									h="36px"
									fontSize="13px"
									onClick={() => {
										if (items?.length >= 4) {
											toast({
												title: "Cảnh báo",
												duration: 1200,
												description: "Bạn chỉ so sánh tối đa 4 sản phẩm",
												status: "warning",
												position: "top-right",
											});
											return;
										}

										dispatch(
											setItems([
												...items,
												{
													id: product?._id,
													slug: product?.slug,
													shared_url: product?.shared_url,
													name: product?.name,
													image: product?.image,
													space: product?.specs,
													price: product?.price_before_discount,
													price_discount_percent: product?.price_discount_percent,
												},
											])
										);
									}}
								>
									So sánh
								</Button>
							)}
						</Flex>
					</>
				)}
			</Flex>
		</Box>
	);
};

export default CardThinkPro;
