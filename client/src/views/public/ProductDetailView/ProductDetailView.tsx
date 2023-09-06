import React from "react";
import Gallery from "./components/Swiper";
import { Box, Flex, HStack, Heading } from "@chakra-ui/layout";
import Evaluate from "./components/Evaluate";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Text } from "@chakra-ui/react";
import Introduce from "./components/Introduce";
import Branch from "./components/Branch";
import Transport from "./components/Transport";
import Warranty from "./components/Warranty";
import Configuration from "./components/Configuration";
import Describe from "./components/Describe";
import { TagIcon } from "~/components/common/Icons";
import Sku from "./components/Sku";
import Subcate from "./components/Subcate";

type Props = {};

const ProductDetailView = (props: Props) => {
	return (
		<Box h={"full"}>
			<Breadcrumb mt={"5"}>
				<BreadcrumbItem>
					<BreadcrumbLink href="/" textDecoration={"none"} fontSize={"12px"}>
						Trang chủ
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink textDecoration={"none"} fontSize={"12px"}>
						Laptop Dell Inspiron 16
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<Flex gap={"6"} flexWrap={{ base: "wrap", md: "nowrap" }}>
				{/* Content trái */}
				<Box w={{ base: "100%", md: "60%" }} my={5}>
					{/* slide ảnh */}
					<Gallery />
					{/* marrque */}
					<Introduce />
					{/* Đánh Giá */}
					<Evaluate />
					<Box backgroundColor={"white"} borderRadius={"6px"} py={5} px={5} my={"5"}>
						{/* Cấu hình */}
						<Box borderBottom={"1px solid #E6E8EA"} py={"2"} my={"2"}>
							<Configuration />
						</Box>
						{/* Chi Nhánh */}
						<Box borderBottom={"1px solid #E6E8EA"} py={"2"} my={"2"}>
							<Branch />
						</Box>
						{/* Vận chuyển */}
						<Box borderBottom={"1px solid #E6E8EA"} py={"2"} my={"2"}>
							<Transport />
						</Box>
						{/* Bảo Hành */}
						<Box borderBottom={"1px solid #E6E8EA"} py={"2"} my={"2"}>
							<Warranty />
						</Box>
						{/* Bài Viết sản phẩm */}
						<Box py={"2"} my={"2"}>
							<Describe />
						</Box>
					</Box>
				</Box>
				{/* Content phải */}
				<Box
					w={{ base: "100%", md: "40%" }}
					my={5}
					position="sticky"
					top="20"
					zIndex="9"
					width="100%"
					overflowY="scroll"
					maxH="620px"
				>
					<Box bg={"#FE3464"} borderRadius={"6px"} px={"2"} py={"4"}>
						<Flex alignItems={"center"}>
							<TagIcon color="white" size={8} />
							<Text color={"white"} fontSize={"16px"} fontWeight={600} ml={"6px"}>
								HOT DEAL LAPTOP THÁNG 9
							</Text>
						</Flex>
					</Box>
					{/* Số lượng phiên bản giá */}
					<Sku />
					{/* Danh mục con */}
					<Subcate />
				</Box>
			</Flex>
		</Box>
	);
};

export default ProductDetailView;
