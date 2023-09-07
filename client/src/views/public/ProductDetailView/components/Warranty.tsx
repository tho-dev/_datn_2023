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
} from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";

type Props = {};

const Warranty = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = useState<any>("inside");
	const btnRef = useRef(null);
	return (
		<Box>
			<Flex justifyContent={"space-between"}>
				<Text as={"h5"} fontSize={"20px"} fontWeight={"600"}>
					Bảo hành & đổi trả
				</Text>
				<Flex
					onClick={onOpen}
					as={"button"}
					fontSize={"14px"}
					bg={"white"}
					alignItems={"center"}
					color={"blue"}
				>
					12 tháng
					<Flex
						w="9"
						h="9"
						right="4"
						top={"calc(50% - 24px)"}
						translateY="-50%"
						zIndex="5"
						rounded="full"
						cursor="pointer"
						alignItems="center"
						justifyContent="center"
						className="btn-next"
					>
						<NavArrowRightIcon size={4} strokeWidth={3} color="text.black" />
					</Flex>
				</Flex>

				<Modal
					isOpen={isOpen}
					scrollBehavior={scrollBehavior}
					finalFocusRef={btnRef}
					onClose={onClose}
					size={"5xl"}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader fontSize={"20px"}>Bảo Hành</ModalHeader>
						<ModalCloseButton />
						<ModalBody mx={"2"}>
							<Text>
								Bảo hành 12 tháng tại ThinkPro với linh kiện phần cứng (Đối với Pin và Màn hình 06
								tháng)
							</Text>
							<Text py={"2"}>
								Chính sách đổi trả tại ThinkPro: 1. Lỗi do nhà sản xuất: Trong 15 ngày đầu 1 đổi 1 sản
								phẩm nếu xảy ra lỗi của nhà sản xuất, quý khách có thể đổi tại toàn bộ các chi nhánh
								thuộc hệ thống của ThinkPro. Trong trường hợp ThinkPro hết hàng để đổi, cửa hàng sẽ hoàn
								100% giá trị trên hóa đơn mua hàng của Quý khách.
								<br /> 2. Sản phẩm không lỗi: Đối với sản phẩm mới: Trong 15 ngày đầu tiên, nếu sản phẩm
								không lỗi Quý khách muốn đổi sản phẩm khác ThinkPro sẽ tính phí đổi sản phẩm là 15%,
								trong trường hợp Quý khách muốn trả lại sản phẩm ThinkPro sẽ tính phí 25% giá trị sản
								phẩm. Đối với sản phẩm qua sử dụng: Trong 15 ngày đầu tiên, ThinkPro cung cấp dịch vụ
								dùng thử miễn phí, Quý khách có thể đổi sản phẩm khác nếu thấy sản phẩm mình đang sử
								dụng chưa phù hợp với nhu cầu. Trong trường hợp Quý khách muốn trả lại sản phẩm ThinkPro
								sẽ tính phí 15% giá trị sản phẩm. 3. Sản phẩm lỗi do người sử dụng Trong trường hợp sản
								phẩm xảy ra lỗi do người sử dụng, vi phạm các chính sách bảo hành tại ThinkPro (Quý
								khách có thể tham khảo chi tiết tại Chính sách bảo hành), ThinkPro không hỗ trợ đổi/trả
								sản phẩm. ThinkPro sẽ hỗ trợ Quý khách sửa chữa dịch vụ đối với sản phẩm này.
							</Text>
						</ModalBody>
						<ModalFooter>
							<Button onClick={onClose} bg={"blue"} px={"20"} w={"full"}>
								Đóng
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Flex>
			<Box ml={"6"} fontSize={"14px"}>
				<ul>
					<li>
						Bảo hành <strong>12 tháng tại chuỗi cửa hàng</strong>
					</li>
					<li>Đổi mới trong 15 ngày đầu tiên</li>
				</ul>
			</Box>
		</Box>
	);
};

export default Warranty;
