import { ChangeEvent, useEffect, useRef, useState } from "react";
import DefaultAvatar from "~/assets/images/thumb.png";
import { Input } from "@chakra-ui/input";
import { uploadImage, removeFile } from "~/services/upload.service";
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { CloseIcon, CloseSmallIcon, UploadImageIcon } from "../common/Icons";

interface UploadImageProps {
	getDataFn: (data: string) => void;
	setData?: string;
	fileName: string;
}

const FileUploadThinkPro = ({ getDataFn, setData, fileName }: UploadImageProps) => {
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [selectedImage, setSelectedImage] = useState<any>(null);
	const [spinner, setSpinner] = useState<any>(false);

	useEffect(() => {
		setSelectedImage(setData || "");
	}, []);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSpinner(true);
		const selectedFiles = event.target.files;
		if (selectedFiles && selectedFiles.length > 0) {
			const file = selectedFiles[0];
			const formData = new FormData();
			formData.append(fileName, file);
			callApiUploadImg(formData);
		}
	};

	const callApiUploadImg = async (param: FormData) => {
		const res = await uploadImage(param);
		setSelectedImage(res?.data?.[0]);
		getDataFn(res?.data?.[0]);
		setSpinner(false);
	};

	const handleClickSelectFile = () => {
		if (inputFileRef.current) {
			inputFileRef.current.value = "";
			inputFileRef.current.click();
		}
	};

	const handleClearImage = async () => {
		await removeFile(selectedImage?.id);
		setSelectedImage(null);
		if (inputFileRef.current) {
			inputFileRef.current.value = "";
		}
	};

	return (
		<Box
			onClick={handleClickSelectFile}
			position="relative"
			w="full"
			h="full"
			cursor="pointer"
			rounded="md"
			role="group"
			bgColor="bg.gray"
		>
			<Input
				type="file"
				ref={inputFileRef}
				onChange={handleFileChange}
				w="full"
				h="full"
				visibility="hidden"
			/>

			{spinner && (
				<Box
					position="absolute"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					zIndex="3"
				>
					<Spinner
						size="lg"
						color="bg.blue"
					/>
				</Box>
			)}

			{selectedImage ? (
				<Image
					src={selectedImage ? selectedImage?.url : DefaultAvatar}
					w="full"
					h="full"
					rounded="md"
					position="absolute"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					zIndex="2"
					objectFit="contain"
					p="2"
				/>
			) : (
				<Flex
					w="full"
					h="full"
					rounded="md"
					position="absolute"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					zIndex="2"
					justifyContent="center"
					alignItems="center"
				>
					<UploadImageIcon size={10} />
				</Flex>
			)}

			{selectedImage && (
				<Flex
					w="full"
					py="1"
					rounded="full"
					bgColor="bg.bgDelete"
					top="-8"
					opacity="1"
					position="absolute"
					gap="1"
					zIndex="99"
					justifyContent="center"
					alignItems="center"
					transition="all 0.5s ease"
					onClick={handleClearImage}
				>
					<Text
						fontSize="xs"
						color="text.textDelete"
						fontWeight="semibold"
					>
						Bỏ chọn ảnh
					</Text>
					<CloseSmallIcon
						size={4}
						color="text.textDelete"
					/>
				</Flex>
			)}
		</Box>
	);
};

export default FileUploadThinkPro;
