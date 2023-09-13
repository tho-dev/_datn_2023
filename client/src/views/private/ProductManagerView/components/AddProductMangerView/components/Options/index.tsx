import React from "react";
import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useFieldArray } from "react-hook-form";
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { AddAdminIcon, CloseSmallIcon } from "~/components/common/Icons";

type Props = {
	register?: any;
	control?: any;
	errors?: any;
	setValue?: any;
	getValues?: any;
};

const OptionNested = ({ nestIndex, control, register, errors }: any) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `variants.${nestIndex}.options`,
	});

	console.log("errors", errors);

	const placeholderLabelText =
		(nestIndex == 0 && "Black, pink, green, inova,...") ||
		(nestIndex == 1 && "i7 1260P, FHD+ 16GB, 512GB,...") ||
		(nestIndex == 2 && "Mới, Full box, Nhập khẩu,...");

	return (
		<Box>
			<Flex
				mt="4"
				flexDir="column"
				alignItems="flex-end"
				maxH="240px"
				minH="240px"
				overflowY="auto"
				css={{
					"&::-webkit-scrollbar": {
						width: "6px",
					},
					"&::-webkit-scrollbar-track": {
						width: "6px",
					},
					"&::-webkit-scrollbar-thumb": {
						height: "32px !important",
						borderRadius: "24px",
						backgroundColor: "#e6e6e6",
					},
				}}
			>
				{fields?.map((item, k) => {
					return (
						<Flex
							flexDir="column"
							gap="2"
							w="full"
							position="relative"
							px="6"
							py="4"
							key={item?.id}
						>
							<FormControl isInvalid={errors?.variants?.[nestIndex]?.options?.[k]?.label as any}>
								<Input
									{...register(`variants.${nestIndex}.options.${k}.label`, {
										required: "Không được để trống",
									})}
									placeholder={placeholderLabelText}
									borderColor={
										errors?.variants?.[nestIndex]?.options?.[k]?.label
											? "border.error"
											: "transparent"
									}
								/>
								<FormErrorMessage>
									{(errors?.variants?.[nestIndex]?.options?.[k]?.label as any) &&
										errors?.variants?.[nestIndex]?.options?.[k]?.label?.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors?.variants?.[nestIndex]?.options?.[k]?.value as any}>
								<Input
									{...register(`variants.${nestIndex}.options.${k}.value`, {
										required: "Không được để trống",
									})}
									placeholder="#ccc, nhập khẩu,..."
									borderColor={
										errors?.variants?.[nestIndex]?.options?.[k]?.value
											? "border.error"
											: "transparent"
									}
								/>
								<FormErrorMessage>
									{(errors?.variants?.[nestIndex]?.options?.[k]?.value as any) &&
										errors?.variants?.[nestIndex]?.options?.[k]?.value?.message}
								</FormErrorMessage>
							</FormControl>
							<Flex
								position="absolute"
								top="1"
								right="2"
								display="inline-flex"
								alignItems="center"
								justifyContent="center"
								cursor="pointer"
								onClick={() => remove(k)}
								w="4"
								h="4"
								bgColor="bg.white"
								rounded="full"
							>
								<CloseSmallIcon
									size={3}
									color="text.black"
									strokeWidth={1.5}
								/>
							</Flex>
						</Flex>
					);
				})}
			</Flex>
			<Button
				bgColor="text.textSuccess"
				size="small"
				fontWeight="bold"
				px="4"
				leftIcon={<AddAdminIcon size={4} />}
				_hover={{
					textDecor: "none",
				}}
				onClick={() =>
					append({
						label: "",
						value: "",
					})
				}
			>
				Tạo
			</Button>
		</Box>
	);
};

const Options = ({ control, register, errors, setValue, getValues }: Props) => {
	const { fields, append, remove, prepend } = useFieldArray({
		control,
		name: "variants",
	});

	return (
		<Box>
			<Grid
				gap="4"
				templateColumns="repeat(3, 1fr)"
				overflowY="auto"
				css={{
					"&::-webkit-scrollbar": {
						width: "6px",
					},
					"&::-webkit-scrollbar-track": {
						width: "6px",
					},
					"&::-webkit-scrollbar-thumb": {
						height: "32px !important",
						borderRadius: "24px",
						backgroundColor: "#e6e6e6",
					},
				}}
			>
				{fields.map((item, index) => {
					const placeholderName =
						(index == 0 && "Màu") || (index == 1 && "Phiên bản") || (index == 2 && "Loại hàng");

					return (
						<GridItem key={item.id}>
							<Flex
								flexDir="column"
								bgColor="bg.gray"
								px="6"
								py="5"
								rounded="lg"
								position="relative"
							>
								<Flex justifyContent="flex-start">
									<Flex
										gap="4"
										flexDir="column"
										w="full"
									>
										<FormControl isInvalid={errors?.variants?.[index]?.name as any}>
											<FormLabel
												fontSize="sm"
												fontWeight="semibold"
											>
												Thuộc tính
											</FormLabel>
											<Input
												{...register(`variants.${index}.name`, {
													required: "Không để trống",
												})}
												placeholder={placeholderName}
												borderColor={
													errors?.variants?.[index]?.name ? "border.error" : "transparent"
												}
											/>
											<FormErrorMessage>
												{(errors?.variants?.[index]?.name as any) &&
													errors?.variants?.[index]?.name?.message}
											</FormErrorMessage>
										</FormControl>
										<FormControl isInvalid={errors?.variants?.[index]?.visual as any}>
											<FormLabel
												fontSize="sm"
												fontWeight="semibold"
											>
												Hiển thị
											</FormLabel>
											<Input
												{...register(`variants.${index}.visual`, {
													required: "Không để trống",
												})}
												placeholder="color, text, image, ..."
												borderColor={
													errors?.variants?.[index]?.visual ? "border.error" : "transparent"
												}
											/>
											<FormErrorMessage>
												{(errors?.variants?.[index]?.visual as any) &&
													errors?.variants?.[index]?.visual?.message}
											</FormErrorMessage>
										</FormControl>
									</Flex>
								</Flex>

								{/* Thuộc tính lồng nhau */}
								<OptionNested
									nestIndex={index}
									control={control}
									register={register}
									errors={errors}
								/>
								<Flex
									position="absolute"
									top="2"
									right="2"
									display="inline-flex"
									alignItems="center"
									justifyContent="center"
									cursor="pointer"
									onClick={() => remove(index)}
									w="5"
									h="5"
									bgColor="bg.white"
									rounded="full"
								>
									<CloseSmallIcon
										size={4}
										color="text.black"
										strokeWidth={1.5}
									/>
								</Flex>
							</Flex>
						</GridItem>
					);
				})}
			</Grid>
			<Button
				bgColor="text.textSuccess"
				size="medium"
				px="4"
				mt="4"
				leftIcon={<AddAdminIcon size={5} />}
				_hover={{
					textDecor: "none",
				}}
				onClick={() => {
					setValue("variants", [
						...(getValues().variants || []),
						{
							name: "",
							visual: "",
							options: [{ label: "", value: "" }],
						},
					]);
				}}
			>
				Tạo thuộc tính
			</Button>
		</Box>
	);
};

export default Options;
