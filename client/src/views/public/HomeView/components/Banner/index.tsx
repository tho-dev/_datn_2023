import { Image } from "@chakra-ui/react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";

type Props = {
	banner: any;
};

const Banner = ({ banner }: Props) => {
	return (
		<Flex
			w="full"
			h={{
				sm: "312px",
				md: "340px",
			}}
			rounded="md"
			overflow="hidden"
			color="text.white"
			alignItems="center"
			justifyContent="center"
			backgroundColor={banner?.banner_background_color}
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
				alignItems="flex-start"
				justifyContent="flex-start"
			>
				<Heading
					as="h1"
					mt="6"
					fontSize="2xl"
					lineHeight="1.4"
					color={banner?.banner_color}
					fontWeight="semibold"
				>
					{banner?.banner_title}
				</Heading>
				<Text
					fontSize="md"
					lineHeight="1.4"
					mt="2"
				>
					{banner?.meta_description}
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
					src={banner?.banner_thumbnail?.url}
					w="full"
					h="full"
					objectFit="cover"
				/>
			</Box>
		</Flex>
	);
};

export default Banner;
