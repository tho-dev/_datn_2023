import React, { useState, useRef } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Text,
	Flex,
	Box,
	Heading,
} from "@chakra-ui/react";
import { NavArrowRightIcon, PhoneIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";

type Props = {};
const address = [
	{
		id: 1,
		city: "Hồ Chí Minh",
		children: [
			{
				addressStore: "Số 5 - 7 Nguyễn Huy Tưởng, Phường 6, Quận Bình Thạnh, Hồ Chí Minh",
				phone: 190063579,
				icon: (
					<PhoneIcon
						color="black"
						size={6}
					/>
				),
			},
		],
	},
];
const Branch = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box>
			<Flex justifyContent={"space-between"}>
				<Text
					as={"h5"}
					fontSize={"lg"}
					fontWeight={"600"}
				>
					Sẵn Sàng & Trưng bày
				</Text>
				<Flex
					onClick={onOpen}
					as={"button"}
					fontSize={"14px"}
					bg={"white"}
					alignItems={"center"}
					color={"text.blue"}
				>
					Chi nhánh
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
						<NavArrowRightIcon
							size={4}
							strokeWidth={2}
							color="text.black"
						/>
					</Flex>
				</Flex>

				{/* Dialog */}
				<DialogThinkPro
					isOpen={isOpen}
					onClose={onClose}
					isCentered
					title={<Heading fontSize="xl">Sẵn hàng và Trưng bày</Heading>}
				>
					{address.map((item: any) => (
						<Box>
							<Text
								as={"h5"}
								fontSize={"16px"}
								fontWeight={"600"}
								py={"2"}
							>
								Thành Phố {item.city}
							</Text>
							{item.children.map((child: any) => (
								<>
									<Text
										as={"p"}
										fontSize={"14px"}
										py={"2"}
									>
										{child.addressStore}
									</Text>
									<Button
										bg={"#E6E8EA"}
										borderRadius={"16px"}
									>
										<Flex alignItems={"center"}>
											{child.icon}
											<Text
												as={"p"}
												fontSize={"14px"}
												fontWeight={600}
												pl={"2"}
												color={"black"}
											>
												{child.phone}
											</Text>
										</Flex>
									</Button>
								</>
							))}
						</Box>
					))}
				</DialogThinkPro>
			</Flex>
		</Box>
	);
};

export default Branch;
