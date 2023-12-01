import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import welcome_back from "~/assets/images/welcome_back.svg";
import TopRevenue from "./components/TopRevenue";
import { useGetDashboardQuery, useGetRevenueStatisticsQuery } from "~/redux/api/general";
import { useForm, useWatch } from "react-hook-form";
import { useMemo, useState } from "react";
import TopChaper from "./components/TopChaper";

const DashboardView = () => {
	const { data } = useGetDashboardQuery({});
	const [query, setQuery] = useState({
		period: "week",
	});

	const { data: revenues } = useGetRevenueStatisticsQuery(query);

	return (
		<Box
			w="full"
			h="full"
			pb="60px"
		>
			<Flex
				gap="6"
				h="360px"
			>
				<Box
					flex="1"
					px="10"
					py="8"
					h="320px"
					maxH="full"
					rounded="2xl"
					display="flex"
					justifyContent="flex-start"
					alignItems="center"
					bgColor="#0bcbe01a"
					gap="6"
				>
					<Box flex="1">
						<Heading
							fontSize="xl"
							color="rgb(11 203 224)"
							fontWeight="semibold"
						>
							Hi, Welcome back 👋
						</Heading>
						<Text
							mt="4"
							fontSize="sm"
							color="rgb(11 203 224)"
							fontWeight="medium"
						>
							Polytech - Laptop, Phím cơ, Bàn nâng hạ, Ghế công thái học, PS5, Nintendo - Dịch vụ Tận tâm.
							<br />
							<Text
								as="span"
								mt="1"
								display="inline-block"
							>
								Chuỗi cửa hàng chuyên Máy tính xách tay (Laptop), Bàn phím cơ, Bàn ghế Công thái học,
								Máy chơi game, PS5, Nintendo - Dịch vụ Tận tâm, đội ngũ tư vấn được đào tạo kỹ lưỡng, có
								chuyên môn.
							</Text>
						</Text>
					</Box>
					<Box
						w="full"
						maxW="460px"
						h="full"
						position="relative"
					>
						<Image
							src={welcome_back}
							w="full"
							h="full"
							objectFit="contain"
						/>

						<Box
							position="absolute"
							top="0"
							right="0"
							w="60%"
							h="full"
						>
							<Image
								w="full"
								h="full"
								src="https://minimals.cc/assets/illustrations/characters/character_2.png"
								objectFit="contain"
								aspectRatio="16/9"
							/>
						</Box>
					</Box>
				</Box>
			</Flex>

			<Flex h="500px">
				<Box flex="1">
					<TopRevenue
						revenues={revenues}
						handleClick={(x: string) =>
							setQuery({
								period: x,
							})
						}
					/>
				</Box>
			</Flex>
			<Flex
				mt="6"
				h="420px"
				gap="6"
			>
				<Box flex="1">
					<TopChaper data={data} />
				</Box>
			</Flex>
		</Box>
	);
};

export default DashboardView;
