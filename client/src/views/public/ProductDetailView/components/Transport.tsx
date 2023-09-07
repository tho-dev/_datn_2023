import React, { useState, useRef } from "react";
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
	Box,
} from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";

type Props = {};

const Transport = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box>
			<Flex justifyContent={"space-between"}>
				<Text as={"h5"} fontSize={"20px"} fontWeight={"600"}>
					Vận chuyển
				</Text>
				<Flex
					onClick={onOpen}
					as={"button"}
					fontSize={"14px"}
					bg={"white"}
					alignItems={"center"}
					color={"blue"}
				>
					Chọn địa chỉ giao hàng
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

				<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader fontSize={"20px"}>Chọn Quận / Huyện</ModalHeader>
						<ModalCloseButton />
						<ModalBody mx={"2"}></ModalBody>
					</ModalContent>
				</Modal>
			</Flex>
		</Box>
	);
};

export default Transport;
