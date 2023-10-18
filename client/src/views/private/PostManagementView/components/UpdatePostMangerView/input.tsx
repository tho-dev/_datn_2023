import { useForm } from "react-hook-form";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	Flex,
	Textarea,
	Box,
	useToast,
} from "@chakra-ui/react";
import { CloseSmallIcon } from "~/components/common/Icons";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import SelectThinkPro from "~/components/SelectThinkPro";
import { useUpdatePostMutation } from "~/redux/api/post";

type Props = {
	onClose: () => void;
	post: any;
	parents: any;  

};

const ActionUpdatePost = ({ onClose, parents, post }: Props) => {
	const toast = useToast();
	const {
		control,
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		watch,
		reset,
	} = useForm({
		defaultValues: post,
	});

	const [updatePost, { isLoading }] = useUpdatePostMutation();

	const onSubmit = async (data: any) => {
		data = {
			...data,
			parent_id: data?.parent_id?.value,
			category_id: data?.category_id?.value,
		};

		try {
			await updatePost(data).unwrap();
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
				<FormControl isInvalid={errors.file as any}>
					<Flex
						justifyContent="center"
						mt="8"
					>
						<Box
							w="120px"
							h="120px"
						>
							<FileUploadThinkPro
								fileName="category"
								getDataFn={(data: any) => setValue("thumbnail", data)}
								setData={watch("thumbnail")}
							/>
						</Box>
					</Flex>

					<FormErrorMessage>{(errors.thumbnail as any) && errors?.thumbnail?.message}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={errors.title as any}>
					<FormLabel
						htmlFor="title"
						fontSize="15"
						fontWeight="semibold"
					>
						Title
					</FormLabel>
					<Input
						id="title"
						placeholder="VD: Dell"
						{...register("title", {
							required: "Không được để trống !!!",
						})}
					/>
					<FormErrorMessage>{(errors.title as any) && errors?.title?.message}</FormErrorMessage>
				</FormControl>
				
				{/* Bài viết */}
				<SelectThinkPro
					control={control}
					name="category_id"
					title="Danh mục"
					placeholder="-- Danh mục --"
					data={parents}
					rules={{ required: "Không được để trống" }}
				/>
				<FormControl isInvalid={errors.description as any}>
					<FormLabel
						fontSize="15"
						htmlFor="description"
						fontWeight="semibold"
					>
						Description
					</FormLabel>
					<Textarea
						id="description"
						size="lager"
						p="4"
						rounded="4px"
						fontSize="sm"
						boxShadow="none"
						placeholder="VD: thuong hieu..."
						{...register("description", {
							required: "Không được để trống !!!",
						})}
					/>
					<FormErrorMessage>{(errors.content as any) && errors?.content?.message}</FormErrorMessage>
				</FormControl>

				{/* content */}
				<FormControl isInvalid={errors.content as any}>
					<FormLabel
						fontSize="15"
						htmlFor="content"
						fontWeight="semibold"
					>
						Content
					</FormLabel>
					<Textarea
						id="content"
						size="lager"
						p="4"
						rounded="4px"
						fontSize="sm"
						boxShadow="none"
						placeholder="VD: thuong hieu..."
						{...register("content", {
							required: "Không được để trống !!!",
						})}
					/>
					<FormErrorMessage>{(errors.content as any) && errors?.content?.message}</FormErrorMessage>
				</FormControl>

				{/* meta_keyword */}
				<FormControl isInvalid={errors.meta_keyword as any}>
					<FormLabel
						fontSize="15"
						htmlFor="meta_keyword"
						fontWeight="semibold"
					>
						Meta keyword
					</FormLabel>
					<Textarea
						id="meta_keyword"
						size="lager"
						p="4"
						rounded="4px"
						fontSize="sm"
						boxShadow="none"
						placeholder="VD: thuong hieu..."
						{...register("meta_keyword", {
							required: "Không được để trống !!!",
						})}
					/>
					<FormErrorMessage>{(errors.meta_keyword as any) && errors?.meta_keyword?.message}</FormErrorMessage>
				</FormControl>

				{/* meta_description */}
				<FormControl isInvalid={errors.meta_description as any}>
					<FormLabel
						fontSize="15"
						htmlFor="meta_description"
						fontWeight="semibold"
					>
						Meta description
					</FormLabel>
					<Textarea
						id="meta_description"
						size="lager"
						p="4"
						rounded="4px"
						fontSize="sm"
						boxShadow="none"
						placeholder="VD: thuong hieu..."
						{...register("meta_description", {
							required: "Không được để trống !!!",
						})}
					/>
					<FormErrorMessage>{(errors.meta_description as any) && errors?.meta_description?.message}</FormErrorMessage>
				</FormControl>

				{/* meta_title */}

				<FormControl isInvalid={errors.meta_title as any}>
					<FormLabel
						fontSize="15"
						htmlFor="meta_title"
						fontWeight="semibold"
					>
						Meta title
					</FormLabel>
					<Textarea
						id="meta_title"
						size="lager"
						p="4"
						rounded="4px"
						fontSize="sm"
						boxShadow="none"
						placeholder="VD: thuong hieu..."
						{...register("meta_title", {
							required: "Không được để trống !!!",
						})}
					/>
					<FormErrorMessage>{(errors.meta_title as any) && errors?.meta_title?.message}</FormErrorMessage>
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
					Cập nhật
				</Button>
			</Flex>
		</form>
	);
};

export default ActionUpdatePost;