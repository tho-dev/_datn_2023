import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box } from "@chakra-ui/layout";
import Banner from "./components/Banner";
import Category from "./components/Category";
import USP from "./components/USP";
import SuggestionProduct from "./components/SuggestionProduct";
import DiscountSection from './components/Discount'

type Props = {};

const HomeView = (props: Props) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>
					ThinkPro - Laptop, Phím cơ, Bàn nâng hạ, Ghế công thái học, PS5, Nintendo - Dịch vụ Tận tâm
				</title>
			</Helmet>
			<Box py="30px">
				{/* Banner */}
				<Banner />

				{/* Danh mục */}
				<Category title="Danh mục" />
				<DiscountSection title="Khuyến mãi"/>

				{/* USP */}
				<USP
					title="Chọn ThinkPro?"
					text="Chọn sự Thoải mái, An tâm vì sự Tận tâm"
				/>

				{/* Hàng gợi ý */}
				<SuggestionProduct title="Gợi ý cho bạn" />
			</Box>
		</HelmetProvider>
	);
};

export default HomeView;
