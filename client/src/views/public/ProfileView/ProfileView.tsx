import { Box, Center, Flex, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import LoadingPolytech from "~/components/LoadingPolytech";
import { BellIcon, CheckedIcon, ShoppingCartIcon, UserIcon } from "~/components/common/Icons";
import { useGetOneQuery } from "~/redux/api/user";
import { useAppSelector } from "~/redux/hook/hook";
import ChangePassword from "./components/ChangePassword";
import Info from "./components/Info";
import { InforOrder } from "./components/InforOrder";
import premium from "~/assets/images/premium.svg";

type Props = {};

const ProfileView = (props: Props) => {
	const { user } = useAppSelector((state) => state.persistedReducer.global);
	const id = user._id;
	const { data, isFetching } = useGetOneQuery(id);

	if (isFetching) {
		return <LoadingPolytech />;
	}

	return (
		<Box
			my="6"
			px="6"
			py="8"
			rounded="xl"
			bgColor="bg.white"
		>
			<Flex
				justifyContent="space-between"
				alignItems="center"
			>
				<Heading
					py="4"
					color="text.black"
					fontSize="lg"
					textTransform="uppercase"
				>
					Thông tin tài khoản ✨🎉✨
				</Heading>
			</Flex>
			<Flex my="2">
				<Tabs
					w="full"
					position="relative"
					variant="unstyled"
				>
					<Flex gap="6">
						<Box
							py="8"
							px="6"
							rounded="xl"
							borderWidth="1px"
							borderColor="#eef1f6"
							boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
						>
							<Flex
								alignItems="center"
								gap="3"
							>
								<Box position="relative">
									<Image
										p="1"
										rounded="full"
										boxSize="64px"
										src={data?.data?.avatar?.url}
										objectFit="cover"
										alt="Dan Abramov"
										border="1px solid #eef1f6"
									/>

									<Center
										as="span"
										w="4"
										h="4"
										zIndex="1"
										position="absolute"
										top="-1"
										right="-1"
										color="white"
										rounded="sm"
										css={{
											backgroundImage: "linear-gradient(90deg,#ad88fc,#65b2fc);",
											transform: "rotate(45deg)",
										}}
									>
										<Image src={premium} />
									</Center>
								</Box>
								<Box>
									<Text
										fontSize="13px"
										fontWeight="semibold"
									>
										{data?.data?.first_name + " " + data?.data?.last_name}
									</Text>
									<Text
										fontSize="13px"
										fontWeight="semibold"
									>
										{data?.data?.email}
									</Text>
								</Box>
							</Flex>
							<Box
								my="3"
								h="1px"
								bgColor="#eef1f6"
								boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
							/>
							<TabList
								px="1"
								display="flex"
								flexDir="column"
								alignItems="flex-start"
							>
								<Tab
									px="0"
									display="inline-flex"
									gap="2"
								>
									<Flex
										w="6"
										h="6"
										bg="bg.bgEdit"
										color="text.textEdit"
										rounded="full"
										alignItems="center"
										justifyContent="center"
										fontSize="10px"
									>
										<UserIcon size={4} />
									</Flex>
									<Text
										fontSize="13px"
										fontWeight="semibold"
										color="text.black"
									>
										Tài Khoản
									</Text>
								</Tab>
								<Tab
									px="0"
									fontSize="13px"
									fontWeight="semibold"
									display="inline-flex"
									gap="2"
								>
									<Flex
										w="6"
										h="6"
										bg="bg.bgEdit"
										color="text.textEdit"
										rounded="full"
										alignItems="center"
										justifyContent="center"
										fontSize="10px"
									>
										<CheckedIcon size={3} />
									</Flex>
									<Text
										fontSize="13px"
										fontWeight="semibold"
										color="text.black"
									>
										Mật Khẩu
									</Text>
								</Tab>
								<Tab
									px="0"
									fontSize="13px"
									fontWeight="semibold"
									display="inline-flex"
									gap="2"
								>
									<Flex
										w="6"
										h="6"
										bg="bg.bgEdit"
										color="text.textEdit"
										rounded="full"
										alignItems="center"
										justifyContent="center"
										fontSize="10px"
									>
										<ShoppingCartIcon size={4} />
									</Flex>
									<Text
										fontSize="13px"
										fontWeight="semibold"
										color="text.black"
									>
										Đơn Mua
									</Text>
								</Tab>
								<Tab
									px="0"
									fontSize="13px"
									fontWeight="semibold"
									display="inline-flex"
									gap="2"
								>
									<Flex
										w="6"
										h="6"
										bg="bg.bgEdit"
										color="text.textEdit"
										rounded="full"
										alignItems="center"
										justifyContent="center"
										fontSize="10px"
									>
										<BellIcon size={4} />
									</Flex>
									<Text
										fontSize="13px"
										fontWeight="semibold"
										color="text.black"
									>
										Thông Báo
									</Text>
								</Tab>
							</TabList>
						</Box>

						<Box flex="1">
							<TabPanels>
								{/* Thay đổi thông tin người dùng */}
								<TabPanel
									p="0"
									w="full"
								>
									<Info user={data?.data} />
								</TabPanel>
								{/* Thay đổi mật khẩu */}
								<TabPanel p="0">
									<ChangePassword user={data?.data} />
								</TabPanel>
								{/* Chat */}
								<TabPanel p="0">
									<InforOrder />
								</TabPanel>
							</TabPanels>
						</Box>
					</Flex>
				</Tabs>
			</Flex>
		</Box>
	);
};

export default ProfileView;
