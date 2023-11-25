import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CheckboxGroup,
  Flex,
  FormLabel,
  Grid,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  Switch,
  Text,
} from "@chakra-ui/react";
import Title from "./components/Title";
import FilterProduct from "./components/Filter";
import {
  useGetProducItemToBrandAndCategoryQuery,
  useGetFilterBrandAndCategoryQuery,
} from "~/redux/api/collection";
import ListThinkPro from "~/components/ListThinkPro";
import { ArrowUpIcon } from "~/components/common/Icons";
import { useParams, useNavigate } from "react-router";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDebounce } from "@uidotdev/usehooks";
import LoadingPolytech from "~/components/LoadingPolytech";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { setIsCompare, setItems } from "~/redux/slices/globalSlice";
import { RootState } from "~/redux/store";

const SlugView = () => {
  const { slug: params } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isCompare } = useAppSelector(
    (state: RootState) => state.persistedReducer.global
  );

  const [data, setData] = useState<any>([]);
  const [query, setQuery] = useState<any>({
    _page: 1,
    _limit: 45,
    _order: "desc",
    _sort: "created_at",
    _category: "",
  });
  const debouncedQuery = useDebounce(query, 600);

  const { control, register, setValue, watch } = useForm<any>();
  const { fields } = useFieldArray({
    control,
    name: "filters",
  });

  const wathFilters = useWatch({
    control,
    name: "filters",
  });

  const {
    data: filters,
    isFetching: isFetchingFilter,
    isLoading: isLoadingFilter,
  } = useGetFilterBrandAndCategoryQuery(
    {
      _slug: debouncedQuery?._category,
    },
    { skip: !debouncedQuery?._category }
  );

  const {
    data: products,
    isFetching,
    isError,
  } = useGetProducItemToBrandAndCategoryQuery(debouncedQuery, {
    skip: !debouncedQuery?._category,
  });

  useEffect(() => {
    if (params) {
      setQuery({
        ...query,
        _category: params,
      });
      dispatch(setItems([]));
    }
  }, [params]);

  useEffect(() => {
    if (products) {
      const docs = products?.data?.items as any;
      setData(docs);
    }
  }, [products]);

  useEffect(() => {
    if (filters) {
      setValue("filters", filters?.data?.filters);
    }
  }, [filters]);

  useEffect(() => {
    if (wathFilters) {
      // bộ lọc
      const filterArray = watch("filters");
      const array = filterArray.map((item: any) => {
        const options = item?.options?.filter((option: any) => option.checked);
        const results = options?.map((option: any) => option.value).join(",");

        return {
          key: `_${item?.name}`,
          value: results,
        };
      });

      const filterReduce = array
        .filter((item: any) => item?.value)
        .reduce((acc: any, cur: any) => {
          const key = cur.key;
          acc[key] = cur.value;
          return acc;
        }, {});

      // setData([]);
      setQuery({
        ...query,
        ...filterReduce,
      });
    }
  }, [wathFilters]);

  const handleCompare = (e: any) => {
    dispatch(setIsCompare(e.target.checked as any));
  };
  if (isLoadingFilter) {
    return <LoadingPolytech />;
  }
  if (isFetchingFilter) return <LoadingPolytech />;

  if (isError) navigate("/404");

  return (
    <Box m="30px 0">
      <Title filters={filters?.data} />

      <Grid
        gap="4"
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          xl: `repeat(4, 1fr)`,
        }}
        w={{
          sm: "100%",
          xl: "70%",
        }}
      >
        {fields?.map((item: any, index: number) => {
          return (
            <FilterProduct
              key={item.id}
              title={item?.label}
              name={item?.name}
              data={item?.options}
              control={control}
              watch={watch}
              nested={index}
              register={register}
            />
          );
        })}
      </Grid>

      <Box m="30px 0">
        <Flex w="100%" justifyContent="space-between" m="30px 0">
          <Flex alignItems="center" gap={2}>
            <Switch size="md" onChange={handleCompare} isChecked={isCompare} />
            <FormLabel htmlFor="isChecked" fontSize="sm" marginTop={2}>
              So sánh
            </FormLabel>
          </Flex>

          <Box>
            <Popover isLazy>
              <PopoverTrigger>
                <Button
                  bgColor="bg.white"
                  color="black"
                  fontSize="xs"
                  fontWeight="semibold"
                  rightIcon={<ArrowUpIcon size={4} />}
                  padding="3"
                  rounded="lg"
                >
                  Sắp xếp : Nổi bật nhất
                </Button>
              </PopoverTrigger>
              <PopoverContent maxW="200px">
                <PopoverHeader fontWeight="medium">
                  <Flex maxW="200px" flexDir="column" gap="2">
                    <CheckboxGroup value={[1, 2, 3]}>
                      <Box w="full">
                        <Radio defaultChecked value="1">
                          <Text fontSize="sm">Nổi bật nhất</Text>
                        </Radio>
                      </Box>
                      <Box w="full">
                        <Radio
                          value="2"
                          onClick={() =>
                            setQuery({
                              ...query,
                              _order: "asc",
                              _sort: "price",
                            })
                          }
                        >
                          <Text fontSize="sm">Giá thấp -&gt; cao</Text>
                        </Radio>
                      </Box>
                      <Box w="full">
                        <Radio
                          value="3"
                          onClick={() =>
                            setQuery({
                              ...query,
                              _order: "desc",
                              _sort: "price",
                            })
                          }
                        >
                          <Text fontSize="sm">Giá thấp -&gt; cao</Text>
                        </Radio>
                      </Box>
                    </CheckboxGroup>
                  </Flex>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>

        {/* danh sách sản phẩm */}
        <ListThinkPro data={data} loading={isFetching} />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m="10px 0"
      >
        {data?.length > 0 && (
          <Button
            bgColor="bg.white"
            color="bg.blue"
            width="30%"
            fontWeight="semibold"
            fontSize="md"
            size="lager"
            onClick={() => {
              if (products?.data?.paginate?.hasNextPage) {
                setQuery({
                  ...query,
                  _page: products?.data?.paginate?.nextPage,
                });
              }
            }}
            _hover={{ bg: "gray.300" }}
          >
            Xem thêm
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SlugView;
