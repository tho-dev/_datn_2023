import React, { useEffect } from "react";
import Gallery from "./components/Swiper";
import { Box, Divider, Flex, HStack, Heading } from "@chakra-ui/layout";
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
import { CommentView } from "~/components/Comment";
import ViewedProduct from "~/components/ViewedThinkPro/ViewedProduct";

type Props = {};

const ProductDetailView = (props: Props) => {
	return (
		<Box h={"full"}>
			<Breadcrumb mt={"5"}>
				<BreadcrumbItem>
					<BreadcrumbLink
						href="/"
						textDecoration={"none"}
						fontSize={"12px"}
					>
						Trang chủ
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink
						textDecoration={"none"}
						fontSize={"12px"}
					>
						Laptop Dell Inspiron 16
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<Flex
				gap={"6"}
				flexWrap={{ base: "wrap", md: "nowrap" }}
			>
				{/* Content trái */}
				<Box
					w={{ base: "100%", md: "60%" }}
					my={5}
				>
					{/* slide ảnh */}
					<Gallery />
					{/* marrque */}
					<Introduce />
					{/* Đánh Giá */}
					<Evaluate />
					<Box
						backgroundColor={"bg.white"}
						borderRadius={"6px"}
						my={"5"}
						p="6"
					>
						{/* Cấu hình */}
						<Configuration />
						<Divider my="5" />
						{/* Chi Nhánh */}
						<Branch />
						<Divider my="5" />
						{/* Vận chuyển */}
						<Transport />
						<Divider my="5" />
						{/* Bảo Hành */}
						<Warranty />
						<Divider my="5" />
						{/* Bài Viết sản phẩm */}
						<Describe />
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
					<Box
						bg={"#FE3464"}
						rounded={"6px"}
						px={"6"}
						py={"5"}
					>
						<Flex alignItems={"center"}>
							<TagIcon
								color="white"
								size={6}
							/>
							<Text
								color={"white"}
								fontSize={"16px"}
								fontWeight={600}
								ml={"6px"}
							>
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

			{/* Đánh giá của khách hàng */}
			<CommentView />

			{/* Sản phẩm đã xem */}
			<Box pb={10}>
				<ViewedProduct title={""} />
			</Box>
		</Box>
	);
};

export default ProductDetailView;
