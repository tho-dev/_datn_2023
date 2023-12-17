/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import {
  EditIcon,
  ExcelIcon,
  PlusCircleIcon,
  SearchIcon,
  TraskIcon,
} from "~/components/common/Icons";
import {
  useGetAllProductQuery,
  useDeleteProductMutation,
} from "~/redux/api/product";
import { formatNumber, objectToUrlParams } from "~/utils/fc";
import moment from "moment/moment";
import SelectThinkPro from "~/components/SelectThinkPro";
import { useForm, useWatch } from "react-hook-form";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import { useGetAllBrandsQuery } from "~/redux/api/brand";
import { useDebounce } from "@uidotdev/usehooks";

const ProductManagerView = () => {
  const toast = useToast();
  const [id, setID] = useState<any>(null);
  const [brandsFilter, setBrandsFilter] = useState<any>([]);
  const [categoriesFilter, setCategoriesFilter] = useState<any>([]);

  const columnHelper = createColumnHelper<any>();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const { control, register, setValue } = useForm({
    defaultValues: {
      name: "",
      category: "",
      brand: "",
      status: {
        label: "Đang bán",
        value: "true",
      },
    },
  });

  const nameForm = useWatch({
    control,
    name: "name",
  });
  const categoryForm: any = useWatch({
    control,
    name: "category",
  });
  const brandForm: any = useWatch({
    control,
    name: "brand",
  });
  const statusForm: any = useWatch({
    control,
    name: "status",
  });

  const query = useMemo(() => {
    return {
      _page: 1,
      _limit: 20,
      _order: "asc",
      _sort: "created_at",
      _name: nameForm,
      _category: categoryForm?.value,
      _brand: brandForm?.value,
      _status: JSON.parse(statusForm?.value || ""),
    };
  }, [nameForm, categoryForm?.value, brandForm?.value, statusForm]);
  const debounceQuery = useDebounce(query, 500);

  const { data: brands } = useGetAllBrandsQuery(
    {
      _limit: 100,
      _page: 1,
      _sort: "created_at",
      _order: "desc",
      _category: categoryForm?.value as string,
    },
    {
      skip: !categoryForm?.value,
    }
  );

  const { data: categories } = useGetAllCategoryQuery({
    _limit: 30,
    _page: 1,
    _sort: "created_at",
    _order: "asc",
    _type: "category_brand",
  });

  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (brands) {
      setValue("brand", "");
      const brandsRes = brands?.data?.items?.map((brand: any) => {
        return {
          label: brand?.name,
          value: brand?._id,
        };
      });
      setBrandsFilter(brandsRes);
    }
  }, [brands, categoryForm?.value]);

  useEffect(() => {
    if (categories) {
      const categoriesFilter = categories?.data?.items?.map((brand: any) => {
        return {
          label: brand?.name,
          value: brand?._id,
        };
      });

      setCategoriesFilter(categoriesFilter);
    }
  }, [categories]);

  const handleDownloadExcel = async () => {
    const customQuery = {
      _name: nameForm,
      _category: categoryForm?.value,
      _brand: brandForm?.value,
      _status: JSON.parse(statusForm?.value || ""),
    };

    fetch(
      process.env.VITE_API_URL +
        `/product/export-excel?${objectToUrlParams(customQuery)}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "file_products.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error("Lỗi tải xuống tệp:", error));
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct({ product_id: id } as any).unwrap();
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Xóa sản phẩm thành công",
      });
    } catch (error: any) {
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: JSON.stringify(error?.data?.errors),
      });
    }

    onCloseConfirm();
  };

  const columns = [
    columnHelper.accessor("#", {
      cell: ({ table, row }) => {
        const index = row.index + 1;
        const { pageIndex, pageSize } = table.getState().pagination;

        return (
          <Text fontSize="13px" fontWeight="medium">
            {pageIndex * pageSize + index}
          </Text>
        );
      },
      header: "#",
    }),
    columnHelper.accessor("name", {
      cell: ({ getValue }) => {
        return (
          <Text fontSize="13px" fontWeight="medium">
            {getValue()}
          </Text>
        );
      },
      header: "Sản phẩm",
    }),
    columnHelper.accessor("category", {
      cell: ({ getValue }) => {
        return (
          <Text fontSize="13px" fontWeight="medium">
            {getValue()}
          </Text>
        );
      },
      header: "Danh mục",
    }),
    columnHelper.accessor("brand", {
      cell: ({ getValue }) => {
        return (
          <Text fontSize="13px" fontWeight="medium">
            {getValue()}
          </Text>
        );
      },
      header: "Thương hiệu",
    }),
    columnHelper.accessor("image", {
      cell: ({ getValue }) => (
        <Image
          w="64px"
          h="64px"
          p="2"
          objectFit="contain"
          src={getValue()}
          alt={getValue()}
          bgColor="bg.gray"
          rounded="md"
        />
      ),
      header: "Ảnh",
    }),
    columnHelper.accessor("price_before_discount", {
      cell: ({ getValue }) => (
        <Text fontSize="13px" fontWeight="medium">
          {formatNumber(`${getValue()}`)}
        </Text>
      ),
      header: "Giá gốc",
    }),
    columnHelper.accessor("colors", {
      cell: ({ getValue }) => {
        const colors = getValue();
        return (
          <Flex gap="2">
            {colors?.map((color: any, index: number) => {
              return (
                <Box
                  key={index}
                  w="14px"
                  h="14px"
                  bgColor={color.value}
                  rounded="2px"
                />
              );
            })}
          </Flex>
        );
      },
      header: "Màu sắc",
    }),
    columnHelper.accessor("status", {
      cell: ({ getValue }) => (
        <Text>
          {getValue() ? (
            <Box
              display="inline-block"
              px="2"
              py="1"
              fontSize="xs"
              fontWeight="semibold"
              bgColor="bg.bgSuccess"
              color="text.textSuccess"
              rounded="4px"
            >
              Đang Bán
            </Box>
          ) : (
            <Box
              display="inline-block"
              px="2"
              py="1"
              fontSize="xs"
              fontWeight="semibold"
              bgColor="bg.bgDelete"
              color="text.textDelete"
              rounded="md"
            >
              Ngừng Bán
            </Box>
          )}
        </Text>
      ),
      header: "Trạng thái",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => (
        <Text fontWeight="medium" fontSize="13px">
          {moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS")}
        </Text>
      ),
      header: "Ngày tạo",
    }),
    columnHelper.accessor("updated_at", {
      cell: (info) => (
        <Text fontWeight="medium" fontSize="13px">
          {moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS")}
        </Text>
      ),
      header: "Ngày cập nhật",
    }),
    columnHelper.accessor("action", {
      cell: ({ row }) => {
        return (
          <Menu>
            <MenuButton textAlign="center">
              <Text
                fontSize="18"
                fontWeight="semibold"
                textAlign="center"
                ml={3}
              >
                ...
              </Text>
            </MenuButton>
            <MenuList w="100px">
              <MenuItem
                py="2"
                icon={<TraskIcon size={4} />}
                onClick={async () => {
                  setID(row?.original?._id);
                  onOpenConfirm();
                }}
              >
                Xóa
              </MenuItem>
              {/* <MenuItem
								py="2"
								icon={<AirplayIcon size={4} />}
							>
								Preview
							</MenuItem> */}
              <MenuItem
                as={ReactRouterLink}
                to={`/admin/san-pham/${row?.original?._id}/update`}
                py="2"
                icon={<EditIcon size={4} />}
              >
                Cập Nhật
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Action",
    }),
  ];

  return (
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="lg">
      <Flex alignItems="center" justifyContent="space-between" pb="5">
        <Heading
          as="h2"
          fontSize="18"
          fontWeight="semibold"
          textTransform="uppercase"
        >
          Danh Sách Sản Phẩm
        </Heading>
        <Box>
          <Breadcrumb spacing="8px" separator="/" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink as={ReactRouterLink} to="/admin">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={ReactRouterLink} to="/admin/san-pham">
                Sản phẩm
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" mb="6">
        <Flex gap="4" w="70%">
          <Box display="inline-block">
            <SelectThinkPro
              control={control}
              name="category"
              title=""
              placeholder="-- Danh mục --"
              data={categoriesFilter}
            />
          </Box>

          <Box display="inline-block">
            <SelectThinkPro
              control={control}
              name="brand"
              title=""
              placeholder="-- Thương hiệu --"
              data={brandsFilter}
            />
          </Box>

          <Box display="inline-block">
            <SelectThinkPro
              control={control}
              name="status"
              title=""
              placeholder="-- Trạng thái --"
              data={[
                {
                  label: "Đang bán",
                  value: "true",
                },
                {
                  label: "Ngừng bán",
                  value: "false",
                },
              ]}
            />
          </Box>

          <Flex
            flex="1"
            px="4"
            rounded="8px"
            alignItems="center"
            borderWidth="1px"
            borderColor="#e9ebec"
          >
            <Flex as="span" alignItems="center" justifyContent="center">
              <SearchIcon size={5} color="text.black" strokeWidth={1} />
            </Flex>
            <Input
              border="none"
              padding="0.6rem 0.9rem"
              fontSize="15"
              fontWeight="medium"
              lineHeight="1.5"
              w="260px"
              placeholder="Tìm kiếm sản phẩm"
              {...register("name")}
            />
          </Flex>
        </Flex>
        <Flex w="30%" gap="3" alignItems="center" justifyContent="flex-end">
          <Box
            cursor="pointer"
            display="inline-block"
            onClick={handleDownloadExcel}
          >
            <ExcelIcon size={10} color="#1f7342" />
          </Box>
          <Button
            as={ReactRouterLink}
            to="/admin/san-pham/add"
            leftIcon={<PlusCircleIcon size={5} color="text.textSuccess" />}
            px="4"
            lineHeight="2"
            color="text.textSuccess"
            bgColor="bg.bgSuccess"
          >
            Tạo mới
          </Button>
        </Flex>
      </Flex>

      {/* hiểu thị dữ liệu */}
      <TableThinkPro
        columns={columns}
        useData={useGetAllProductQuery}
        defaultPageSize={10}
        query={debounceQuery}
      />

      <ConfirmThinkPro
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        handleClick={handleDeleteProduct}
      />
    </Box>
  );
};

export default ProductManagerView;
