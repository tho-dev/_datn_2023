import { Box, Heading, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import Metrics from "./components/Metrics";
import thinkpro from "~/data/clone-thinkpro.json";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";

type Props = {};

const DashboardView = (props: Props) => {
	const columnHelper = createColumnHelper<any>();
	const { isOpen, onClose, onOpen } = useDisclosure();

	const columns = [
		columnHelper.accessor("#", {
			cell: (info) => {
				const index = info.row.index;
				return index + 1;
			},
			header: "#",
		}),
		columnHelper.accessor("thumbnail", {
			cell: (info) => {
				return <h1>{info.getValue()?.filename}</h1>;
			},
			header: "Tên sản phẩm",
		}),
		columnHelper.accessor("slug", {
			cell: (info) => info.getValue(),
			header: "Slug",
		}),
		columnHelper.accessor("desc", {
			cell: (info) => info.getValue(),
			header: "Mô tả",
			meta: {
				isNumeric: true,
			},
		}),
		columnHelper.accessor("action", {
			cell: () => {
				return (
					<Menu>
						<MenuButton
							fontSize="sm"
							fontWeight="bold"
							w="5"
							h="5"
							rounded="sm"
							alignItems="center"
							justifyContent="center"
							color="text.admin2"
							bgColor="#f1f4f9"
							css={{
								"& span": {
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "-8px",
								},
							}}
						>
							...
						</MenuButton>
						<MenuList>
							<MenuItem onClick={onOpen}>Xóa</MenuItem>
							<MenuItem>Payments </MenuItem>
						</MenuList>
					</Menu>
				);
			},
			header: "Action",
		}),
	];

	return (
		<Box
			w="full"
			h="full"
		>
			{/*Header */}
			<Box>
				<Heading
					as="h1"
					color="text.black"
					fontSize="2xl"
					fontWeight="bold"
				>
					Hello, Truong Nguyen
				</Heading>
				<Text
					color="text.admin2"
					fontSize="md"
					fontWeight="normal"
				>
					Welcome back to Dashboard
				</Text>
			</Box>

			{/* Số liệu */}
			<Metrics />

			{/* Test table */}
			<Box
				bgColor="bg.white"
				mt="6"
				p="6"
			>
				<TableThinkPro
					columns={columns}
					data={thinkpro.data}
				/>
			</Box>
			<ConfirmThinkPro
				isOpen={true}
				onClose={onClose}
				onOpen={onOpen}
			/>
		</Box>
	);
};

export default DashboardView;
