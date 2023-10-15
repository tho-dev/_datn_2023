import React, { useState, useEffect } from "react";
import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { Controller, useFieldArray } from "react-hook-form";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import { AddAdminIcon, CloseSmallIcon } from "~/components/common/Icons";
import SelectThinkPro from "~/components/SelectThinkPro";

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

const OptionNested = ({ nestIndex, control, register, errors }: any) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `variants.${nestIndex}.options`,
	});

	return (
		<Box
			w="full"
			h="auto"
		>
			<Flex
				flexDir="column"
				alignItems="flex-end"
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
							gap="4"
							w="full"
							key={item?.id}
						>
							<Flex
								flex="1"
								gap="3"
								flexDir="column"
								mb="2"
							>
								<FormControl isInvalid={errors?.variants?.[nestIndex]?.options?.[k]?.label as any}>
									<FormLabel
										fontSize="sm"
										fontWeight="semibold"
									>
										Nhãn
									</FormLabel>
									<Input
										size="small"
										{...register(`variants.${nestIndex}.options.${k}.label`, {
											required: "Không được để trống",
										})}
										bgColor="transparent"
										placeholder="Thêm label nhãn mới"
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
										size="small"
										{...register(`variants.${nestIndex}.options.${k}.value`, {
											required: "Không được để trống",
										})}
										bgColor="transparent"
										placeholder="Thêm value nhãn mới"
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
							</Flex>
							<Flex
								display="flex"
								alignItems="center"
								justifyContent="center"
								cursor="pointer"
								onClick={() => remove(k)}
								w="4"
								bgColor="bg.admin"
								rounded="full"
							>
								<Flex
									w="full"
									h="4"
									mt="6"
									bgColor="bg.bgDelete"
									rounded="full"
									alignItems="center"
									justifyContent="center"
								>
									<CloseSmallIcon
										size={3}
										color="text.textDelete"
										strokeWidth={1.5}
									/>
								</Flex>
							</Flex>
						</Flex>
					);
				})}
			</Flex>
			<Button
				mt="4"
				bgColor="text.textSuccess"
				size="small"
				fontWeight="medium"
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
				templateColumns="repeat(1, 1fr)"
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
							<GridItem key={item.id}>
								<Flex
									// flexDir="column"
									bgColor="bg.gray"
									px="6"
									py="5"
									rounded="lg"
									position="relative"
									gap="6"
								>
									<Flex
										flex="1"
										justifyContent="flex-start"
									>
										<Flex
											gap="4"
											flexDir="column"
											w="full"
										>
											<SelectThinkPro
												title="Thuộc tính"
												control={control}
												name={`variants.${[index]}.name`}
												rules={{ required: "Không được để trống" }}
												placeholder="Màu, Phiên Bản, Loại Hàng"
												data={filterOptions}
											/>
										</Flex>
									</Flex>

									<Flex flex="2">
										{/* Thuộc tính lồng nhau */}
										<OptionNested
											nestIndex={index}
											control={control}
											register={register}
											errors={errors}
										/>
									</Flex>
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
										bgColor="bg.bgDelete"
										rounded="full"
									>
										<CloseSmallIcon
											size={4}
											color="text.textDelete"
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
				size="small"
				px="4"
				mt="4"
				leftIcon={<AddAdminIcon size={4} />}
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
