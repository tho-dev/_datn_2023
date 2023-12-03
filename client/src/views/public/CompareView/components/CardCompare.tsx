import { Box, Image, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { ArrowRightIcon, CloseSmallIcon } from "~/components/common/Icons";
import { formatNumber } from "~/utils/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "~/redux/hook/hook";
import { remoteItems } from "~/redux/slices/globalSlice";

type Props = {
	item: any;
	length: any;
};

const CardCompare = ({ item, length }: Props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return (
		<Box
			w="full"
			h="full"
			overflow="hidden"
			rounded="md"
			display="inline-block"
			backgroundColor="bg.white"
			_hover={{
				textDecoration: "none",
			}}
		>
			<Box
				pb="100%"
				position="relative"
			>
				<Box
					top="0"
					position="absolute"
				>
					<Image
						w="full"
						h="full"
						objectFit="cover"
						src={item?.image}
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
					css={{
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{item?.name}
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
						{formatNumber(`${item.price}`)}
					</Text>
					<Text
						p="2px"
						fontSize="10px"
						color="text.red"
						backgroundColor="#fff5f7"
					>
						{`-${item?.price_discount_percent}%`}
					</Text>
				</Flex>
				<Flex
					gap={2}
					mt={4}
					flexDirection="column"
				>
					<Button
						as={Link}
						to={`/${item?.shared_url}`}
						rightIcon={<ArrowRightIcon size={5} />}
						bgColor="bg.blue"
					>
						Xem Ngay
					</Button>
					<Button
						color="text.black"
						bgColor="bg.gray"
						fontWeight="semibold"
						rightIcon={<CloseSmallIcon size={5} />}
						onClick={() => {
							if (length == 1) {
								navigate(`/${item?.shared_url}`);
							} else {
								dispatch(
									remoteItems({
										id: item?.id,
									})
								);
							}
						}}
					>
						Xoá
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default CardCompare;
