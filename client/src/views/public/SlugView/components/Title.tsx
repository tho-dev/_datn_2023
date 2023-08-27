import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link, Flex } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";

type Props = {};

const Title = (props: Props) => {
	return (
		<Box
			w="100%"
			p="6"
			bg="white"
			my={6}
			borderRadius={12}
		>
			<Box my={1}>
				<Text
					fontSize="2xl"
					fontWeight="bold"
				>
					Laptop
				</Text>
				<Text
					fontSize="sm"
					w="100%"
					maxW="600px"
					fontWeight={500}
					lineHeight="20px"
					my="2"
				>
					Laptop là một thiết bị máy tính có kích thước nhỏ gọn và di động. Nó được thiết kế để sử dụng trong
					các hoạt động làm việc, giải trí hoặc học tập khi di chuyển mà không cần phải sử dụng những chiếc
					máy tính để bàn cồng kềnh.
				</Text>
			</Box>
			<Box
				w="100%"
				h="1px"
				bgColor="bg.gray"
				my="4"
			></Box>
			<Flex
				gap="4"
				mt="4"
				flexWrap="wrap"
			>
				{Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((item) => {
					return (
						<Link
							to="/"
							as={ReactRouterLink}
							_hover={{
								textDecoration: "none",
							}}
						>
							<Button
								h="auto"
								px="4"
								py="3"
								size="small"
								lineHeight="150%"
								rounded="lg"
								color="text.black"
								backgroundColor="bg.gray"
							>
								Dell
							</Button>
						</Link>
					);
				})}
			</Flex>
		</Box>
	);
};

export default Title;
