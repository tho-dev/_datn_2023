import React from "react";
import { ArrowRightIcon, SearchIcon } from "~/components/common/Icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

type Props = {
	title?: string;
	items?: any;
};

const Card = ({ title, items }: Props) => {
	return (
		<Box
			h="full"
			p="4"
			rounded="md"
			backgroundColor="bg.gray"
		>
			<Heading
				as="h2"
				color="text.black"
				fontSize="md"
				fontWeight="semibold"
			>
				{title}
			</Heading>
			<Flex
				mt="3"
				flexDir="column"
			>
				{items?.length ? (
					items?.map((item: any, index: number) => {
						const Icon = item?.icon;

						return (
							<Flex
								key={index}
								mt="2"
								gap="3"
								fontSize="sm"
								alignItems="center"
								fontWeight="medium"
							>
								<Icon
									size={4}
									strokeWidth={2}
									color="text.blue"
								/>

								{item?.link ? (
									<Link
										as={ReactRouterLink}
										to={item?.link}
										color="text.black"
										textDecoration="none"
										_hover={{
											textDecoration: "none",
										}}
									>
										{item?.title}
									</Link>
								) : (
									<Text color="text.black">{item.title}</Text>
								)}
							</Flex>
						);
					})
				) : (
					<>
						<Text
							fontSize="sm"
							color="text.black"
							fontWeight="medium"
						>
							Phản hồi nóng về chất lượng sản phẩm và dịch vụ. Đội ngũ Kiểm Soát Chất Lượng của chúng tôi
							sẵn sàng lắng nghe quý khách.
						</Text>
						<Link
							to="/"
							as={ReactRouterLink}
							display="block"
							mt="8"
							_hover={{
								textDecoration: "none",
							}}
						>
							<Button
								rightIcon={<ArrowRightIcon size={5} />}
								w="full"
								rounded="md"
								backgroundColor="bg.blue"
							>
								Gửi phản hồi ngay
							</Button>
						</Link>
					</>
				)}
			</Flex>
		</Box>
	);
};

export default Card;
