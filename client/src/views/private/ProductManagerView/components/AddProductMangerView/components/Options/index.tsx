import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import { AddAdminIcon, AppOptionIcon, TrashIcon } from "~/components/common/Icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import slugify from "react-slugify";

type Props = {
	register?: any;
	control?: any;
	errors?: any;
	watch?: any;
	setValue?: any;
	getValues?: any;
	resetField?: any;
};

const OptionNested = ({ nestIndex, control, register, errors, watch }: any) => {
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
				gap="3"
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
					const checkColor =
						slugify(watch(`variants.${[nestIndex]}.name.label`)) == "mau" ||
						slugify(watch(`variants.${[nestIndex]}.name.label`)) == "color";

					return (
						<Flex
							gap="4"
							w="full"
							key={item?.id}
							alignItems="flex-end"
						>
							<Flex
								flex="1"
								flexDir="column"
							>
								<Box>
									<FormLabel
										fontSize="sm"
										fontWeight="semibold"
									>
										Nhãn
									</FormLabel>
								</Box>
								<Flex gap="2">
									<FormControl isInvalid={errors?.variants?.[nestIndex]?.options?.[k]?.label as any}>
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
										<Flex
											alignItems="center"
											gap="4"
										>
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
												type={checkColor ? "color" : "text"}
												w={checkColor ? "40px" : "full"}
												p={checkColor ? "0" : "auto"}
											/>

											{checkColor && (
												<Text
													my="1"
													fontWeight="medium"
													fontSize="13px"
													px="2"
													py="1"
													rounded="2px"
													bgColor={watch(`variants.${nestIndex}.options.${k}.value`)}
													color="white"
													display="inline-block"
												>
													{watch(`variants.${nestIndex}.options.${k}.value`)}
												</Text>
											)}
										</Flex>

										<FormErrorMessage>
											{(errors?.variants?.[nestIndex]?.options?.[k]?.value as any) &&
												errors?.variants?.[nestIndex]?.options?.[k]?.value?.message}
										</FormErrorMessage>
									</FormControl>
								</Flex>
							</Flex>
							<Flex
								display="inline-flex"
								alignItems="center"
								justifyContent="center"
								cursor="pointer"
								onClick={() => remove(k)}
								rounded="md"
								bgColor="bg.bgDelete"
								w="10"
								h="10"
							>
								<TrashIcon
									size={5}
									strokeWidth={1.5}
									color="text.textDelete"
								/>
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
				Xong
			</Button>
		</Box>
	);
};

const Options = ({ control, register, errors, setValue, getValues, watch, resetField }: Props) => {
	const toast = useToast();
	const [show, setShow] = useState<boolean>(false);
	const { fields, append, remove, prepend, move } = useFieldArray({
		control,
		name: "variants",
	});

	const handleDrag = ({ source, destination }: any) => {
		if (destination) {
			move(source.index, destination.index);
			fields.map((item: any, index: number) => {
				setValue(`variants.${[index]}.position`, index);
			});
		}
	};

	return (
		<Box>
			<Checkbox onChange={(e) => setShow(e.target.checked)}>
				<Text
					fontSize="13px"
					fontWeight="semibold"
				>
					Sản phẩm này có nhiều biến thể. Ví dự như khác nhau về phiên bản, màu sắc
				</Text>
			</Checkbox>
			{show && (
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
						<DragDropContext onDragEnd={handleDrag}>
							<Droppable droppableId="test-items">
								{(provided, snapshot) => (
									<Box
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{fields.map((item, index) => {
											return (
												<Draggable
													key={`test[${index}]`}
													draggableId={`item-${index}`}
													index={index}
												>
													{(provided, snapshot) => (
														<GridItem
															key={item.id}
															ref={provided.innerRef}
															{...provided.draggableProps}
														>
															<Flex
																px="4"
																py="5"
																rounded="lg"
																gap="6"
																borderBottomWidth="1px"
																borderColor="border.primary"
															>
																<Flex
																	alignItems="center"
																	{...provided.dragHandleProps}
																>
																	<AppOptionIcon size={6} />
																</Flex>

																<Flex
																	flex="2"
																	gap="4"
																	w="full"
																	justifyItems="flex-end"
																	maxH="max-content"
																>
																	<Flex
																		w="full"
																		h="max-content"
																		gap="4"
																		alignItems="flex-end"
																	>
																		<Box flex="1">
																			<FormLabel
																				fontSize="sm"
																				fontWeight="semibold"
																			>
																				Thuộc tính
																			</FormLabel>
																			<Flex gap="2">
																				<FormControl
																					isInvalid={
																						errors?.variants?.[index].name
																							?.label
																					}
																				>
																					<Input
																						size="small"
																						{...register(
																							`variants.${[
																								index,
																							]}.name.label`,
																							{
																								required:
																									"Không được để trống",
																							}
																						)}
																						bgColor="transparent"
																						placeholder="Tên thuộc tính"
																						borderColor={
																							errors?.variants?.[index]
																								?.name?.label
																								? "border.error"
																								: "border.primary"
																						}
																					/>
																					<FormErrorMessage>
																						{(errors?.variants?.[index]
																							?.name?.label as any) &&
																							errors?.variants?.[index]
																								?.name?.label?.message}
																					</FormErrorMessage>
																				</FormControl>

																				{/* <FormControl
																					isInvalid={
																						errors?.variants?.[index].name
																							?.value
																					}
																				>
																					<Input
																						size="small"
																						{...register(
																							`variants.${[
																								index,
																							]}.name.value`,
																							{
																								required:
																									"Không được để trống",
																							}
																						)}
																						bgColor="transparent"
																						placeholder="Giá trị thuộc tính"
																						borderColor={
																							errors?.variants?.[index]
																								?.name?.value
																								? "border.error"
																								: "border.primary"
																						}
																					/>
																					<FormErrorMessage>
																						{(errors?.variants?.[index]
																							?.name?.value as any) &&
																							errors?.variants?.[index]
																								?.name?.value?.message}
																					</FormErrorMessage>
																				</FormControl> */}
																			</Flex>
																		</Box>

																		<Flex
																			display="inline-flex"
																			alignItems="center"
																			justifyContent="center"
																			cursor="pointer"
																			onClick={() => remove(index)}
																			rounded="md"
																			bgColor="bg.bgDelete"
																			w="10"
																			h="10"
																		>
																			<TrashIcon
																				size={5}
																				strokeWidth={1.5}
																				color="text.textDelete"
																			/>
																		</Flex>
																	</Flex>
																</Flex>

																<Flex flex="4">
																	{/* Thuộc tính lồng nhau */}
																	<OptionNested
																		nestIndex={index}
																		control={control}
																		register={register}
																		errors={errors}
																		watch={watch}
																	/>
																</Flex>
															</Flex>
														</GridItem>
													)}
												</Draggable>
											);
										})}

										{provided.placeholder}
									</Box>
								)}
							</Droppable>
						</DragDropContext>
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

							setValue("variants", [
								...(getValues().variants || []),
								{
									label: "",
									position: fields?.length,
									options: [{ label: "", value: "" }],
								},
							]);
						}}
					>
						Thêm thuộc tính khác
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default Options;
