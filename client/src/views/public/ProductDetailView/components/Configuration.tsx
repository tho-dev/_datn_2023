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
	Grid,
	GridItem,
} from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";

type Props = {};
const dataFake = [
	{
		name: "Loại CPU",
		detail: `Loại CPU:
        Intel Core i5 1340P, 12C/16T
        Tốc độ:
        1.0GHz , Lên tới 4.6GHz
        Bộ nhớ đệm:
        12MB`,
	},
	{
		name: "Loại CPU",
		detail: `Loại CPU:
        Intel Core i5 1340P, 12C/16T
        Tốc độ:
        1.0GHz , Lên tới 4.6GHz
        Bộ nhớ đệm:
        12MB`,
	},
	{
		name: "Loại CPU",
		detail: `Loại CPU:
        Intel Core i5 1340P, 12C/16T
        Tốc độ:
        1.0GHz , Lên tới 4.6GHz
        Bộ nhớ đệm:
        12MB`,
	},
	{
		name: "Loại CPU",
		detail: `Loại CPU:
        Intel Core i5 1340P, 12C/16T
        Tốc độ:
        1.0GHz , Lên tới 4.6GHz
        Bộ nhớ đệm:
        12MB`,
	},
];
const Configuration = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = useState<any>("inside");
	const btnRef = useRef(null);
	return (
		<Box mb={"2"}>
			<Flex justifyContent={"space-between"}>
				<Text as={"h5"} fontSize={"20px"} fontWeight={"600"}>
					Cấu hình đặc điểm
				</Text>
				<Flex
					onClick={onOpen}
					as={"button"}
					fontSize={"14px"}
					bg={"white"}
					alignItems={"center"}
					color={"blue"}
				>
					Xem cấu hình chi tiết
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
					size={"2xl"}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader fontSize={"20px"}>Cấu hình chi tiết </ModalHeader>
						<ModalCloseButton />
						<ModalBody mx={"2"}>
							<Box>
								<Grid templateColumns={"repeat(2, 1fr)"} gap={"4"}>
									{dataFake.map((data: any) => (
										<GridItem>
											<Text fontSize={"14px"} fontWeight={600} py={"2"}>
												{data.name}
											</Text>
											<Text fontSize={"14px"}>{data.detail}</Text>
										</GridItem>
									))}
								</Grid>
							</Box>
						</ModalBody>
					</ModalContent>
				</Modal>
			</Flex>
			<Box>
				<Grid templateColumns={"repeat(2, 1fr)"} gap={"4"}>
					{dataFake.map((data: any) => (
						<GridItem>
							<Text fontSize={"14px"} fontWeight={600} py={"2"}>
								{data.name}
							</Text>
							<Text fontSize={"14px"}>{data.detail}</Text>
						</GridItem>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default Configuration;
