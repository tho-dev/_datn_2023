import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useState } from "react";
import {
	AddIcon,
	DashboardIcon,
	NewsFeedIcon,
	OrderIcon,
	ProfileIcon,
	SettingsIcon,
	WalletIcon,
} from "~/components/common/Icons";
import NavItem from "./components/NavItem";

type Props = {};

const MENU = [
	{
		title: "Dashboard",
		to: "/admin",
		icon: DashboardIcon,
	},
	{
		title: "Khuyến mãi",
		to: "/admin/khuyen-mai",
		icon: WalletIcon,
		children: [
			{ title: "Danh sách khuyến mãi", to: "/admin/khuyen-mai" },
			{ title: "Danh sách voucher", to: "/admin/coupon" },
			{ title: "Chiến dịch quảng cáo", to: "/admin/khuyen-mai/gmail" },
		],
	},
	{
		title: "Đơn hàng",
		to: "/admin/don-hang",
		icon: OrderIcon,
		children: [
			{ title: "Danh sách đơn hàng", to: "/admin/don-hang" },
			{ title: "Hàng hoàn", to: "/admin/don-hang/hang-hoan" },
		],
	},
	{
		title: "Sản phẩm",
		to: "/admin/san-pham",
		icon: AddIcon,
		children: [
			{ title: "Danh sách sản phẩm", to: "/admin/san-pham" },
			{ title: "Danh sách danh mục", to: "/admin/danh-muc" },
			{ title: "Danh sách thương hiệu", to: "/admin/thuong-hieu" },
			{ title: "Danh sách nhu cầu", to: "/admin/nhu-cau" },
		],
	},
	{
		title: "Bài viết",
		to: "/admin/bai-viet",
		icon: NewsFeedIcon,
		children: [
			{ title: "Danh sách bài viết", to: "/admin/bai-viet" },
			{ title: "Danh sách danh mục", to: "/admin/danh-muc-bai-viet" },
		],
	},
	{
		title: "Tài khoản",
		to: "/admin/tai-khoan",
		icon: ProfileIcon,
		children: [{ title: "Danh sách tài khoản", to: "/admin/tai-khoan" }],
	},
	{
		title: "Cấu hình",
		to: "/admin/cau-hinh",
		icon: SettingsIcon,
		children: [
			{ title: "Chung", to: "/admin/cau-hinh" },
			{ title: "Ngôn ngữ", to: "/admin/ngon-ngu" },
		],
	},
];

const Sidebar = (props: Props) => {
	const [active, setActive] = useState(0);

	return (
		<Flex
			w="full"
			h="full"
			maxWidth={{
				sm: "86px",
				md: "86px",
				lg: "260px",
				xl: "260px",
				"2xl": "260px",
			}}
			maxH="100vh"
			overflowY="auto"
			transition="all 0.25s ease"
			flexDir="column"
			justifyContent="space-between"
			borderRightWidth="1px"
			borderColor="bg.admin1"
			position="fixed"
			zIndex="999"
			overflow="hidden"
		>
			<Box
				w="full"
				h="full"
			>
				<Flex
					w="full"
					h="full"
					maxH={{
						sm: "64px",
						md: "64px",
						lg: "86px",
						xl: "86px",
						"2xl": "86px",
					}}
					alignItems="center"
					justifyContent="center"
					borderBottomWidth="1px"
					borderColor="bg.admin1"
					// backgroundColor="rgb(11 203 224)"
					bgGradient="linear-gradient(to left, rgb(11 203 224), #fff)"
				>
					<Heading
						as="h3"
						fontSize={{
							sm: "md",
							md: "md",
							lg: "3xl",
							xl: "3xl",
							"2xl": "3xl",
						}}
						bgGradient="linear-gradient(to right, rgb(11 203 224), #fff)"
						bgClip="text"
						// color="rgb(11 203 224)"
						fontWeight="bold"
					>
						Polytech
					</Heading>
				</Flex>
				<Flex
					gap="1"
					flexDir="column"
					mx="4"
					mt="12"
					mb="8"
				>
					{MENU?.map((item: any, index: number) => (
						<NavItem
							item={item}
							key={index}
							index={index}
							isCheck={active == index}
							handleClick={(value: any) => setActive(value)}
						/>
					))}
				</Flex>
			</Box>
		</Flex>
	);
};

export default Sidebar;
