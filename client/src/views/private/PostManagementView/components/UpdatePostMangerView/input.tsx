import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Input,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import QuillThinkPro from "~/components/QuillThinkPro";
import SelectThinkPro from "~/components/SelectThinkPro";
import { useGetSinglePostQuery, useUpdatePostMutation } from "~/redux/api/post";

type Props = {
	onClose: () => void;
	parents: any;
	slug: any;
};

const ActionUpdatePost = ({ onClose, parents, slug }: Props) => {
	const toast = useToast();
	const {
		control,
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		watch,
		reset,
	} = useForm();

	const { data: post } = useGetSinglePostQuery(slug, {
		skip: !slug,
	});
	const [updatePost, { isLoading }] = useUpdatePostMutation();
	const navigate = useNavigate();

	const onSubmit = async ({ category, related_posts, slug, created_by, updated_by, ...data }: any) => {
		data = {
			...data,
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

	const content = watch("content");

	useEffect(() => {
		register("content", { required: "Không được để trống" });
	}, [register]);

	useEffect(() => {
		if (post) {
			const defaultData = {
				...post?.data,
				category_id: {
					label: post?.data?.category?.name,
					value: post?.data?.category?._id,
				},
			};

			console.log("defaultData", defaultData);

			reset(defaultData);
		}
	}, [post]);

	const onEditorStateChangeContent = (value: any) => {
		setValue("content", value);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid
				gap={{
					xl: "6",
				}}
				templateColumns="repeat(12, 1fr)"
			>
				<GridItem colSpan={12}>
					<FormControl isInvalid={errors.file as any}>
						<Flex
							justifyContent="center"
							mt="8"
						>
							<Box
								w="50%"
								h="260px"
								rounded="2xl"
								overflow="hidden"
							>
								<FileUploadThinkPro
									fileName="banner"
									getDataFn={(data: any) => setValue("thumbnail", data)}
									setData={watch("thumbnail")}
								/>
							</Box>
						</Flex>

						<FormErrorMessage>{(errors.thumbnail as any) && errors?.thumbnail?.message}</FormErrorMessage>
					</FormControl>
				</GridItem>
				<GridItem colSpan={9}>
					<Flex
						flexDir="column"
						gap="4"
						bgColor="white"
						my={4}
						borderRadius={6}
						w={"100%"}
					>
						<FormControl isInvalid={errors.title as any}>
							<FormLabel
								htmlFor="title"
								fontSize="15"
								fontWeight="semibold"
							>
								Tiêu đề
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

						{/* description */}
						<FormControl isInvalid={errors.description as any}>
							<FormLabel
								fontSize="15"
								htmlFor="description"
								fontWeight="semibold"
							>
								Nội dung
							</FormLabel>
							<Textarea
								id="description"
								placeholder="Nội dung"
								{...register("description", {
									required: "Không được để trống !!!",
								})}
							/>
							<FormErrorMessage>
								{(errors.description as any) && errors?.description?.message}
							</FormErrorMessage>
						</FormControl>

						{/* meta_keyword */}
						<FormControl isInvalid={errors.meta_title as any}>
							<FormLabel
								htmlFor="meta_title"
								fontSize="15"
								fontWeight="semibold"
							>
								Meta title
							</FormLabel>
							<Input
								id="meta_title"
								placeholder="Meta title"
								{...register("meta_title", {
									required: "Không được để trống !!!",
								})}
							/>
							<FormErrorMessage>
								{(errors.meta_title as any) && errors?.meta_title?.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={errors.meta_keyword as any}>
							<FormLabel
								htmlFor="meta_keyword"
								fontSize="15"
								fontWeight="semibold"
							>
								Meta keyword
							</FormLabel>
							<Input
								id="meta_keyword"
								placeholder="Meta keyword"
								{...register("meta_keyword", {
									required: "Không được để trống !!!",
								})}
							/>
							<FormErrorMessage>
								{(errors.meta_keyword as any) && errors?.meta_keyword?.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={errors.meta_description as any}>
							<FormLabel
								htmlFor="meta_description"
								fontSize="15"
								fontWeight="semibold"
							>
								Meta description
							</FormLabel>
							<Textarea
								id="meta_description"
								placeholder="Meta description"
								{...register("meta_description", {
									required: "Không được để trống !!!",
								})}
							/>
							<FormErrorMessage>
								{(errors.meta_description as any) && errors?.meta_description?.message}
							</FormErrorMessage>
						</FormControl>

						{/* content */}
						<FormControl isInvalid={errors.content as any}>
							<FormLabel
								fontSize="15"
								htmlFor="content"
								fontWeight="semibold"
							>
								Mô tả
							</FormLabel>
							<QuillThinkPro
								data={content}
								onEditorStateChange={onEditorStateChangeContent as any}
							/>
							<FormErrorMessage>{(errors.content as any) && errors?.content?.message}</FormErrorMessage>
						</FormControl>
					</Flex>
				</GridItem>
				<GridItem colSpan={3}>
					<Flex
						flexDir="column"
						gap="4"
						bgColor="white"
						my={4}
						borderRadius={6}
						w={"100%"}
					>
						<SelectThinkPro
							title="Danh mục"
							control={control}
							data={parents}
							name="category_id"
							placeholder="-- Danh mục --"
							rules={{ required: "Không được để trống" }}
						/>
					</Flex>
				</GridItem>
				<GridItem colSpan={12}>
					<Flex
						gap="3"
						justifyContent="flex-end"
						mt="6"
					>
						<Button
							textColor="text.textDelete"
							bgColor="bg.bgDelete"
							fontWeight="bold"
							px="4"
							onClick={onClose}
						>
							Đóng
						</Button>
						<Button
							w={"40"}
							isLoading={isLoading}
							type="submit"
							bgColor="bg.bgEdit"
							color="text.textEdit"
						>
							Cập nhật
						</Button>
					</Flex>
				</GridItem>
			</Grid>
		</form>
	);
};

export default ActionUpdatePost;
