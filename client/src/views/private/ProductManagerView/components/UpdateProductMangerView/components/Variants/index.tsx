import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { formatNumber } from "~/utils/fc";
import { Link as ReactRouterLink } from "react-router-dom";
import image from "~/assets/images/image.png";

type Props = {
	watch: any;
	variants: any;
};

const Variants = ({ variants }: Props) => {
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
					const items = variant?.option_value;
					return (
						<Flex
							key={index}
							as={ReactRouterLink}
							to={`/admin/san-pham/${variant?.product_id}/bien-the/${variant?._id}`}
							w="full"
							gap="4"
							alignItems="center"
							justifyContent="space-between"
							py="3"
							borderBottomWidth="1px"
							borderColor="bg.gray"
						>
							<Box
								w="64px"
								h="64px"
								bgColor="bg.gray"
								rounded="md"
								overflow="hidden"
							>
								<Image
									src={variant?.image?.url ? variant?.image?.url : image}
									w="full"
									h="full"
									objectFit="contain"
									p="1"
								/>
							</Box>
							<Flex
								flex="1"
								flexDir="column"
							>
								<Flex
									gap="2"
									alignItems="center"
								>
									{items?.map((i: any, k: number) => {
										return (
											<Text
												key={k}
												fontSize="13px"
												rounded="4px"
												fontWeight="medium"
												px="2"
												py="1"
												borderWidth="1px"
												borderColor="border.primary"
											>
												{i?.label}
											</Text>
										);
									})}
								</Flex>
								<Text
									mt="1"
									fontSize="13px"
									fontWeight="semibold"
								>
									SKU: {variant?.SKU}
								</Text>
							</Flex>

							<Box>
								<Text
									fontSize="sm"
									fontWeight="semibold"
									px="1"
								>
									{formatNumber(`${variant?.price_before_discount} `)}VND
								</Text>
							</Box>
						</Flex>
					);
				})}
			</Flex>
		</Box>
	);
};

export default Variants;
