import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { Image, useMenu } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import { CloseSmallIcon, PicIcon, PicOneIcon } from "~/components/common/Icons";

type Props = {
	register?: any;
	watch?: any;
	getValues?: any;
	setValue?: any;
	errors: any;
};

const Media = ({ register, watch, errors, setValue, getValues }: Props) => {
	const assets = watch("assets");
	const image = watch("image");
	const [file, setFile] = useState(image);
	const [files, setFiles] = useState(() => {
		return assets?.length > 0 ? assets : [];
	});

	useEffect(() => {
		if (image?.length > 0) {
			setFile([image?.[0]]);
		}

		// return () => {
		// 	return URL.revokeObjectURL(URL.createObjectURL(image?.[0]));
		// };
	}, [image]);

	useEffect(() => {
		if (assets?.length > 0) {
			setFiles((prev: any) => {
				const checkLength = prev?.length == assets?.length;
				return checkLength ? prev : [...prev, ...assets];
			});
		}

		// return () => {
		// 	return URL.revokeObjectURL(files?.map((file: any) => URL.createObjectURL(file)));
		// };
	}, [assets]);

	const filePath = useMemo(() => {
		if (file?.length > 0) {
			return URL.createObjectURL(file?.[0]);
		}

		return undefined;
	}, [file]);

	const filePaths = useMemo(() => {
		if (files?.length > 0) {
			const urls = files?.map((item: any) => URL.createObjectURL(item));
			return urls;
		}

		return undefined;
	}, [files]);

	// xóa ảnh
	const handleDeleteFile = () => {
		setFile([]);
		// đẩy lại lên react-hook-form
		setValue("image", []);
	};

	const handleDeleteFiles = (id: any) => {
		const newFiles = files?.filter((item: any, index: any) => index != id);
		setFiles(newFiles);
		// đẩy lại lên react-hook-form
		setValue("assets", newFiles);
	};

	// console.log("files", files);
	// console.log("assets", assets);

	return (
		<Grid
			gap="4"
			templateColumns="repeat(5, 1fr)"
		>
			<GridItem colSpan={2}>
				<Center
					h="200px"
					maxH="full"
					bgColor="bg.admin1"
					rounded="lg"
					borderWidth="2px"
					borderColor="bg.admin2"
					borderStyle="dashed"
				>
					<Flex
						w="12"
						h="12"
						alignItems="center"
						justifyContent="center"
						rounded="full"
						bgColor="bg.admin2"
						cursor="pointer"
					>
						<Center>
							<FileUploadThinkPro
								accept={"image/*"}
								register={register("image")}
							>
								<PicOneIcon
									size={6}
									color="text.white"
								/>
							</FileUploadThinkPro>
						</Center>
					</Flex>
				</Center>

				{/* Preview Image */}
				{filePath && (
					<Flex mt="4">
						<Box
							w="160px"
							h="160px"
							maxW="full"
							maxH="full"
							rounded="lg"
							borderWidth="1px"
							borderColor="border.primary"
							overflow="hidden"
							position="relative"
						>
							<Image
								w="full"
								h="full"
								objectFit="cover"
								src={filePath}
							/>
							<Flex
								w="4"
								h="4"
								position="absolute"
								top="1"
								right="1"
								bgColor="bg.admin1"
								alignItems="center"
								justifyContent="center"
								rounded="full"
								cursor="pointer"
								onClick={handleDeleteFile}
							>
								<CloseSmallIcon
									size={4}
									color="text.black"
								/>
							</Flex>
						</Box>
					</Flex>
				)}
			</GridItem>
			<GridItem colSpan={3}>
				<Center
					h="200px"
					maxH="full"
					bgColor="bg.admin1"
					rounded="lg"
					borderWidth="2px"
					borderColor="bg.admin2"
					borderStyle="dashed"
				>
					<Flex
						w="12"
						h="12"
						alignItems="center"
						justifyContent="center"
						rounded="full"
						bgColor="bg.admin2"
						cursor="pointer"
					>
						<Center>
							<FileUploadThinkPro
								accept={"image/*"}
								multiple
								register={register("assets")}
							>
								<PicIcon
									size={6}
									color="text.white"
								/>
							</FileUploadThinkPro>
						</Center>
					</Flex>
				</Center>
				{/* Preview assets */}
				{filePaths && (
					<Grid
						mt="4"
						gap="3"
						templateColumns="repeat(5, 1fr)"
					>
						{filePaths.map((item: any, index: number) => {
							return (
								<GridItem key={index}>
									<Box
										w="full"
										h="full"
										maxW="full"
										maxH="full"
										rounded="lg"
										borderWidth="1px"
										borderColor="border.primary"
										overflow="hidden"
										position="relative"
										pb="calc(100% - 2px)"
									>
										<Box
											w="full"
											h="full"
											position="absolute"
										>
											<Image
												w="full"
												h="full"
												objectFit="cover"
												src={item}
											/>
										</Box>
										<Flex
											w="4"
											h="4"
											position="absolute"
											top="1"
											right="1"
											bgColor="bg.admin1"
											alignItems="center"
											justifyContent="center"
											rounded="full"
											cursor="pointer"
											onClick={() => handleDeleteFiles(index)}
										>
											<CloseSmallIcon
												size={3}
												color="text.black"
											/>
										</Flex>
									</Box>
								</GridItem>
							);
						})}
					</Grid>
				)}
			</GridItem>
		</Grid>
	);
};

export default Media;
