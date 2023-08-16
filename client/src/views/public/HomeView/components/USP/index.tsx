import React from "react";
import usp1 from "~/assets/images/usp-1.png";
import usp2 from "~/assets/images/usp-2.png";
import usp3 from "~/assets/images/usp-3.png";
import usp4 from "~/assets/images/usp-4.png";
import { Button, Image, Input } from "@chakra-ui/react";
import { Heading, Box, Text, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { ArrowRightIcon, CheckOneIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";
import { useDisclosure } from "@chakra-ui/react";
import parser from "html-react-parser";

type Props = {
	title?: string;
	text?: string;
};

const items: any = [
	{
		title: "Trải nghiệm tận tay",
		image: usp1,
		color: "#faf4ff",
	},
	{
		title: "Tư vấn viên tận tâm",
		image: usp2,
		color: "#feeecc",
	},
	{
		title: "Trung tâm bảo vệ khách hàng",
		image: usp3,
		color: "#cbe7fe",
	},
	{
		title: "Phục vụ đến 24h",
		image: usp4,
		color: "#fbcfd8",
	},
];

const USP = ({ title, text }: Props) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<Box mt="12">
				<Flex
					gap={{
						md: 2,
						lg: 4,
					}}
					flexDir={{
						sm: "column",
						lg: "row",
						xl: "row",
					}}
				>
					<Heading
						as="h2"
						fontSize="28px"
					>
						{title}
					</Heading>
					<Text
						color="#6b7075"
						fontSize="2xl"
						fontWeight="semibold"
					>
						{text}
					</Text>
				</Flex>
				<Grid
					mt="6"
					gap="4"
					templateColumns={{
						sm: "repeat(1, 1fr)",
						md: "repeat(3, 1fr)",
						xl: "repeat(5, 1fr)",
					}}
				>
					{items?.map((item: any, index: number) => {
						return (
							<GridItem key={index}>
								<Box
									h="132px"
									p="3"
									role="group"
									rounded="md"
									cursor="pointer"
									position="relative"
									backgroundColor={item?.color}
									_hover={{
										transition: "all 0.3s ease-in",
									}}
									onClick={onOpen}
								>
									<Text
										position="absolute"
										left="3"
										maxW="85px"
										color="text.black"
										fontSize="sm"
										fontWeight="semibold"
									>
										{item?.title}
									</Text>
									<Box
										w="8"
										h="8"
										px="2"
										rounded="full"
										backgroundColor="bg.white"
										position="absolute"
										bottom="3"
										display="flex"
										alignItems="center"
										transition="all 0.3s ease"
									>
										<ArrowRightIcon
											size={4}
											color="text.black"
											transition="all 0.3s ease"
										/>
									</Box>
									<Box
										w="20"
										h="20"
										position="absolute"
										right="3"
										bottom="3"
									>
										<Image
											w="full"
											h="full"
											src={item?.image}
											objectFit="cover"
										/>
									</Box>
								</Box>
							</GridItem>
						);
					})}
					<GridItem>
						<Box
							h="132px"
							p="3"
							role="group"
							rounded="md"
							backgroundColor="bg.white"
							_hover={{
								transition: "all 0.3s ease-in",
							}}
						>
							<Box as="span">
								<CheckOneIcon
									size={5}
									color="#3bb346"
								/>
							</Box>
							<Text
								mt="2"
								fontSize="xs"
								color="text.black"
								fontWeight="semibold"
							>
								Thành viên thuộc Onward Together Group. Tập đoàn bán lẻ từ 2013 với nguyên tắc hoạt
								động: Khách hàng là trung tâm.
							</Text>
						</Box>
					</GridItem>
				</Grid>
			</Box>
			<DialogThinkPro
				title={
					<Heading
						as="h2"
						fontSize="xl"
					>
						Tại sao bạn nên chọn ThinkPro?
					</Heading>
				}
				size="3xl"
				isCentered
				isOpen={isOpen}
				onClose={onClose}
			>
				{parser(
					'<img src="https://media-api-beta.thinkpro.vn/media/social/articles/2023/5/31/trai-nghiem-may-thuc-te-1-thinkpro.jpg" /><h2><strong>Trải nghiệm tận tay</strong></h2><p>ThinkPro là đơn vị tiên phong trên thị trường đầu tư hàng trưng bày số lượng lớn. Vì thế, trước khi đưa ra quyết định mua, khách hàng có thể trực tiếp trải nghiệm tận tay hàng trăm mẫu laptop và phụ kiện công nghệ hiện đại nhất, đi kèm với đó là thực hiện những tác vụ liên quan đến nhu cầu sử dụng của mình thông qua các phần mềm, công cụ đã được cài đặt sẵn trên máy.</p><img /src="https://media-api-beta.thinkpro.vn/media/social/articles/2023/5/22/tu-van-vien-tan-tam-thinkpro.png"><h2>T<strong>ư vấn viên tận tâm</strong></h2><p>Được đào tạo bài bản, chuyên nghiệp cả về tác phong nghề nghiệp lẫn chuyên môn nghiệp vụ, kèm theo đó là kỹ năng giao tiếp và xử lý tình huống cực kỳ nhạy bén, đội ngũ tư vấn của ThinkPro luôn đặt lợi ích của khách hàng lên hàng đầu, đề cao trách nhiệm giúp khách hàng lựa chọn sản phẩm phù hợp nhất với nhu cầu.</p><img src="https://media-api-beta.thinkpro.vn/media/social/articles/2023/5/31/trai-nghiem-may-thuc-te-1-thinkpro.jpg" /><h2><strong>Trung tâm bảo vệ khách hàng</strong></h2><p>Chuyên trang “<a target="_blank" rel="noopener noreferrer nofollow" href="https://onwardtogether.one/listen"><strong>Trung tâm bảo vệ quyền lợi khách hàng</strong></a>” ra đời với sứ mệnh lắng nghe khách hàng nhiều hơn, thấu hiểu và có những hành động kịp thời để khách hàng luôn có cảm giác thoải mái và ấn tượng tốt về những trải nghiệm mua sắm tại ThinkPro. Mỗi đóng góp quý báu từ Quý khách hàng đều mang lại những giá trị to lớn, chuyển hoá thành động lực để đội ngũ ThinkPro nỗ lực hoàn thiện và tiến gần hơn đến sứ mệnh cao cả là phục vụ cộng đồng.</p><img src="https://media-api-beta.thinkpro.vn/media/social/articles/2023/5/31/trai-nghiem-may-thuc-te-1-thinkpro.jpg" /><h2><strong>Phục vụ đến 24 giờ</strong></h2><p>Lấy khách hàng làm trung tâm, mong muốn khách hàng có những trải nghiệm trọn vẹn nhất, đội ngũ ThinkPro luôn sẵn lòng để phục vụ và hỗ trợ khách hàng tới 24 giờ với chất lượng dịch vụ nhanh chóng, tận tâm, kênh hỗ trợ đa dạng, kết nối mọi lúc mọi nơi: kênh bán hàng Offline mở cửa tới 22h (tuỳ chi nhánh); kênh bán hàng online, tổng đài hỗ trợ kỹ thuật, bảo hành phục vụ đến 24h mỗi ngày.</p><p></p>'
				)}
			</DialogThinkPro>
		</>
	);
};

export default USP;
