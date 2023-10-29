import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Image, Divider, Button } from "@chakra-ui/react"; 

 

const PromotionProduct = () => { 

	return (
		<Link
			to={`/khuyen-mai`}
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
						src={"https://images.thinkgroup.vn/unsafe/460x460/https://media-api-beta.thinkpro.vn/media/core/products/2023/4/18/lenovo-thinkbook-16-g5-01-thinkpro-xy3.png"}
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
					Lenovo ThinkBook 16 G5+
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
						 26.790.000
					</Text>
					<Text
						p="2px"
						fontSize="10px"
						color="text.red"
						backgroundColor="#fff5f7"
					>
						-21%
					</Text>
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
				</Flex> 

				<Divider my="3" />
				<Text
					color="text.black"
					fontSize="xs"
					fontWeight="medium"
					// textDecoration="underline"
				>
					Intel Core i5 13500H, 12C/16T
				</Text>
				 
			</Flex>
		</Link>
	);
};

export default PromotionProduct;
