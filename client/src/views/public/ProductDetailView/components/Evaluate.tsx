import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import React, { useState } from "react";
import Progress from "./Progress";
import { Button, Text } from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";
import PopupEvalute from "./PopupEvalute";
type Props = {};

const Evaluate = (props: Props) => {
	return (
		<Box
			my={"5"}
			p="6"
			rounded="6px"
			bgColor={"bg.white"}
		>
			<Flex
				justifyContent={"space-between"}
				pb={"4"}
			>
				<Text
					as={"h5"}
					fontSize={"lg"}
					fontWeight={"600"}
				>
					Đánh giá từ chuyên gia
				</Text>
				<Button
					bg={"white"}
					color={"black"}
					textAlign={"end"}
					px="0"
				>
					<Text pr={"1"}>
						<PopupEvalute />
					</Text>
					<NavArrowRightIcon
						size={4}
						strokeWidth={2}
						color="text.black"
					/>
				</Button>
			</Flex>
			<Grid
				templateColumns="repeat(3, 1fr)"
				gap="6"
			>
				<GridItem>
					<Progress
						rate={100}
						title="Văn phòng, học tập"
					/>
				</GridItem>
				<GridItem>
					<Progress
						rate={3}
						title="Văn phòng, học tập"
					/>
				</GridItem>
				<GridItem>
					<Progress
						rate={100}
						title="Văn phòng, học tập"
					/>
				</GridItem>
				<GridItem>
					<Progress
						rate={100}
						title="Văn phòng, học tập"
					/>
				</GridItem>
				<GridItem>
					<Progress
						rate={100}
						title="Văn phòng, học tập"
					/>
				</GridItem>
				<GridItem>
					<Progress
						rate={100}
						title="Văn phòng, học tập"
					/>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default Evaluate;
