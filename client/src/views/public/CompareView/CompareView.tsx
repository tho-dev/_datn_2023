import { Box } from "@chakra-ui/layout";
import ListCardCompare from "./components/ListCardCompare";
import ListTableCompare from "./components/ListTableCompare";
import { useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useCompareProductMutation } from "~/redux/api/product";
import LoadingPolytech from "~/components/LoadingPolytech";

const CompareView = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { items } = useAppSelector(
    (state: RootState) => state.persistedReducer.global
  );
  const [compareProduct, { isLoading }] = useCompareProductMutation();

  useEffect(() => {
    const fetchApi = async () => {
      const slugs = items?.map((item: any) => item?.slug);
      const response = await compareProduct({ slugs: slugs }).unwrap();
      setProducts(response?.data);
      navigate(`/so-sanh/${slugs.join("-vs-")}`);
    };

    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (isLoading) {
    return <LoadingPolytech />;
  }

  return (
    <Box py="6">
      <ListCardCompare items={items} />
      <ListTableCompare products={products} />
    </Box>
  );
};

export default CompareView;
