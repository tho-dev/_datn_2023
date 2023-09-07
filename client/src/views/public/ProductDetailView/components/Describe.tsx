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
} from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";

type Props = {};
const data = {
	title: "Điểm nhanh những điều cần biết khi mua Dell Inspiron 16 5630",
	img: "https://images.thinkgroup.vn/unsafe/1600x900/https://media-api-beta.thinkpro.vn/media/social/articles/2023/4/4/dell-inspiron-16-5630-thinkpro-1.png",
	desr: `Để tạo độ tin cậy cao cho người dùng, hãng đã hoàn thiện máy từ lớp vỏ kim loại siêu bền bỉ. Mang tới cảm giác vô cùng chắc chắn và cứng cáp khi chạm tay, khả năng chống chịu va đập cũng rất ấn tượng. Bên cạnh đó, máy còn được phủ một lớp sơn bạc sang trọng - màu “hot trend” của những chiếc Ultrabook 2023. Do vậy, dù là làm việc ở văn phòng, quán ca phê hay mang đi bất cứ đâu thì tính hài hòa vẫn luôn được duy trì.

    Để tôn lên vẻ cao cấp của sản phẩm, Dell đã gia công những nét cắt CNC vô cùng tinh xảo ở các cạnh viền. Qua đó làm toát lên vẻ sang trọng, lịch lãm và chẳng hề thua kém quá nhiều so với “người anh em cùng nhà” là dòng XPS. Mặt A của máy vẫn cho thấy được độ nhận diện thương hiệu cao của mình. Nó vẫn chỉ được khắc phần logo Dell tinh xảo và đặt cân đối ở chính giữa.`,
};
const Describe = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = useState<any>("inside");
	const btnRef = useRef(null);
	return (
		<Box mb={"2"}>
			<Box>
				<Text as={"h5"} fontSize={"20px"} fontWeight={"600"}>
					Bài viết mô tả
				</Text>

				<Modal
					isOpen={isOpen}
					scrollBehavior={scrollBehavior}
					finalFocusRef={btnRef}
					onClose={onClose}
					size={"2xl"}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader fontSize={"20px"}>Cấu hình chi tiết </ModalHeader>
						<ModalCloseButton />
						<ModalBody mx={"2"}>
							<Box>
								<Text fontSize={"16px"} fontWeight={600} py={"2"}>
									{data.title}
								</Text>
								<Box>
									<Image src={data.img} />
								</Box>
								<Text>{data.desr}</Text>
							</Box>
						</ModalBody>
					</ModalContent>
				</Modal>
			</Box>
			<Box position={"relative"}>
				<Text fontSize={"16px"} fontWeight={600} py={"2"}>
					{data.title}
				</Text>
				<Box>
					<Image src={data.img} />
				</Box>
				<Box
					w="100%"
					h="200px"
					bgGradient="linear(1turn,#fff 25.58%,hsla(0,0%,100%,0) 181.4%)"
					position={"absolute"}
					top={"200"}
					textAlign={"center"}
					alignItems={"center"}
				/>
				<Flex textAlign={"center"} justifyContent={"center"}>
					<Button bg={"white"} color={"blue"} fontWeight={600} onClick={onOpen}>
						Xem Thêm
					</Button>
				</Flex>
			</Box>
		</Box>
	);
};

export default Describe;
