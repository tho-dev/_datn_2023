import React from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	Button,
	AlertDialogCloseButton,
	Flex,
	Box,
	Text,
} from "@chakra-ui/react";
import { TraskIcon } from "~/components/common/Icons";

type Props = {
	isOpen?: boolean;
	onClose?: any;
	handleClick?: any;
	icon?: React.ReactNode;
	size?: string;
	title?: string;
	content?: string;
	textBtnClose?: string;
	textBtnNext?: string;
};

const ConfirmThinkPro = ({
	isOpen = false,
	onClose,
	handleClick,
	icon = (
		<TraskIcon
			size={14}
			color="bg.red"
		/>
	),
	size = "lg",
	title = "Bạn có chắc không?",
	content = "Bạn có chắc muốn xóa bản ghi này không?",
	textBtnClose = "Hủy",
	textBtnNext = "Oki, Tôi muốn",
}: Props) => {
	const cancelRef = React.useRef();

	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={cancelRef as any}
			onClose={onClose}
			isOpen={isOpen}
			isCentered
			size={size}
		>
			<AlertDialogOverlay />

			<AlertDialogContent>
				<AlertDialogHeader></AlertDialogHeader>
				<AlertDialogCloseButton />
				<AlertDialogBody
					pt="12"
					pb="0"
				>
					<Flex
						flexDir="column"
						alignItems="center"
						justifyContent="center"
					>
						{icon}
						<Box mt="6">
							<Text
								fontSize="lg"
								textAlign="center"
								fontWeight="bold"
							>
								{title}
							</Text>
							<Text
								fontSize="md"
								textAlign="center"
							>
								{content}
							</Text>
						</Box>
					</Flex>
				</AlertDialogBody>
				<AlertDialogFooter
					justifyContent="center"
					pt="6"
					pb="12"
				>
					<Button
						ref={cancelRef as any}
						onClick={onClose}
						bgColor="#f3f6f9"
						color="text.black"
						transition="all 0.5s ease"
						_hover={{
							transform: "translateY(-5px)",
							bgColor: "#cfd1d4",
						}}
					>
						{textBtnClose}
					</Button>
					<Button
						colorScheme="red"
						ml={3}
						transition="all 0.5s ease"
						_hover={{
							transform: "translateY(-5px)",
							bgColor: "#cb3c5e",
						}}
						onClick={handleClick}
					>
						{textBtnNext}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ConfirmThinkPro;
