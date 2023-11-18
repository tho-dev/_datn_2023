import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box, Input } from "@chakra-ui/react";
import Banner from "./components/Banner";
import Category from "./components/Category";
import USP from "./components/USP";
import SuggestionProduct from "./components/SuggestionProduct";
import DiscountSection from "./components/Discount";
import { useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";

type Props = {};

const HomeView = (props: Props) => {
	const { homeSettings } = useAppSelector((state: RootState) => state.persistedReducer.global);

	return (
		<HelmetProvider>
			<Helmet>
				<title>
					PolyTech - Laptop, Phím cơ, Bàn nâng hạ, Ghế công thái học, PS5, Nintendo - Dịch vụ Tận tâm
				</title>
			</Helmet>
			<Box py="30px">
				{/* Banner */}
				<Banner banner={homeSettings?.general} />

				<DiscountSection title="Khuyến mãi" />

				{/* Danh mục */}
				<Category
					title={homeSettings?.category?.title}
					items={homeSettings?.category?.items}
				/>

				{/* USP */}
				<USP
					title="Chọn PolyTech?"
					text="Chọn sự Thoải mái, An tâm vì sự Tận tâm"
				/>

				{/* Hàng gợi ý */}
				<SuggestionProduct
					title={homeSettings?.suggestion?.title}
					items={homeSettings?.suggestion?.tags}
				/>
			</Box>
		</HelmetProvider>
	);
};

export default HomeView;
