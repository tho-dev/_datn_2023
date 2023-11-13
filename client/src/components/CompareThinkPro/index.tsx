import { Box, Center } from "@chakra-ui/layout";
import { Button, Flex, Image, Tag, TagRightIcon, Text } from "@chakra-ui/react";
import { useAppDispatch } from "~/redux/hook/hook";
import { remoteItems, setItems } from "~/redux/slices/globalSlice";
import { ArrowRightIcon, CloseSmallIcon } from "../common/Icons";
import { useNavigate } from "react-router";

type Props = {
	items: any;
};

const Compare = ({ items }: Props) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (
		<Box
			height="80px"
			bgColor="bg.white"
			width="100%"
		>
			<Center>
				<Box
					w="full"
					maxW={{
						md: "768px",
						xl: "1200px",
					}}
					px={{
						sm: 4,
						md: 6,
						xl: 0,
					}}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					h="80px"
					gap="6"
				>
					<Flex gap="4">
						{items?.map((item: any, index: number) => {
							return (
								<Tag
									size="lg"
									px="3"
									py="6px"
									key={index}
									flex="1"
								>
									<Image
										w="30px"
										h="30px"
										objectFit="cover"
										src={item?.image}
									/>
									<Text
										fontWeight="semibold"
										fontSize="12px"
										paddingLeft="5px"
										css={{
											display: "-webkit-box",
											WebkitLineClamp: 1,
											WebkitBoxOrient: "vertical",
											overflow: "hidden",
										}}
									>
										{item?.name}
									</Text>
									<TagRightIcon
										cursor="pointer"
										onClick={() =>
											dispatch(
												remoteItems({
													id: item.id,
												})
											)
										}
									>
										<CloseSmallIcon size={2} />
									</TagRightIcon>
								</Tag>
							);
						})}
					</Flex>
					<Flex gap={4}>
						<Button
							size="md"
							fontSize="xs"
							color="text.black"
							backgroundColor="bg.gray"
							fontWeight="semibold"
							rounded="md"
							onClick={() => dispatch(setItems([]))}
						>
							Xoá tất cả
						</Button>
						<Button
							size="md"
							fontSize="xs"
							rightIcon={<ArrowRightIcon size={4} />}
							bgColor="bg.blue"
							fontWeight="semibold"
							rounded="md"
							disabled={items?.length < 1}
							onClick={() => {
								if (items?.length > 1) {
									const slugs = items?.map((item: any) => item?.slug);
									navigate(`/so-sanh/${slugs.join("-vs-")}`);
								}
							}}
						>
							So sánh ngay
						</Button>
					</Flex>
				</Box>
			</Center>
		</Box>
	);
};

export default Compare;
