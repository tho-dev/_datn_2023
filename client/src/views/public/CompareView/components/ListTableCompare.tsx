import { Box } from "@chakra-ui/layout";
import React from "react";
import TableCompare from "./TableCompare";

type Props = {};

const ListTableCompare = (props: Props) => {
	return (
		<Box>
			<TableCompare />
			<TableCompare />
			<TableCompare />
			<TableCompare />
		</Box>
	);
};

export default ListTableCompare;
