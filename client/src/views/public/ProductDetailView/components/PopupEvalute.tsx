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
			<Text onClick={onOpen} as={"p"} fontSize={"14px"}>
				Cách đánh giá
			</Text>

			<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={"20px"}>Đánh giá từ chuyên gia</ModalHeader>
					<ModalCloseButton />
					<ModalBody mx={"2"}>
						<Flex gap={"6"}>
							<Box w={"30%"}>
								<Avatar size="2xl" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
							</Box>
							<Box w={"70%"}>
								<Text as={"h5"} fontSize={"16px"} fontWeight={600}>
									ThinkPro Expert
								</Text>
								<Text as={"p"} fontSize={"16px"} py={"3"}>
									Đánh giá này dựa trên các chuyên gia máy tính từ ThinkPro. Qua các bài kiểm tra và
									kinh nghiệm thực tế sử dụng, có tham khảo đánh giá từ các chuyên trang đánh giá
									trong và ngoài nước.
								</Text>
								<Grid templateColumns="repeat(4, 1fr)" gap={8} my={"2"}>
									<GridItem textAlign={"center"}>
										<Box bg={"red"} borderRadius={"3xl"} px={"5"} fontSize={"12px"} color={"white"}>
											1,2,3
										</Box>
										<Text as={"p"} fontSize={"14px"} mt={"3"}>
											Không Phù Hợp
										</Text>
									</GridItem>
									<GridItem textAlign={"center"}>
										<Box bg={"red"} borderRadius={"3xl"} px={"5"} fontSize={"12px"} color={"white"}>
											1,2,3
										</Box>
										<Text as={"p"} fontSize={"14px"} mt={"3"}>
											Không Phù Hợp
										</Text>
									</GridItem>
									<GridItem textAlign={"center"}>
										<Box bg={"red"} borderRadius={"3xl"} px={"5"} fontSize={"12px"} color={"white"}>
											1,2,3
										</Box>
										<Text as={"p"} fontSize={"14px"} mt={"3"}>
											Không Phù Hợp
										</Text>
									</GridItem>
									<GridItem textAlign={"center"}>
										<Box bg={"red"} borderRadius={"3xl"} px={"5"} fontSize={"12px"} color={"white"}>
											1,2,3
										</Box>
										<Text as={"p"} fontSize={"14px"} mt={"3"}>
											Không Phù Hợp
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
