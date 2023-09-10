import React, { useState, useRef } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Text,
	Flex,
	Box,
	Image,
	Heading,
} from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";

type Props = {};

const Describe = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = useState<any>("inside");
	const btnRef = useRef(null);
	return (
		<Box
			mb={"2"}
			maxH="300px"
		>
			<Box>
				<Text
					as={"h5"}
					fontSize={"lg"}
					fontWeight={"600"}
				>
					Bài viết mô tả
				</Text>
			</Box>
			<Box position={"relative"}>
				<Box
					w="full"
					h="full"
				>
					<Image
						w="full"
						h="full"
						maxH="200px"
						src="https://images.thinkgroup.vn/unsafe/1600x900/https://media-api-beta.thinkpro.vn/media/social/articles/2023/4/4/dell-inspiron-16-5630-thinkpro-1.png"
						objectFit="cover"
					/>
				</Box>
				<Box
					w="100%"
					h="100px"
					bgGradient="linear(1turn,#fff 25.58%,hsla(0,0%,100%,0) 181.4%)"
					position={"absolute"}
					top={"140px"}
					textAlign={"center"}
					alignItems={"center"}
				/>
				<Flex
					textAlign={"center"}
					justifyContent={"center"}
				>
					<Button
						bg={"white"}
						color={"text.blue"}
						fontWeight={"bold"}
						onClick={onOpen}
					>
						Xem Thêm
					</Button>
				</Flex>
			</Box>

			{/* Model bài viết */}
			<DialogThinkPro
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				size="4xl"
				title={<Heading fontSize="xl">Bài viết mô tả</Heading>}
			>
				<Box>
					Vậy là tại sự kiện CES 2023 mới được tổ chức hồi đầu năm, Intel đã chính thức trình làng loạt vi xử
					lý thế hệ 13 với tên hiệu Raptor Lake. Trải dài theo nhiều nhu cầu với các series chip khác nhau,
					dòng sản phẩm mới của đội Xanh hứa hẹn sẽ tiếp tục đem đến hiệu năng sử dụng chất lượng tới đông đảo
					người dùng, khẳng định sự trở lại mạnh mẽ trên đường đua. Tính tới lúc này, đã có tương đối sản phẩm
					laptop sử dụng vi xử lý Raptor Lake được giới thiệu tới chúng ta. Tuy nhiên chúng hầu hết lại thiên
					về gaming, nhu cầu mà không phải ai cũng có ở mức chuyên sâu. Hiện tại thì ThinkPro đã có những
					chiếc máy văn phòng / đồ họa đầu tiên sử dụng phần cứng thế hệ 13, cụ thể như chiếc Dell Inspiron 14
					5430 đang có ở đây. Cùng xem nó có gì đáng để lưu tâm nhé. Cấu hình tương đối mạnh xoay quanh Intel
					đời mới Với một sản phẩm sử dụng phần cứng mới thì chắc chắn, đây sẽ là phần được bạn đọc mong chờ
					nhất. Trong khi các mẫu laptop gaming mới ra thường sẽ dùng vi xử lý Intel đuôi H - tức hiệu năng
					cao “chuyên dụng” thì với Dell Inspiron 14 5430, máy sẽ dùng vi xử lý đuôi P - vẫn là hiệu năng cao
					nhưng sẽ ở mức phù hợp với laptop mỏng nhẹ. Cụ thể, tùy chọn máy ThinkPro đang có sẽ sử dụng CPU
					Intel Core i5-1340P với 12 nhân và 16 luồng, xung nhịp tối đa 4.6GHz và chạy ở TDP 28W. Đây là con
					chip thuộc tầm trung trong loạt sản phẩm mới ra của đội Xanh, dành cho những mẫu laptop mỏng nhẹ, có
					tản nhiệt chủ động để giải quyết được các tác vụ nhẹ đến trung bình. Trong 12 nhân của Core i5-1340P
					sẽ có 4 nhân hiệu năng cao hỗ trợ Siêu Phân luồng (Hyper Threading) và 8 nhân hiêu quả để tiết kiệm
					điện - một combo đã quen thuộc từ thế hệ vi xử lý cũ là Alder Lake. Tuy nhiên việc được sử dụng tiến
					trình Intel 7 - vẫn là 10nm SuperFin nhưng có chút cải tiến, sẽ giúp i5-1340P được đẩy cao về sức
					mạnh. Nếu để so sánh thì theo nhiều nguồn benchmark có tiếng, Core i5-1340P sẽ tương đương với Core
					i7-1250P về sức mạnh. Điều này sẽ khiến con chip này hứa hẹn đem lại giá trị lớn cho người dùng có
					nhu cầu văn phòng, giải trí trung cấp hay sáng tạo nội dung ở mức độ bán chuyên. Về kết quả đo đạc
					chi tiết con chip khả năng cao sẽ là “quốc dân” của thế hệ 13 này, ThinkPro sẽ đem tới cho bạn đọc
					trong bài viết chi tiết trong thời gian tới. Hiện một số bài test cơ bản đang được chạy trên chiếc
					máy này, kết quả sẽ được cập nhật để bạn đọc có cái nhìn ban đầu ngay sau khi được hoàn thành.
				</Box>
			</DialogThinkPro>
		</Box>
	);
};

export default Describe;
