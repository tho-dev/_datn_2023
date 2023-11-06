import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import SelectThinkPro from "~/components/SelectThinkPro";
import { PlusCircleIcon, SearchIcon } from "~/components/common/Icons";
import { useForm } from "react-hook-form";

type Props = {
	search: string;
	handleSearched: (e: any) => void;
};

const UserSearch = ({ search, handleSearched }: Props) => {
	const { control } = useForm();

	return (
		<Flex
			alignItems="center"
			justifyContent="space-between"
			mb="6"
		>
			<Flex
				gap="4"
				w="60%"
			>
				<Box flex="1">
					<SelectThinkPro
						control={control}
						name="category"
						title=""
						placeholder="-- Chọn quyền --"
						data={[
							{
								label: "Admin",
								value: "1",
							},
							{
								label: "Cutomer",
								value: "2",
							},
						]}
					/>
				</Box>

				<Box flex="1">
					<SelectThinkPro
						control={control}
						name="category"
						title=""
						placeholder="-- Trạng thái --"
						data={[
							{
								label: "Đã xác thực",
								value: "1",
							},
							{
								label: "Chưa xác thực",
								value: "2",
							},
						]}
					/>
				</Box>

				<Flex
					flex="2"
					px="4"
					rounded="8px"
					alignItems="center"
					borderWidth="1px"
					borderColor="#e9ebec"
				>
					<Flex
						as="span"
						alignItems="center"
						justifyContent="center"
					>
						<SearchIcon
							size={5}
							color="text.black"
							strokeWidth={1}
						/>
					</Flex>
					<Input
						border="none"
						padding="0.6rem 0.9rem"
						fontSize="15"
						fontWeight="medium"
						lineHeight="1.5"
						w="260px"
						placeholder="Tìm kiếm tài khoản"
						onChange={handleSearched}
					/>
				</Flex>
			</Flex>
			<Flex
				flex="1"
				justifyContent="flex-end"
			>
				<Button
					leftIcon={
						<PlusCircleIcon
							size={5}
							color="text.textSuccess"
						/>
					}
					px="4"
					lineHeight="2"
					color="text.textSuccess"
					bgColor="bg.bgSuccess"
					as={ReactRouterLink}
					to="add"
				>
					Tạo Mới
				</Button>
			</Flex>
		</Flex>
	);
};

export default UserSearch;
