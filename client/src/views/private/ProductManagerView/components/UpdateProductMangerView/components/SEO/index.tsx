import { Box, Flex, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";

type Props = {
	register: any;
	errors: any;
};

const SEO = ({ register, errors }: Props) => {
	const [show, setShow] = useState<boolean>(true);

	return (
		<Box>
			<Box>
				<Checkbox
					defaultChecked
					onChange={(e) => setShow(e.target.checked)}
				>
					<Text
						fontSize="13px"
						fontWeight="semibold"
					>
						Thiết lập các thẻ mô tả giúp khách hàng dễ dàng tìm thấy danh mục này trên công cụ tìm kiếm như
						Google
					</Text>
				</Checkbox>
			</Box>
			{show && (
				<Flex
					mt="4"
					gap="5"
					flexDir="column"
				>
					<FormControl isInvalid={errors?.title as any}>
						<FormLabel
							htmlFor="title"
							fontSize="sm"
							fontWeight="semibold"
						>
							Tiêu đề trang
						</FormLabel>
						<Input
							id="title"
							{...register("seo.meta_title")}
							placeholder="Tiêu đề trang"
							borderColor={errors?.title && "red.200"}
						/>
						<FormErrorMessage>{(errors?.title as any) && errors?.title?.message}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors?.seo_description as any}>
						<FormLabel
							htmlFor="seo_description"
							fontSize="sm"
							fontWeight="semibold"
						>
							Mô tả trang
						</FormLabel>
						<Textarea
							id="meta_description"
							{...register("seo.meta_description")}
							placeholder="Mô tả trang"
							borderColor={errors?.seo_description && "red.200"}
						/>
						<FormErrorMessage>
							{(errors?.seo_description as any) && errors?.seo_description?.message}
						</FormErrorMessage>
					</FormControl>
				</Flex>
			)}
		</Box>
	);
};

export default SEO;
