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
import Marquee from "react-fast-marquee";
import { BellIcon, NavArrowRightIcon, TimeIcon } from "~/components/common/Icons";
type Props = {};
const dataFake = [
	{
		id: 1,
		title: "Tận tâm tư vấn",
		icon: <BellIcon size={5} color="black" />,
		description:
			"Giúp khách hàng lựa chọn sản phẩm đúng nhu cầu là trách nhiệm đầu tiên của Nhân viên tư vấn tại ThinkPro.",
	},
	{
		id: 1,
		title: "Tận tâm tư vấn",
		icon: <BellIcon size={5} color="black" />,
		description:
			"Giúp khách hàng lựa chọn sản phẩm đúng nhu cầu là trách nhiệm đầu tiên của Nhân viên tư vấn tại ThinkPro.",
	},
	{
		id: 1,
		title: "Tận tâm tư vấn",
		icon: <BellIcon size={5} color="black" />,
		description:
			"Giúp khách hàng lựa chọn sản phẩm đúng nhu cầu là trách nhiệm đầu tiên của Nhân viên tư vấn tại ThinkPro.",
	},
	{
		id: 1,
		title: "Tận tâm tư vấn",
		icon: <BellIcon size={5} color="black" />,
		description:
			"Giúp khách hàng lựa chọn sản phẩm đúng nhu cầu là trách nhiệm đầu tiên của Nhân viên tư vấn tại ThinkPro.",
	},
	{
		id: 1,
		title: "Tận tâm tư vấn",
		icon: <BellIcon size={5} color="black" />,
		description:
			"Giúp khách hàng lựa chọn sản phẩm đúng nhu cầu là trách nhiệm đầu tiên của Nhân viên tư vấn tại ThinkPro.",
	},
];
const MarqueeReact = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = useState<any>("inside");
	const btnRef = useRef(null);
	return (
		<>
			<Flex borderRadius={"3px"} bg={"#F5FDFF"} as={"button"} onClick={onOpen} mt={"3"}>
				<Marquee>
					{dataFake.map((data) => (
						<Flex alignItems={"center"} fontSize={"12px"} mx={"2"}>
							<Box bg={"blue.400"} borderRadius={"full"} p={"1"}>
								{data.icon}
							</Box>
							{data.title}
						</Flex>
					))}
				</Marquee>
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
			<Modal isOpen={isOpen} finalFocusRef={btnRef} onClose={onClose} size={"xl"} scrollBehavior={scrollBehavior}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={"20px"}>Tự tin mua sắm cùng ThinkPro</ModalHeader>
					<ModalCloseButton />
					<ModalBody mx={"2"}>
						<Box bg={"#0A2545"} p={"14px"} borderRadius={"3px"}>
							<Text as={"p"} color={"white"} fontSize={"10px"}>
								Một thành viên của
							</Text>
							<Text as={"p"} color={"blue.300"} fontSize={"16px"} fontWeight={600}>
								ONWARD TOGETHER GROUP
							</Text>
							<Text as={"p"} color={"white"} fontSize={"10px"}>
								Tập đoàn bán lẻ Công nghệ - Nội thất phục vụ khách hàng tốt nhất.
							</Text>
						</Box>
						<Box bg={"#FDF5FF"} borderRadius={"3px"}>
							{/* Item */}
							{dataFake.map((data: any) => (
								<Flex
									gap={"2"}
									my={"16px"}
									pl={"2"}
									pb={"4"}
									pt={"2"}
									mx={"2"}
									borderBottom={"1px solid black"}
								>
									<Box w={"5%"}>{data.icon}</Box>
									<Box w={"80%"}>
										<Text fontSize={"14px"} fontWeight={600}>
											{data.title}
										</Text>
										<Text fontSize={"12px"}>{data.description}</Text>
									</Box>
								</Flex>
							))}
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} bg={"#0A2540"} px={"20"}>
							Đóng
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default MarqueeReact;
