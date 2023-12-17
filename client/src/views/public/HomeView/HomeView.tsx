import { Box } from "@chakra-ui/react";
import Banner from "./components/Banner";
import Category from "./components/Category";
import USP from "./components/USP";
import SuggestionProduct from "./components/SuggestionProduct";
import DiscountSection from "./components/Discount";
import { useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";

const HomeView = () => {
  const { homeSettings } = useAppSelector(
    (state: RootState) => state.persistedReducer.global
  );

  return (
    <>
      <Box py="30px">
        {/* Banner */}
        <Banner banner={homeSettings?.general} />

        <DiscountSection title="Sản phẩm nổi bật 🤩🤩🤩" />

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
    </>
  );
};

export default HomeView;
