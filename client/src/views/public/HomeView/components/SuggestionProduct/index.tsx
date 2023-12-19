import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/layout";
import ListThinkPro from "~/components/ListThinkPro";
import ScrollableThinkPro from "~/components/ScrollableThinkPro";
import { useGetProducItemToBrandAndCategoryQuery } from "~/redux/api/collection";

type Props = {
  title?: string;
  items?: any;
};

const SuggestionProduct = ({ title, items }: Props) => {
  const [active, setActive] = useState<any>();

  const { data: products, isFetching } =
    useGetProducItemToBrandAndCategoryQuery(
      {
        _category: active?.value,
        _limit: 15,
        _order: "asc",
        _page: 1,
        _sort: "created_at",
      },
      {
        skip: !active,
      }
    );

  useEffect(() => {
    setActive(items?.[1]);
  }, []);

  return (
    <Box mt="12">
      <Heading as="h2" fontSize="28px">
        {title}
      </Heading>
      {/* Danh mục */}
      <ScrollableThinkPro
        isArrow
        items={items}
        nextEl="btn-next--crollable"
        prevEl="btn-prev--crollable"
        handleClick={(doc: any) => setActive(doc)}
      />
      {/* Danh sách sản phẩm */}
      <ListThinkPro
        columns={5}
        data={products?.data?.items}
        loading={isFetching}
      />
    </Box>
  );
};

export default SuggestionProduct;
