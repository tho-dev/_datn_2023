import React, { useState, useEffect } from "react";
import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { Controller, useFieldArray } from "react-hook-form";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import { AddAdminIcon, CloseSmallIcon } from "~/components/common/Icons";
import { Select, chakraComponents } from "chakra-react-select";

type Props = {
	register?: any;
	control?: any;
	errors?: any;
	watch?: any;
	setValue?: any;
	getValues?: any;
	resetField?: any;
};

const options: any = [
	{
		label: "Màu",
		value: "color",
	},
	{
		label: "Phiên bản",
		value: "version",
	},
	{
		label: "Loại hàng",
		value: "type",
	},
];

const visuals = [
	{
		label: "Color",
		value: "color",
	},
	{
		label: "Text",
		value: "text",
	},
];

const OptionComponent = {
	Option: ({ children, ...props }: any) => (
		<chakraComponents.Option {...props}>
			<Text
				as="div"
				fontSize="sm"
			>
				{children}
			</Text>
		</chakraComponents.Option>
	),
	Control: ({ children, ...props }: any) => (
		<chakraComponents.Control {...props}>
			<Text
				as="div"
				w="full"
				display="flex"
				fontSize="sm"
			>
				{children}
			</Text>
		</chakraComponents.Control>
	),
};

const OptionNested = ({ nestIndex, control, register, errors }: any) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `variants.${nestIndex}.options`,
	});

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
									bgColor="transparent"
									placeholder="Đen, FHD+ 16GB, 512GB, Mới, Full box, ..."
									borderColor={
										errors?.variants?.[nestIndex]?.options?.[k]?.label
											? "border.error"
											: "border.primary"
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
									bgColor="transparent"
									placeholder="Đen, FHD+ 16GB, 512GB, Mới, Full box, ..."
									borderColor={
										errors?.variants?.[nestIndex]?.options?.[k]?.value
											? "border.error"
											: "border.primary"
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

const Options = ({ control, register, errors, setValue, getValues, watch, resetField }: Props) => {
	const toast = useToast();
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
					if (index <= 2) {
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
											<Controller
												control={control}
												name={`variants.${[index]}.name`}
												rules={{ required: "Không được để trống" }}
												render={({
													field: { onChange, onBlur, value, name, ref },
													fieldState: { error },
												}) => {
													const filterOptions = options.filter((option: any, k: any) => {
														if (index == 1) {
															return option.value != watch(`variants.${[0]}.name.value`);
														} else if (index == 2) {
															const array = [
																watch(`variants.${[0]}.name.value`),
																watch(`variants.${[1]}.name.value`),
															];

															return !array?.includes(option.value);
														} else {
															return option;
														}
													});

													return (
														<FormControl isInvalid={!!error}>
															<FormLabel
																htmlFor="price"
																fontSize="sm"
																fontWeight="semibold"
															>
																Thuộc tính
															</FormLabel>

															<Select
																name={name}
																ref={ref}
																onChange={onChange}
																onBlur={onBlur}
																value={value}
																options={filterOptions}
																placeholder={
																	<Text
																		as="span"
																		fontSize="sm"
																	>
																		Màu, Phiên Bản, Loại Hàng
																	</Text>
																}
																components={OptionComponent}
																closeMenuOnSelect={false}
															/>

															<FormErrorMessage>
																{error && error.message}
															</FormErrorMessage>
														</FormControl>
													);
												}}
											/>

											<Controller
												control={control}
												name={`variants.${[index]}.visual`}
												rules={{ required: "Không được để trống" }}
												render={({
													field: { onChange, onBlur, value, name, ref },
													fieldState: { error },
												}) => (
													<FormControl isInvalid={!!error}>
														<FormLabel
															fontSize="sm"
															fontWeight="semibold"
														>
															Hiển thị
														</FormLabel>

														<Select
															name={name}
															ref={ref}
															onChange={onChange}
															onBlur={onBlur}
															value={value}
															options={visuals}
															placeholder={
																<Text
																	as="span"
																	fontSize="sm"
																>
																	Màu, Chữ
																</Text>
															}
															components={OptionComponent}
															closeMenuOnSelect={false}
														/>

														<FormErrorMessage>{error && error.message}</FormErrorMessage>
													</FormControl>
												)}
											/>
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
					}
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
					// Giới hạn thuộc tính
					if (fields?.length > 2) {
						toast({
							title: "Giới hạn",
							description: "Bạn chỉ có thể tạo tối đa 3 thuộc tính",
							status: "error",
							duration: 1200,
							isClosable: true,
							position: "top-right",
						});

						return;
					}

					if (fields?.length == 0 && !watch(`variants.${[0]}.name.value`)) {
						setValue("variants", [
							...(getValues().variants || []),
							{
								name: "",
								visual: "",
								options: [{ label: "", value: "" }],
							},
						]);
					} else {
						if (watch(`variants.${[0]}.name.value`) || watch(`variants.${[1]}.name.value`)) {
							if (fields?.length == 1 && watch(`variants.${[0]}.name.value`)) {
								setValue("variants", [
									...(getValues().variants || []),
									{
										name: "",
										visual: "",
										options: [{ label: "", value: "" }],
									},
								]);
							} else if (
								fields?.length == 2 &&
								watch(`variants.${[0]}.name.value`) &&
								watch(`variants.${[1]}.name.value`)
							) {
								setValue("variants", [
									...(getValues().variants || []),
									{
										name: "",
										visual: "",
										options: [{ label: "", value: "" }],
									},
								]);
							} else {
								toast({
									title: "Thuộc tính",
									description: "Vui lòng chọn giá trị thuộc tính",
									status: "error",
									duration: 1200,
									isClosable: true,
									position: "top-right",
								});
							}
						} else {
							toast({
								title: "Thuộc tính",
								description: "Vui lòng chọn giá trị thuộc tính",
								status: "error",
								duration: 1200,
								isClosable: true,
								position: "top-right",
							});
						}
					}
				}}
			>
				Tạo thuộc tính
			</Button>
		</Box>
	);
};

export default Options;
