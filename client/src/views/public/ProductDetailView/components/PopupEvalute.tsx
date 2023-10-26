import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text,
	Flex,
	Avatar,
	Box,
	Grid,
	GridItem,
} from "@chakra-ui/react";
type Props = {};

const PopupEvalute = (Props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Text
				onClick={onOpen}
				as={"p"}
				fontSize={"14px"}
				textColor="text.blue"
				fontWeight="normal"
			>
				Cách đánh giá
			</Text>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={"xl"}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={"xl"}>Đánh giá từ chuyên gia</ModalHeader>
					<ModalCloseButton />
					<ModalBody mx={"2"}>
						<Flex gap={"6"}>
							<Box w={"30%"}>
								<Avatar
									size="2xl"
									name="Polytech"
									src="https://thinkpro.vn/demand/expert-employee.png"
								/>
							</Box>
							<Box w={"70%"}>
								<Text
									as={"h5"}
									fontSize={"md"}
									fontWeight={600}
								>
									Polytech Expert
								</Text>
								<Text
									as={"p"}
									fontSize={"sm"}
									py={"3"}
								>
									Đánh giá này dựa trên các chuyên gia máy tính từ ThinkPro. Qua các bài kiểm tra và
									kinh nghiệm thực tế sử dụng, có tham khảo đánh giá từ các chuyên trang đánh giá
									trong và ngoài nước.
								</Text>
								<Grid
									templateColumns="repeat(4, 1fr)"
									gap={8}
									my={"2"}
								>
									<GridItem textAlign={"center"}>
										<Box
											bg={"red"}
											borderRadius={"3xl"}
											px={"5"}
											fontSize={"12px"}
											color={"white"}
											py="1"
										>
											1,2,3
										</Box>
										<Text
											as={"p"}
											fontSize={"13px"}
											mt={"3"}
											fontWeight="semibold"
										>
											Không Phù Hợp
										</Text>
									</GridItem>
									<GridItem textAlign={"center"}>
										<Box
											bg={"#d69e2e"}
											borderRadius={"3xl"}
											px={"5"}
											py="1"
											fontSize={"12px"}
											color={"white"}
										>
											4,5,6
										</Box>
										<Text
											as={"p"}
											fontSize={"13px"}
											mt={"3"}
											fontWeight="semibold"
										>
											Bình thường
										</Text>
									</GridItem>
									<GridItem textAlign={"center"}>
										<Box
											bg={"green"}
											borderRadius={"3xl"}
											px={"5"}
											fontSize={"12px"}
											color={"white"}
											py="1"
										>
											8,9
										</Box>
										<Text
											as={"p"}
											fontSize={"13px"}
											mt={"3"}
											fontWeight="semibold"
										>
											Tốt
										</Text>
									</GridItem>
									<GridItem textAlign={"center"}>
										<Box
											bg={"green"}
											borderRadius={"3xl"}
											px={"5"}
											py="1"
											fontSize={"12px"}
											color={"white"}
										>
											10
										</Box>
										<Text
											as={"p"}
											fontSize={"13px"}
											mt={"3"}
											fontWeight="semibold"
										>
											Tuyệt vời
										</Text>
									</GridItem>
								</Grid>
							</Box>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default PopupEvalute;
