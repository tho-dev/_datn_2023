import { useForm, useWatch } from "react-hook-form";
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
import { useGetAllPostQuery, useUpdatePostMutation } from "~/redux/api/post";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import { useGetAllDemandQuery } from "~/redux/api/demand";
import QuillThinkPro from "~/components/QuillThinkPro";

type Props = {
	onClose: () => void;
	parents: any;
	category: any;

};

const ActionUpdatePost = ({ onClose, parents, category }: Props) => {
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
		defaultValues: category,
	});




	const [updatePost, { isLoading }] = useUpdatePostMutation();
	const navigate = useNavigate();

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
				description: "Cập nhật danh mục thành công",
			});
			reset();
			navigate("/admin/bai-viet");
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

	const thumbnail = watch("thumbnail");
	const title = watch("title");
	const category_id = watch("category_id")
	const description = watch("description");
	const content = watch("content");
	const meta_keyword = watch("meta_keyword");
	const meta_description = watch("meta_description");
	const meta_title = watch("meta_title");

	useEffect(() => { 
		register("description", { required: "Không được để trống" });
		register("content", { required: "Không được để trống" });
		register("meta_keyword", { required: "Không được để trống" });
		register("meta_description", { required: "Không được để trống" });
		register("meta_title", { required: "Không được để trống" });
	}, [register]);

	const onEditorStateChangeDescription = (value: any) => {
		setValue("description", value);
	};

	const onEditorStateChangeContent = (value: any) => {
		setValue("content", value);
	};

	const onEditorStateChangeMetaKeyword = (value: any) => {
		setValue("meta_keyword", value);
	};

	const onEditorStateChangeMetaDescription = (value: any) => {
		setValue("meta_description", value);
	};

	const onEditorStateChangeMetaTitle = (value: any) => {
		setValue("meta_title", value);
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
							w="200px"
							h="200px"
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
					title="Danh mục"
					control={control}
					data={parents}
					name="category_id"
					placeholder="-- Danh mục --"
					rules={{ required: "Không được để trống" }}
				/>

				{/* Description */}
				<FormControl isInvalid={errors.description as any}>
					<FormLabel
						fontSize="15"
						htmlFor="description"
						fontWeight="semibold"
					>
						Description
					</FormLabel>
					<QuillThinkPro
						data={description}
						onEditorStateChange={onEditorStateChangeDescription as any}
					/>
					<FormErrorMessage>{(errors.description as any) && errors?.description?.message}</FormErrorMessage>
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
					<QuillThinkPro
						data={content}
						onEditorStateChange={onEditorStateChangeContent as any}
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
					<QuillThinkPro
						data={meta_keyword}
						onEditorStateChange={onEditorStateChangeMetaKeyword as any}
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
					<QuillThinkPro
						data={meta_description}
						onEditorStateChange={onEditorStateChangeMetaDescription as any}
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
					<QuillThinkPro
						data={meta_title}
						onEditorStateChange={onEditorStateChangeMetaTitle as any}
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