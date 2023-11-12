import { Box } from "@chakra-ui/layout";
import TableCompare from "./TableCompare";

type Props = {
	products: any;
};

const ListTableCompare = ({ products }: Props) => {
	return (
		<Box>
			{products?.map((item: any, index: number) => {
				return (
					<TableCompare
						item={item}
						key={index}
						index={index}
					/>
				);
			})}
		</Box>
	);
};

export default ListTableCompare;
