import { Box, Flex, Input } from "@chakra-ui/react";
import { SearchIcon } from "~/components/common/Icons";

type Props = {};

const Search = (props: Props) => {
	return (
		<Flex
			w="full"
			maxW="360px"
			px="4"
			py="14px"
			ml="6"
			display={{
				sm: "none",
				md: "flex",
			}}
			rounded="full"
			alignItems="center"
			backgroundColor="bg.gray"
		>
			<SearchIcon size={4} />
			<Input
				w="full"
				h="full"
				px="0"
				pl="2"
				border="none"
				lineHeight="1.6"
				backgroundColor="bg.gray"
				placeholder="Tên sản phẩm, nhu cầu, hàng"
				_placeholder={{
					color: "#6b7075",
					opacity: 0.5,
					fontWeight: 500,
				}}
			/>
		</Flex>
	);
};

export default Search;
