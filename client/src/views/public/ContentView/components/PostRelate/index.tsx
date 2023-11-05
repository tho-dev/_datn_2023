import { Image } from "@chakra-ui/react";
import { Box, Text, Flex, Link, Heading } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAppDispatch } from "~/redux/hook/hook";
import { addViewedItem } from "~/redux/slices/globalSlice";

type Props = {
	product?: any;
};

const PostRelate = ({ product }: Props) => {
	const dispatch = useAppDispatch();

	const handleViewProduct = () => {
		const productData = {
			// productName: "LG Gram 14 2022",
			// price: "19.999.000",
		};
		dispatch(addViewedItem(productData));

		window.location.href = product?.slug;
	};

	return (
		<Link
			to={product?.slug}
			as={ReactRouterLink}
			w="full"
			rounded="xl"
			overflow="hidden"
			display="inline-block"
			backgroundColor="bg.white"
			_hover={{
				textDecoration: "none",
			}}
			onClick={handleViewProduct}
		>
			<Box
				position="relative"
				w="full"
				h="full"
				paddingBottom="55%"
			>
				<Box
					position="absolute"
					w="full"
					h="full"
				>
					<Image
						w="full"
						h="full"
						objectFit="cover"
						src={product?.thumbnail}
					/>
				</Box>
			</Box>
			<Text
				p={5}
				fontSize={16}
				fontWeight={"semibold"}
			>
				{product?.title}
			</Text>
		</Link>
	);
};

export default PostRelate;
