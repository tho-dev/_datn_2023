import { Box, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useState } from "react";
import logo from "~/assets/images/admin_logo.svg";
import {
	AddIcon,
	DashboardIcon,
	NewsFeedIcon,
	ProfileIcon,
	SettingsIcon,
	ShoppingCartIcon,
	WalletIcon,
} from "~/components/common/Icons";
import NavItem from "./components/NavItem";

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
			{ title: "Sản phẩm nổi bật", to: "/admin/khuyen-mai" },
			{ title: "Danh sách voucher", to: "/admin/coupon" },
			{ title: "Chiến dịch quảng cáo", to: "/admin/khuyen-mai/gmail" },
		],
	},
	{
		title: "Đơn hàng",
		to: "/admin/don-hang",
		icon: ShoppingCartIcon,
		children: [
			{ title: "Danh sách đơn hàng", to: "/admin/don-hang" },
			{ title: "Danh sách hàng hoàn", to: "/admin/don-hang/hang-hoan" },
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

const Sidebar = () => {
	const [active, setActive] = useState(0);

	return (
		<Flex
			w="full"
			maxWidth={{
				sm: "86px",
				md: "86px",
				lg: "260px",
				xl: "260px",
				"2xl": "260px",
			}}
			h="100vh"
			maxH="full"
			overflowY="auto"
			transition="all 0.25s ease"
			flexDir="column"
			justifyContent="space-between"
			position="fixed"
			zIndex="999"
			overflow="hidden"
			bgColor="#ffffff"
			borderRightWidth="1px"
			borderColor="#e9ecee"
			borderStyle="dashed"
			// borderTopRightRadius="32px"
			// borderBottomRightRadius="32px"
		>
			<Box
				w="full"
				h="full"
			>
				<Flex
					w="full"
					h="full"
					maxH="86px"
					alignItems="center"
					justifyContent="center"
					bgColor="#ffffff"
					// borderBottomWidth="1px"
					borderColor="#e9ecee"
					borderStyle="dashed"
				>
					<Image
						src={logo}
						w="full"
						h="full"
						aspectRatio="16/9"
						objectFit="contain"
						py="4"
					/>
				</Flex>
				<Flex
					gap="1"
					flexDir="column"
					mx="4"
					my="6"
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
