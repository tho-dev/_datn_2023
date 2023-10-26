import { Box, Flex, Text } from "@chakra-ui/react";
import { generateVariant } from "~/utils/fc";

type Props = {
	watch: any;
};

const Variants = ({ watch }: Props) => {
	const variants = generateVariant(watch("variants") || []);

	return (
		<Box>
			<Flex pb="4">
				<Text
					fontSize="sm"
					fontWeight="semibold"
				>
					({variants?.length}) biến thể
				</Text>
			</Flex>
			<Flex
				gap="1"
				justifyContent="space-between"
				flexDir="column"
			>
				{variants?.map((variant: any, index: number) => {
					const items = variant;
					return (
						<Flex
							key={index}
							w="full"
							alignItems="center"
							justifyContent="space-between"
							py="2"
							borderBottomWidth="1px"
							borderColor="bg.gray"
						>
							<Box>
								<Flex
									w="full"
									gap="2"
									alignItems="center"
								>
									{items?.map((i: any, k: number) => {
										return (
											i?.label && (
												<Text
													key={k}
													px="2"
													py="1"
													borderWidth="1px"
													borderColor="border.primary"
													fontSize="13px"
													rounded="4px"
													fontWeight="medium"
												>
													{i?.label}
												</Text>
											)
										);
									})}
								</Flex>
							</Box>

							<Box>
								{watch("SKU") && (
									<Text
										mt="1"
										fontSize="xs"
										fontWeight="semibold"
									>
										SKU: {`${watch("SKU")}-${index + 1}`}
									</Text>
								)}
							</Box>
						</Flex>
					);
				})}
			</Flex>
		</Box>
	);
};

export default Variants;
