import { Box, Divider } from "@chakra-ui/layout";
import React from "react";
import ListCardCompare from "./components/ListCardCompare";
import ListTableCompare from "./components/ListTableCompare";

type Props = {};

const CompareView = (props: Props) => {
	return (
		<Box py="6">
			<ListCardCompare />
			<ListTableCompare />
		</Box>
	);
};

export default CompareView;