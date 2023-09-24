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

const AttributeNested = ({ nestIndex, control, register, errors }: any) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `attributes.${nestIndex}.items`,
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
							<FormControl isInvalid={errors?.attributes?.[nestIndex]?.items?.[k]?.label as any}>
								<Input
									{...register(`attributes.${nestIndex}.items.${k}.label`, {
										required: "Không được để trống",
									})}
									placeholder="Kích thước/Cao tối đa lưng ghế,..."
									borderColor={
										errors?.attributes?.[nestIndex]?.items?.[k]?.label
											? "border.error"
											: "transparent"
									}
								/>
								<FormErrorMessage>
									{(errors?.attributes?.[nestIndex]?.items?.[k]?.label as any) &&
										errors?.attributes?.[nestIndex]?.items?.[k]?.label?.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors?.attributes?.[nestIndex]?.items?.[k]?.value as any}>
								<Input
									{...register(`attributes.${nestIndex}.items.${k}.value`, {
										required: "Không được để trống",
									})}
									placeholder="66cm, 55cm,..."
									borderColor={
										errors?.attributes?.[nestIndex]?.items?.[k]?.value
											? "border.error"
											: "transparent"
									}
								/>
								<FormErrorMessage>
									{(errors?.attributes?.[nestIndex]?.items?.[k]?.value as any) &&
										errors?.attributes?.[nestIndex]?.items?.[k]?.value?.message}
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

const Attributes = ({ control, register, errors, setValue, getValues }: Props) => {
	const { fields, append, remove, prepend } = useFieldArray({
		control,
		name: "attributes",
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
										<FormControl isInvalid={errors?.attributes?.[index]?.group_name as any}>
											<FormLabel
												fontSize="sm"
												fontWeight="semibold"
											>
												Chi tiết
											</FormLabel>
											<Input
												{...register(`attributes.${index}.group_name`, {
													required: "Không để trống",
												})}
												placeholder="Thiết kế, Kích thước & Trọng lượng, ..."
												borderColor={
													errors?.attributes?.[index]?.group_name
														? "border.error"
														: "transparent"
												}
											/>
											<FormErrorMessage>
												{(errors?.attributes?.[index]?.group_name as any) &&
													errors?.attributes?.[index]?.group_name?.message}
											</FormErrorMessage>
										</FormControl>
									</Flex>
								</Flex>

								{/* Thuộc tính lồng nhau */}
								<AttributeNested
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
					setValue("attributes", [
						...(getValues().attributes || []),
						{
							group_name: "",
							items: [{ label: "", value: "" }],
						},
					]);
				}}
			>
				Tạo đặc điểm
			</Button>
		</Box>
	);
};

export default Attributes;
