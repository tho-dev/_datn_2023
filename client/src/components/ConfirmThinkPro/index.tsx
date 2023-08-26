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
	isOpen?: any;
	onOpen?: any;
	onClose?: any;
};

const ConfirmThinkPro = ({ onClose, isOpen, onOpen }: Props) => {
	const cancelRef = React.useRef();

	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={cancelRef as any}
			onClose={onClose}
			isOpen={isOpen}
			isCentered
			size="lg"
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
						<TraskIcon
							size={14}
							color="bg.red"
						/>

						<Box mt="6">
							<Text
								fontSize="lg"
								textAlign="center"
								fontWeight="bold"
							>
								Bạn có chắc chắn không?
							</Text>
							<Text
								fontSize="md"
								textAlign="center"
							>
								Bạn có chắc muốn xóa bản ghi này không?
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
						Hủy
					</Button>
					<Button
						colorScheme="red"
						ml={3}
						transition="all 0.5s ease"
						_hover={{
							transform: "translateY(-5px)",
							bgColor: "#cb3c5e",
						}}
					>
						Có tôi muốn
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ConfirmThinkPro;
