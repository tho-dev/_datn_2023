import React, { useEffect } from "react";
import DialogThinkPro from "~/components/DialogThinkPro";
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	PinInput,
	PinInputField,
	Radio,
	RadioGroup,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
type Props = {
	// isOpen: any;
	// onClose: any;
	// onOpen: any;
	open: any;
};

const PopupCheckOtp = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	useEffect(() => {
		props.open == true ? onOpen() : "";
		console.log(props.open);
	}, [props.open]);
	const [value, setValue] = React.useState("");
	const { register, handleSubmit } = useForm({});

	const submitForm = () => {
		console.log("value_", value);
		onClose();
	};
	return (
		<DialogThinkPro isOpen={isOpen} onClose={onClose} isCentered>
			<form onSubmit={handleSubmit(submitForm)}>
				<Box my={"5"} w={"full"}>
					<Box
						backgroundColor={"white"}
						borderRadius={"md"}
						p={"24px"}
						mr={"5"}
						w={{ md: "80%", base: "full" }}
					>
						<Text fontSize={"20px"} fontWeight={600} as={"h3"}>
							Check OTP
						</Text>
						<FormControl>
							<HStack>
								<PinInput onChange={(value) => setValue(value)}>
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
								</PinInput>
							</HStack>
							<FormErrorMessage>{value.length === 0 ? "Mời bạn nhập mã OTP" : ""}</FormErrorMessage>
						</FormControl>
						<Button bg={"green.400"} mt={"16px"} type="submit">
							Xác nhận
						</Button>
					</Box>
				</Box>
			</form>
		</DialogThinkPro>
	);
};

export default PopupCheckOtp;
