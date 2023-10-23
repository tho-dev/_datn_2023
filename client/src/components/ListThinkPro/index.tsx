import React from "react";
import { Grid, GridItem } from "@chakra-ui/layout";
import CardThinkPro from "~/components/CardThinkPro";

type Props = {
	mt?: any; // margin-top
	columns?: any; // số cột
	data?: any;
};

const ListThinkPro = ({ mt = 6, columns = 5, data }: Props) => {
	return (
		<Grid
			w="full"
			gap="3"
			mt={mt}
			templateColumns={{
				sm: "repeat(1, 1fr)",
				md: "repeat(3, 1fr)",
				xl: `repeat(${columns}, 1fr)`,
			}}
		>
			{data?.map((product: any, index: number) => {
				return (
					<GridItem key={index}>
						<CardThinkPro product={product} />
					</GridItem>
				)
			})}
			{/* <GridItem>
				<CardThinkPro />
			</GridItem>
			<GridItem>
				<CardThinkPro />
			</GridItem>
			<GridItem>
				<CardThinkPro />
			</GridItem>
			<GridItem>
				<CardThinkPro />
			</GridItem>
			<GridItem>
				<CardThinkPro />
			</GridItem> */}
		</Grid>
	);
};

export default ListThinkPro;
