import React from "react";
import Card from "../Card";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/layout";
import {
	BounceRightIcon,
	GlobalIcon,
	MoneyIcon,
	WaletIcon,
	QRCodeIcon,
	SearchIcon,
	CheckIcon,
	InfoIcon,
	ScanQRCodeIcon,
	ShieldIcon,
	TrunkIcon,
	ShoppingIcon,
	FacebookIcon,
	TiktokIcon,
	YoutubeIcon,
	InstagramIcon,
} from "~/components/common/Icons";

type Props = {
	title?: string;
};

// Đa dạng thanh toán
const payment: any[] = [
	{
		title: "Chuyển khoản",
		icon: BounceRightIcon,
		link: null,
	},
	{
		title: "Tiền mặt",
		icon: MoneyIcon,
		link: null,
	},
	{
		title: "VNPay",
		icon: QRCodeIcon,
		link: null,
	},
	{
		title: "VietQR",
		icon: QRCodeIcon,
		link: null,
	},
	{
		title: "Thẻ ATM",
		icon: WaletIcon,
		link: null,
	},
	{
		title: "Thẻ quốc tế",
		icon: GlobalIcon,
		link: null,
	},
];

// Thông tin hữu ích
const posts: any[] = [
	{
		title: "Chính sách bảo hàng",
		icon: CheckIcon,
		link: "chuyen-khoan",
	},
	{
		title: "Chính sách đổi trả",
		icon: BounceRightIcon,
		link: "chuyen-khoan",
	},
	{
		title: "Chính sách vận chuyển",
		icon: TrunkIcon,
		link: "chuyen-khoan",
	},
	{
		title: "Chính sách bảo mật",
		icon: ShieldIcon,
		link: "chuyen-khoan",
	},
	{
		title: "Chính sách thanh toán",
		icon: WaletIcon,
		link: "chuyen-khoan",
	},
	{
		title: "Chính sách kiểm hàng",
		icon: ScanQRCodeIcon,
		link: "chuyen-khoan",
	},
	{
		title: "Hướng dẫn mua hàng online",
		icon: ShoppingIcon,
		link: "chuyen-khoan",
	},
	{
		title: "Về chúng tôi",
		icon: InfoIcon,
		link: "chuyen-khoan",
	},
];

// Mạng xã hội
const social: any[] = [
	{
		title: "Facebook",
		icon: FacebookIcon,
		link: "https://facebook.com",
	},
	{
		title: "Youtube",
		icon: YoutubeIcon,
		link: "https://youtube.com",
	},
	{
		title: "Tiktok",
		icon: TiktokIcon,
		link: "https://tiktok.com",
	},
	{
		title: "Instagram",
		icon: InstagramIcon,
		link: "https://instagram.com",
	},
];

const Sections = ({ title }: Props) => {
	return (
		<Box mt="6">
			<Heading
				as="h2"
				fontSize="xl"
				color="text.black"
				fontWeight="semibold"
			>
				{title}
			</Heading>
			<Grid
				mt="4"
				gap="3"
				templateColumns={{
					sm: "repeat(1, 1fr)",
					md: "repeat(2, 1fr)",
					xl: "repeat(4, 1fr)",
				}}
			>
				<GridItem>
					<Card
						title="Đa dạng thanh toán"
						items={payment}
					/>
				</GridItem>
				<GridItem>
					<Card
						title="Thông tin hữu ích"
						items={posts}
					/>
				</GridItem>
				<GridItem>
					<Card
						title="Social networks"
						items={social}
					/>
				</GridItem>
				<GridItem>
					<Card
						title="Phản hồi, góp ý, khiếu nại"
						items={[]}
					/>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default Sections;
