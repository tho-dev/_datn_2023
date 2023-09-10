import { Box, Center } from "@chakra-ui/layout";
import React from "react";
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton, Image, Text, Button, Flex } from "@chakra-ui/react";
import { ArrowRightIcon, CloseSmallIcon } from "../common/Icons";

type Props = {};

const Compare = (props: Props) => {
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
				>
					<Box>
						<Tag
							size="lg"
							padding="1"
						>
							<Image
								w="30px"
								h="30px"
								objectFit="cover"
								src="https://images.thinkgroup.vn/unsafe/460x460/https://media-api-beta.thinkpro.vn/media/core/products/2022/8/3/LG-Gram-14-2022-ThinkPro-10.jpg"
							/>
							<Text
								fontWeight="semibold"
								fontSize="12px"
								paddingLeft="5px"
							>
								Dell Inspiron 16 5630
							</Text>
							<TagRightIcon>
								<CloseSmallIcon size={2} />
							</TagRightIcon>
						</Tag>
					</Box>
					<Flex gap={4}>
						<Button
							size="sm"
							fontSize="xs"
							color="text.black"
							backgroundColor="bg.gray"
							fontWeight="semibold"
						>
							Xoá tất cả
						</Button>
						<Button
							size="sm"
							fontSize="xs"
							rightIcon={<ArrowRightIcon size={4} />}
							bgColor="bg.blue"
							fontWeight="semibold"
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
