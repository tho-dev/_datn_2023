import {
	Box,
	Button,
	Flex,
	FormLabel,
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Radio,
	Switch,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ListThinkPro from "~/components/ListThinkPro";
import { ArrowUpIcon } from "~/components/common/Icons";
import { useGetFilterBrandAndCategoryQuery, useGetProducItemToBrandAndCategoryQuery } from "~/redux/api/collection";
import FilterProduct from "./components/Filter";
import Title from "./components/Title";
import LoadingPolytech from "~/components/LoadingPolytech";
import { useNavigate } from "react-router-dom";

type Props = {};

const SlugView = (props: Props) => {
	const { slug: params } = useParams();
	const navigate = useNavigate();
	const [showCompare, setShowCompare] = useState<boolean>(false);
	const [slug, setSlug] = useState<string>("");
	const [page, setPage] = useState<any>(1);
	const [data, setData] = useState<any>([]);

	const {
		data: products,
		isLoading,
		isFetching,
		isError,
	} = useGetProducItemToBrandAndCategoryQuery(
		{
			_page: page,
			_limit: 20,
			_order: "desc",
			_sort: "created_at",
			_category: slug,
		},
		{
			skip: !slug,
		}
	);

	const { data: filters } = useGetFilterBrandAndCategoryQuery(
		{
			_slug: slug,
		},
		{ skip: !slug }
	);

	useEffect(() => {
		if (params) {
			setSlug(params);
			setData([]);
		}
	}, [params]);

	useEffect(() => {
		if (products) {
			const docs = products?.data?.items as any;
			setData([...data, ...docs]);
		}
	}, [products]);

	const handleCompare = () => {
		setShowCompare(!showCompare);
	};

	if (isFetching) {
		return <LoadingPolytech />;
	}

	if (isError) {
		navigate("/404");
	}

	return (
		<Box m="30px 0">
			<Title filters={filters?.data} />

			<Flex gap="4">
				{filters?.data?.filters?.map((item: any) => {
					return (
						<FilterProduct
							title={item?.label}
							data={item?.options}
						/>
					);
				})}
			</Flex>

			<Box m="30px 0">
				<Flex
					w="100%"
					justifyContent="space-between"
					m="30px 0"
				>
					<Flex
						alignItems="center"
						gap={2}
					>
						<Switch
							size="md"
							id="isChecked"
							onChange={handleCompare}
							value={showCompare as any}
						/>
						<FormLabel
							htmlFor="isChecked"
							fontSize="sm"
							marginTop={2}
						>
							So sánh
						</FormLabel>
					</Flex>

					<Box>
						<Popover isLazy>
							<PopoverTrigger>
								<Button
									bgColor="bg.white"
									color="black"
									fontSize="xs"
									fontWeight="semibold"
									rightIcon={<ArrowUpIcon size={4} />}
									padding="3"
									rounded="lg"
								>
									Sắp xếp : Nổi bật nhất
								</Button>
							</PopoverTrigger>
							<PopoverContent maxW="200px">
								<PopoverHeader fontWeight="medium">
									<Flex
										maxW="200px"
										flexDir="column"
										gap="2"
									>
										<Box w="full">
											<Radio value="1">
												<Text fontSize="sm">Nổi bật nhất</Text>
											</Radio>
										</Box>
										<Box w="full">
											<Radio value="1">
												<Text fontSize="sm">Giá thấp -&gt; cao</Text>
											</Radio>
										</Box>
										<Box w="full">
											<Radio value="1">
												<Text fontSize="sm">Giá thấp -&gt; cao</Text>
											</Radio>
										</Box>
									</Flex>
								</PopoverHeader>
							</PopoverContent>
						</Popover>
					</Box>
				</Flex>

				{/* danh sách sản phẩm */}
				<ListThinkPro data={data} />
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				m="10px 0"
			>
				<Button
					isLoading={isFetching}
					bgColor="bg.white"
					color="bg.blue"
					width="30%"
					fontWeight="semibold"
					fontSize="md"
					size="lager"
					onClick={() => {
						if (products?.data?.paginate?.hasNextPage) {
							setPage(products?.data?.paginate?.nextPage);
						}
					}}
					_hover={{ bg: "gray.300" }}
				>
					Xem thêm
				</Button>
			</Box>
		</Box>
	);
};

export default SlugView;
