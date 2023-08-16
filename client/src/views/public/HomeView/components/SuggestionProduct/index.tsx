import React from "react";
import { Box, Heading } from "@chakra-ui/layout";
import ListThinkPro from "~/components/ListThinkPro";
import ScrollableThinkPro from "~/components/ScrollableThinkPro";
import thinkpro from "~/data/clone-thinkpro.json";

type Props = {
	title?: string;
};

const SuggestionProduct = ({ title }: Props) => {
	return (
		<Box mt="12">
			<Heading
				as="h2"
				fontSize="28px"
			>
				{title}
			</Heading>
			{/* Danh mục */}
			<ScrollableThinkPro
				isArrow
				items={thinkpro.data}
				nextEl="btn-next--crollable"
				prevEl="btn-prev--crollable"
			/>
			{/* Danh sách sản phẩm */}
			<ListThinkPro columns={5} />
		</Box>
	);
};

export default SuggestionProduct;
