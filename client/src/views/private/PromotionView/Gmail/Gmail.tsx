import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, Link as ReactRouterLink } from "react-router-dom";
import {
  useAddMutation,
  useGetAllQuery,
  useRemoveMutation,
} from "~/redux/api/ads";
import {
  PlusCircleIcon,
  SearchIcon,
  TraskIcon,
} from "~/components/common/Icons";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import TableThinkPro from "~/components/TableThinkPro";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";

type Props = {};

const GmailView = (props: Props) => {
  const [idJob, setIdJob] = useState("");
  const [search, setSearch] = useState("");
  const toast = useToast();
  const columnHelper = createColumnHelper<any>();
  const {
    isOpen: isOpenComfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseComfirm,
  } = useDisclosure();

  const [remove] = useRemoveMutation();
  const handleSearched = (e: any) => {
    setSearch(e.target.value as string);
  };
  const handleRemove = () => {
    remove(idJob)
      .unwrap()
      .then((data) => {
        console.log(data);
        toast({
          title: "Hệ thống",
          duration: 1600,
          position: "bottom-right",
          status: "success",
          description: data.message,
        });
        onCloseComfirm();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOpen = (jobId: string) => {
    setIdJob(jobId);
    onOpenConfirm();
  };
  const columns = [
    columnHelper.accessor("#", {
      cell: ({ row, table }) => {
        const index = row.index + 1;
        const { pageIndex, pageSize } = table.getState().pagination;
        return pageIndex * pageSize + index;
      },
      header: "#",
    }),
    columnHelper.accessor("title", {
      cell: (info) => {
        return <Text fontSize="sm">{info.getValue()}</Text>;
      },
      header: "Tên chiến dịch",
    }),
    columnHelper.accessor("email", {
      cell: (info) => {
        return <Text fontSize="sm">{info.getValue()}</Text>;
      },
      header: "Khách hàng",
    }),
    columnHelper.accessor("startDate", {
      cell: (info) => {
        return (
          <Text fontSize="sm">
            {moment(info.getValue()).format("DD-MM-YYYY")}
          </Text>
        );
      },
      header: "Ngày bắt đầu",
    }),
    columnHelper.accessor("endDate", {
      cell: (info) => (
        <Text fontSize="sm">
          {moment(info.getValue()).format("DD-MM-YYYY")}
        </Text>
      ),
      header: "Ngày kết thúc",
    }),

    columnHelper.accessor("sendTime", {
      cell: (info) => {
        return (
          <Text
            fontSize="sm"
            css={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {info.getValue()}
          </Text>
        );
      },
      header: "Thời gian diễn ra",
    }),
    columnHelper.accessor("endDate", {
      cell: (info) => (
        <Text fontSize="sm">
          {moment(info.getValue()).format("DD-MM-YYYY") >
          moment().format("YYYY-MM-DD")
            ? "Đã kết thúc"
            : "Đang diễn ra"}
        </Text>
      ),
      header: "Trạng thái",
    }),
    columnHelper.accessor("action", {
      cell: ({ row }) => {
        const doc = row?.original;
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
                onClick={() => handleOpen(doc.jobId)}
              >
                Xóa
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Hành động",
    }),
  ];

  return (
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="lg">
      <Flex alignItems="center" justifyContent="space-between" pb="5">
        <Heading as="h2" fontSize="18px" fontWeight="semibold">
          Danh sách các Job đang chạy
        </Heading>
        <Box>
          <Breadcrumb spacing="8px" separator="/" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink as={ReactRouterLink} to="/admin">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/admin/khuyen-mai/gmail">
                Danh sách job quảng cáo
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="6">
        <Flex
          px="4"
          rounded="4px"
          alignItems="center"
          borderWidth="1px"
          borderColor="#e9ebec"
        >
          <Flex as="span" alignItems="center" justifyContent="center">
            <SearchIcon size={5} color="text.black" strokeWidth={1} />
          </Flex>
          <Input
            onChange={handleSearched}
            value={search}
            border="none"
            padding="0.6rem 0.9rem"
            fontSize="15"
            fontWeight="medium"
            lineHeight="1.5"
            w="260px"
            placeholder="Chiến dịch..."
          />
        </Flex>
        <Button
          as={ReactRouterLink}
          to="add"
          leftIcon={<PlusCircleIcon size={5} color="text.white" />}
          px="4"
          lineHeight="2"
          bgColor="bg.green"
        >
          Tạo Mới
        </Button>
      </Flex>
      <Box>
        <TableThinkPro
          columns={columns}
          useData={useGetAllQuery}
          defaultPageSize={20}
          query={{
            _limit: 20,
            _page: 1,
            _sort: "created_at",
            _order: "desc",
            search,
          }}
        />
      </Box>
      <ConfirmThinkPro
        isOpen={isOpenComfirm}
        onClose={onCloseComfirm}
        content="Bạn có muốn xóa bỏ danh mục này không?"
        handleClick={handleRemove}
      />
    </Box>
  );
};

export default GmailView;
