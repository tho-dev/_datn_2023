import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Image, Divider, Button } from "@chakra-ui/react";
import { PlusIcon } from "../common/Icons";
import { addViewedItem } from "~/redux/slices/globalSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";
import { formatNumber } from "~/utils/fc";
import defaultImage from "~/assets/images/logo-thinkpro.svg";

type Props = {
	product?: IProduct;
	mode?: string;
	showCompare?: boolean;
};

const CardThinkPro = ({ product, mode = "home", showCompare }: Props) => {
	const dispatch = useAppDispatch();

	const handleViewProduct = () => {
		const productData = {
			productName: "LG Gram 14 2022",
			price: "19.999.000",
		};
		dispatch(addViewedItem(productData));
	};

	return (
		<Link
			to={`/${product?.shared_url}`}
			as={ReactRouterLink}
			w="full"
			h="full"
			overflow="hidden"
			rounded="md"
			display="inline-block"
			backgroundColor="bg.white"
			_hover={{
				textDecoration: "none",
			}}
			onClick={handleViewProduct}
		>
			<Box
				pb="100%"
				position="relative"
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

				{/* {product?.specs && <Divider my="3" />} */}
				{/* <Text
					color="text.black"
					fontSize="sm"
					fontWeight="medium"
					textDecoration="underline"
				>
					Quà tặng 400.000
				</Text> */}
				{showCompare && (
					<>
						<Divider my="3" />
						<Flex>
							<Button
								bgColor="white"
								color="blue"
								leftIcon={<PlusIcon size={4} />}
								padding={1}
							>
								So sánh
							</Button>
						</Flex>
					</>
				)}
			</Flex>
		</Link>
	);
};

export default CardThinkPro;
