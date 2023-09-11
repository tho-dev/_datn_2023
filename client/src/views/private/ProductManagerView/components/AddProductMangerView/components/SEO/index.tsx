import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";

type Props = {
	register: any;
	errors: any;
};

const SEO = ({ register, errors }: Props) => {
	return (
		<Flex
			flexDir="column"
			gap="5"
		>
			<FormControl isInvalid={errors?.title as any}>
				<FormLabel
					htmlFor="title"
					fontSize="sm"
					fontWeight="semibold"
				>
					Title
					<Text
						as="span"
						fontSize="xs"
						ml="1"
						color="#8c98a4"
						fontWeight="medium"
					>
						(không bắt buộc)
					</Text>
				</FormLabel>
				<Input
					id="title"
					{...register("title")}
					placeholder="meta title"
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
					Description
					<Text
						as="span"
						fontSize="xs"
						ml="1"
						color="#8c98a4"
						fontWeight="medium"
					>
						(không bắt buộc)
					</Text>
				</FormLabel>
				<Textarea
					id="seo_description"
					{...register("seo_description")}
					placeholder="meta description"
					borderColor={errors?.seo_description && "red.200"}
				/>
				<FormErrorMessage>
					{(errors?.seo_description as any) && errors?.seo_description?.message}
				</FormErrorMessage>
			</FormControl>
		</Flex>
	);
};

export default SEO;
