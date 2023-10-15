import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useFieldArray } from "react-hook-form";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import { CloseSmallIcon, PlusIcon } from "~/components/common/Icons";

type Props = {
	register?: any;
	watch?: any;
	getValues?: any;
	setValue?: any;
	errors: any;
	control: any;
};

const Media = ({ register, watch, errors, setValue, getValues, control }: Props) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `assets`,
	});

	return (
		<Grid
			gap="4"
			minH="260px"
			templateColumns="repeat(12, 1fr)"
			pt="8"
		>
			<GridItem colSpan={4}>
				<Flex
					rounded="lg"
					w="full"
					h="full"
				>
					<FileUploadThinkPro
						getDataFn={(data) => setValue("")}
						fileName="thumbnail"
						setData={watch("thumbnail")}
					/>
				</Flex>
			</GridItem>
			<GridItem colSpan={8}>
				<Grid
					rounded="lg"
					w="full"
					h="full"
					gap="4"
					rowGap="10"
					templateColumns="repeat(5, 1fr)"
					templateRows="max-content"
				>
					{fields?.map((item, index) => {
						return (
							<Box
								key={index}
								pb="100%"
								position="relative"
							>
								<Box
									w="full"
									h="full"
									position="absolute"
									top="0"
									left="0"
								>
									<FileUploadThinkPro
										getDataFn={(data) => setValue(`assets.${index}`, data)}
										fileName="assets"
										setData={watch(`assets.${index}.url`)}
									/>
								</Box>
								<Flex
									w="4"
									h="4"
									rounded="full"
									position="absolute"
									top="-1"
									right="-1"
									zIndex="10"
									alignItems="center"
									justifyContent="center"
									bgColor="bg.bgDelete"
									cursor="pointer"
									onClick={() => remove(index)}
								>
									<CloseSmallIcon
										size={3}
										color="text.textDelete"
									/>
								</Flex>
							</Box>
						);
					})}
					<Flex
						pb="100%"
						position="relative"
					>
						<Flex
							w="full"
							h="full"
							position="absolute"
							rounded="lg"
							bgColor="bg.admin1"
							alignItems="center"
							justifyContent="center"
							cursor="pointer"
							onClick={() => {
								setValue("assets", [
									...(getValues().assets || []),
									{
										url: "",
										id: "",
									},
								]);
							}}
						>
							<PlusIcon
								size={8}
								strokeWidth={0.5}
								color="bg.black"
							/>
						</Flex>
					</Flex>
				</Grid>
			</GridItem>
		</Grid>
	);
};

export default Media;
