import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image, Img } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PostRelate from "./components/PostRelate";
import { Grid, GridItem } from "@chakra-ui/layout";

type Props = {
	mt?: any;
	columns?: any;
};

const ContentView = ({ columns = 4 }: Props) => {
	return (
		<Box>
			<Box
				bg="white"
				w="100%"
				borderRadius="2xl"
				p={10}
				px={"32"}
			>
				<Text
					fontSize={"3xl"}
					fontWeight={"bold"}
					py={5}
				>
					Windows 11 vừa cập nhật, vá lỗi chậm SSD tới nhiều người dùng
				</Text>
				<Box py={5}>
					<Divider />
					<Flex
						my={"4"}
						fontWeight={"bold"}
					>
						<Text color={"black"}>Nguyễn Công Minh </Text>
						<Text
							color={"gray.500"}
							mx={2}
						>
							*
						</Text>
						<Text color={"gray.500"}> 18:41, 16/03/2023</Text>
					</Flex>
					<Divider />
				</Box>
				<Box py={5}>
					<Flex fontSize={"xl"}>
						<Text
							color={"blue.600"}
							fontWeight={"extrabold"}
						>
							//{" "}
						</Text>
						<Text
							color={"black"}
							as="cite"
						>
							Mặc dù chưa bao giờ bình luận công khai về lỗi tốc độ SSD trên Windows 11, nhưng Microsoft
							vẫn âm thầm ghi nhận vấn đề này và liên tục tìm giải pháp khắc phục.
						</Text>
					</Flex>
				</Box>
				<Text
					py={5}
					fontSize={"xl"}
					fontWeight={"medium"}
				>
					Hồi tháng Ba vừa qua, nhiều người dùng Windows 11 đã lên tiếng về việc ổ cứng SSD NVMe của họ chạy
					chậm hơn đáng kể so với thường lệ. Nguyên nhân khi đó được chỉ ra là do bản cập nhật Moment 2 của hệ
					điều hành (mã hiệu KB5023706), khi nó đã gây ra một lỗi khiến tốc độ SSD bị “bóp” chỉ còn phân nửa
					so với tiêu chuẩn, nhưng vẫn được phát hành công khai tới toàn bộ người dùng.
				</Text>
				<Box py={5}>
					<Image src="https://images.thinkgroup.vn/unsafe/1600x900/https://media-api-beta.thinkpro.vn/media/social/articles/2023/8/17/samsung-m2-ssd-thinkpro.jpg" />
				</Box>
				<Text
					py={5}
					fontSize={"xl"}
					fontWeight={"medium"}
				>
					Và có vẻ sau một thời gian, cuối cùng Microsoft đã có thể giải quyết dứt điểm vấn đề này. Cụ thể thì
					sau khi cập nhật phiên bản mới nhất của Windows 11 (mã hiệu KB5029263), nhiều người dùng đã thông
					báo rằng SSD của họ đã trở lại với tốc độ tối đa khi đọc ghi dữ liệu. Điều này cũng được xác nhận
					bởi một số chuyên trang uy tín như WindowsLatest trong báo cáo mới nhất.
				</Text>
				<Text
					py={5}
					fontSize={"xl"}
					fontWeight={"medium"}
				>
					Mặc dù chưa bao giờ bình luận công khai về lỗi tốc độ SSD trên Windows 11, nhưng Microsoft vẫn âm
					thầm ghi nhận vấn đề này và liên tục tìm giải pháp khắc phục. Hiện tại vẫn chưa rõ liệu bản cập nhật
					KB5029263 sẽ có thể giải quyết hoàn toàn tình trạng này hay không, tuy nhiên bạn đọc vẫn có thể thử
					nâng cấp để đảm bảo mọi thứ vận hành mượt mà.
				</Text>
				<Text
					py={5}
					fontSize={"xl"}
					fontWeight={"medium"}
				>
					Về hiện tượng SSD trên Windows 11 bị chậm tốc độ, bạn đọc có thể tìm hiểu tại bài đăng cũ của
					ThinkPro tại đây:
				</Text>
				<Link to={"/noi-dung"}>
					<Box
						borderRadius={"xl"}
						bg="#f6f9fc"
					>
						<Flex>
							<Image
								w={{
									sm: 0,
									xl: 1 / 3,
								}}
								borderTopLeftRadius={"xl"}
								borderBottomLeftRadius={"xl"}
								src="https://media-api-beta.thinkpro.vn/media/social/articles/2023/3/16/SX8200-Pro-1TB.jpg"
							/>
							<Box p={5}>
								<Text color={"gray.500"}>thinkpro.vn</Text>
								<Text
									py={2}
									fontSize={"xl"}
									fontWeight={"semibold"}
								>
									Windows 11 22H2 bản mới nhất đang "bóp" SSD của người dùng, ai muốn lên nên chờ ít
									ngày nữa
								</Text>
								<Text
									fontSize={"xl"}
									fontWeight={"medium"}
								>
									{" "}
									Trong khi đáng ra bản cập nhật này nên giúp người dùng tận hưởng lợi ích từ AI nhiều
									hơn thì thay vào đó, chúng ta lại có những vấn đề về SSD.
								</Text>
							</Box>
						</Flex>
					</Box>
				</Link>
				<Flex py={5}>
					<Text
						fontSize={"xl"}
						fontWeight={"medium"}
					>
						Theo
					</Text>
					<Text
						fontSize={"xl"}
						fontWeight={"bold"}
						ml={1}
					>
						PCWorld
					</Text>
				</Flex>
			</Box>
			<Text
				py={10}
				fontSize={"2xl"}
				fontWeight={"bold"}
			>
				Bài viết liên quan
			</Text>
			<Grid
				w="full"
				gap="3"
				templateColumns={{
					sm: "repeat(1, 1fr)",
					md: "repeat(3, 1fr)",
					xl: `repeat(${columns}, 1fr)`,
				}}
			>
				<GridItem>
					<PostRelate />
				</GridItem>
				<GridItem>
					<PostRelate />
				</GridItem>
				<GridItem>
					<PostRelate />
				</GridItem>
				<GridItem>
					<PostRelate />
				</GridItem>
			</Grid>
		</Box>
	);
};

export default ContentView;
