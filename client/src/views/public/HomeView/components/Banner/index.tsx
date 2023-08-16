import React from "react";
import { Image } from "@chakra-ui/react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import banner from "~/assets/images/banner.jpeg";

type Props = {};

const Banner = (props: Props) => {
	return (
		<Flex
			w="full"
			h={{
				sm: "260px",
				md: "312px",
			}}
			rounded="md"
			overflow="hidden"
			color="text.white"
			alignItems="center"
			justifyContent="center"
			backgroundColor="#27bece"
		>
			<Flex
				w={{
					sm: 0,
					xl: 1 / 3,
				}}
				display={{
					sm: "none",
					xl: "inline-flex",
				}}
				h="full"
				px="6"
				flexDir="column"
				alignItems="center"
				justifyContent="center"
			>
				<Heading
					as="h1"
					fontSize="27px"
					lineHeight="1.4"
					color="text.white"
					fontWeight="semibold"
				>
					Giao diện mới, phục vụ bạn và người thân tốt hơn 💚💚💚
				</Heading>
				<Text
					fontSize="md"
					lineHeight="1.4"
					mt="2"
				>
					Sau 6 tháng cải tiến, ThinkPro chính thức ra mắt phiên bản Website mới. Đội ngũ ThinkPro luôn tự hào
					với sứ mệnh trở thành thương hiệu bán lẻ Laptop và đồ công nghệ tốt cho bạn và người thân!
				</Text>
			</Flex>
			<Box
				w={{
					sm: "full",
					xl: 2 / 3,
				}}
				h="full"
			>
				<Image
					src={banner}
					w="full"
					h="full"
					objectFit="cover"
				/>
			</Box>
		</Flex>
	);
};

export default Banner;
