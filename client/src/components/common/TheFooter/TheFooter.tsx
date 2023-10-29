import React from "react";
import logo from "~/assets/images/logo-thinkpro.svg";
import dmca from "~/assets/images/dmca_protected_sml_120l.png";
import bo from "~/assets/images/bo-cong-thuong.png";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Text, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import Store from "./components/Store";
import Sections from "./components/Sections";

type Props = {};

const TheFooter = (props: Props) => {
	return (
		<Box
			px="4"
			py="6"
		>
			<Image src={logo} />
			{/* Hệ thống cửa hàng */}
			<Store title="Hệ thống cửa hàng" />

			{/* Chính sách, social network */}
			<Sections title="Polytech" />

			{/* Thương hiệu & bản quyền */}
			<Box>
				<hr
					style={{
						margin: "36px 0 24px 0",
					}}
				/>
				<Box fontSize="xs">
					<Text>© ThinkPro 2023</Text>
					<Text>
						Công ty TNHH Công nghệ Think Việt Nam - GPĐKKD: 0107273909 do sở KH & ĐT TP Hà Nội cấp ngày
						09/03/2020
					</Text>
					<Text>
						Địa chỉ: 105/562 Đường Láng, Phường Láng Hạ, Quận Đống Đa, Hà Nội. Điện thoại: 1900633579
					</Text>
				</Box>
				<Flex
					mt="5"
					gap="3"
				>
					<Link
						to="/"
						as={ReactRouterLink}
					>
						<Image
							src={dmca}
							h="6"
						/>
					</Link>
					<Link
						to="/"
						as={ReactRouterLink}
					>
						<Image
							src={bo}
							h="6"
						/>
					</Link>
				</Flex>
			</Box>
		</Box>
	);
};

export default TheFooter;
