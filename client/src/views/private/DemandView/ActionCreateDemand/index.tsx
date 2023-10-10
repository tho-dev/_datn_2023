import { useForm } from "react-hook-form";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	Flex, 
	useToast,
} from "@chakra-ui/react";
import { CloseSmallIcon } from "~/components/common/Icons"; 
import { useCreateDemandMutation } from "~/redux/api/demand";

type Props = {
	onClose: () => void;
	parents: any;
};

const ActionDemand = ({ onClose, parents }: Props) => {
	const toast = useToast();
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm();

	const [createDemand, { isLoading }] = useCreateDemandMutation();

	const onSubmit = async (data: any) => {
		data = {
			...data,
			parent_id: data?.parent_id?.value,
		};

		try {
			await createDemand(data).unwrap();
			toast({
				title: "Thành công",
				duration: 1600,
				position: "top-right",
				status: "success",
				description: "Tạo danh mục thành công",
			});
		} catch (error: any) {
			toast({
				title: "Có lỗi",
				duration: 1600,
				position: "top-right",
				status: "error",
				description: JSON.stringify(error?.data?.errors),
			});
		}

		reset();
		onClose();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex
				flexDir="column"
				gap="4"
			> 
				<FormControl isInvalid={errors.name as any}>
					<FormLabel
						htmlFor="name"
						fontSize="15"
						fontWeight="semibold"
					>
						Nhu cầu
					</FormLabel>
					<Input
						id="name"
						placeholder="VD: Học tập"
						{...register("name", {
							required: "Không được để trống !!!",
						})}
					/>
					<FormErrorMessage>{(errors.name as any) && errors?.name?.message}</FormErrorMessage>
				</FormControl>
				
			</Flex>
			<Flex
				gap="3"
				justifyContent="flex-end"
				mt="6"
			>
				<Button
					textColor="text.textDelete"
					bgColor="transparent"
					fontWeight="bold"
					px="4"
					_hover={{
						bgColor: "bg.bgDelete",
					}}
					leftIcon={<CloseSmallIcon size={4} />}
					onClick={onClose}
				>
					Đóng
				</Button>
				<Button
					type="submit"
					bgColor="text.textSuccess"
					textColor="text.white"
					fontWeight="bold"
					px="4"
					isLoading={isLoading}
				>
					Tạo mới
				</Button>
			</Flex>
		</form>
	);
};

export default ActionDemand;
