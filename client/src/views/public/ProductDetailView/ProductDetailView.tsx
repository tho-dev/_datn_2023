import { Box, Divider, Flex, Heading } from "@chakra-ui/layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ListThinkPro from "~/components/ListThinkPro";
import LoadingPolytech from "~/components/LoadingPolytech";
import { TagIcon } from "~/components/common/Icons";
import { useAddToCartMutation, useByNowMutation } from "~/redux/api/cart";
import { useGetBySlugQuery } from "~/redux/api/product";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import Branch from "./components/Branch";
import Configuration from "./components/Configuration";
import Describe from "./components/Describe";
import Evaluate from "./components/Evaluate";
import Introduce from "./components/Introduce";
import Sku from "./components/Sku";
import Subcate from "./components/Subcate";
import Gallery from "./components/Swiper";
import Warranty from "./components/Warranty";

type Props = {};

const ProductDetailView = (props: Props) => {
	const { slug } = useParams();
	const [quantity, setQuantity] = useState<number>(1);
	const toast = useToast();
	const isLogin = useAppSelector((state) => state.persistedReducer.global.isLogin);
	const productViewed = useAppSelector((state) => state.persistedReducer.global.viewedItems);
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.persistedReducer.global.user);
	const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);

	const dispatch = useAppDispatch();
	const [addToCart, { isLoading }] = useAddToCartMutation();
	const [byNow, { isLoading: loading }] = useByNowMutation();
	const { data: product, isError, isFetching } = useGetBySlugQuery(slug as string);

	const handleAddToCart = async () => {
		const data = {
			cart_id: cart_id,
			product: {
				sku_id: product.data._id,
				quantity,
				price: product.data.price,
				price_before_discount: product.data.price_before_discount ?? 0,
				price_discount_percent: product.data.price_discount_percent ?? 0,
			},
		};
		if (isLogin) {
			addToCart({ ...data, user_id: user._id })
				.unwrap()
				.then(() => {
					toast({
						title: "Hệ thống thông báo",
						description: `Thêm ${quantity} sản phẩm vào giỏ hàng thành công`,
						status: "success",
						duration: 2000,
						isClosable: true,
					});
				})
				.catch((err) => {
					console.log(err);
					toast({
						title: "Hệ thống thông báo",
						description: `Lỗi khi thêm sản phẩm`,
						status: "error",
						duration: 2000,
						isClosable: true,
					});
				});
			return;
		}
		addToCart(data)
			.unwrap()
			.then(() => {
				toast({
					title: "Hệ thống thông báo",
					description: `Thêm ${quantity} sản phẩm vào giỏ hàng thành công`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			})
			.catch((err) => {
				console.log(err);
				toast({
					title: "Hệ thống thông báo",
					description: `Lỗi khi thêm sản phẩm`,
					status: "error",
					duration: 2000,
					isClosable: true,
				});
			});
	};

	const handleByNow = async () => {
		const data = {
			cart_id: cart_id,
			product: {
				sku_id: product.data._id,
				quantity,
				price: product.data.price,
				price_before_discount: product.data.price_before_discount ?? 0,
				price_discount_percent: product.data.price_discount_percent ?? 0,
			},
		};
		if (isLogin) {
			byNow({ ...data, user_id: user._id })
				.unwrap()
				.then(() => {
					toast({
						title: "Hệ thống thông báo",
						description: `Thêm ${quantity} sản phẩm vào giỏ hàng thành công`,
						status: "success",
						duration: 2000,
						isClosable: true,
					});
					navigate("/gio-hang");
				})
				.catch((err) => {
					toast({
						title: "Hệ thống thông báo",
						description: `Lỗi khi thêm sản phẩm`,
						status: "error",
						duration: 2000,
						isClosable: true,
					});
				});
		} else {
			byNow(data)
				.unwrap()
				.then(() => {
					toast({
						title: "Hệ thống thông báo",
						description: `Thêm ${quantity} sản phẩm vào giỏ hàng thành công`,
						status: "success",
						duration: 2000,
						isClosable: true,
					});
					navigate("/gio-hang");
				})
				.catch((err) => {
					toast({
						title: "Hệ thống thông báo",
						description: `Lỗi khi thêm sản phẩm`,
						status: "error",
						duration: 2000,
						isClosable: true,
					});
				});
		}
	};
	const handleDercement = () => {
		if (quantity == 1) return;
		setQuantity(quantity - 1);
	};
	const handleIncement = () => {
		if (quantity == product.stock) return;
		setQuantity(quantity + 1);
	};

	if (isFetching) {
		return <LoadingPolytech />;
	}

	if (isError) {
		navigate("/404");
	}

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
						{product?.data.name}
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
					<Gallery
						assets={product?.data.assets}
						name={product?.data.name}
					/>
					{/* marrque */}
					<Introduce />
					{/* Đánh Giá */}
					{product?.data?.demands?.length > 0 && <Evaluate demands={product?.data?.demands} />}

					<Box
						backgroundColor={"bg.white"}
						borderRadius={"6px"}
						my={"5"}
						p="6"
					>
						{/* Cấu hình */}
						<Configuration attributes={product?.data.attributes} />
						<Divider my="5" />
						{/* Chi Nhánh */}
						<Branch />
						<Divider my="5" />
						{/* Bảo Hành */}
						<Warranty />
						<Divider my="5" />
						{/* Video review */}

						{product?.data?.video_review && (
							<Box>
								<Text
									as={"h5"}
									fontSize={"lg"}
									fontWeight={"600"}
									mb="1"
								>
									Video Review
								</Text>

								<iframe
									id="player"
									width="100%"
									height="400px"
									style={{
										objectFit: "contain",
										borderRadius: "6px",
									}}
									src={`http://www.youtube.com/embed/${product?.data?.video_review?.split("=")?.[1]}`}
								></iframe>
								<Divider my="5" />
							</Box>
						)}

						{/* Bài Viết sản phẩm */}
						<Describe
							image={product?.data.image}
							description={product?.data.description}
						/>
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
					<Sku
						product={product?.data}
						handleDercement={handleDercement}
						handleIncement={handleIncement}
						handleAddToCart={handleAddToCart}
						handleByNow={handleByNow}
						quantity={quantity}
						isLoading={isLoading}
						loading={loading}
					/>
					{/* Danh mục con */}
					<Subcate
						brand={product?.data?.brand}
						category={product?.data?.category}
					/>
				</Box>
			</Flex>

			{/* Đánh giá của khách hàng */}
			{/* <CommentView /> */}

			{/* Sản phẩm liên quan */}
			<Box my="6">
				<Heading
					fontSize="18px"
					fontWeight="bold"
				>
					Sản phẩm liên quan
				</Heading>
				<ListThinkPro data={product?.data?.related_products} />
			</Box>

			{/* Sản phẩm đã xem */}
			{/* <Box pb={10}>
				<Text
					fontSize={"18px"}
					fontWeight={"bold"}
					my={4}
				>
					Sản phẩm đã xem
				</Text>
				{productViewed.length >= 5 ? (
					<ViewedProduct products={productViewed} />
				) : (
					<ListThinkPro data={productViewed} />
				)}
			</Box> */}
		</Box>
	);
};

export default ProductDetailView;
