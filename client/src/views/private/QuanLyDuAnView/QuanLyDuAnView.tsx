/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
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
  Tooltip,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import {
  AirplayIcon,
  EditIcon,
  PlusCircleIcon,
  SearchIcon,
  TraskIcon,
} from "~/components/common/Icons";
import { useGetAllProjectQuery } from "~/redux/api/product";
import moment from "moment/moment";
import { useDebounce } from "@uidotdev/usehooks";
import DialogThinkPro from "~/components/DialogThinkPro";
import ActionCreateProject from "./Components/ActionCreateProject";
import ActionUpdateProject from "./Components/ActionUpdateProject";

type Props = {};

const QuanLyDuAnView = (props: Props) => {
  const [id, setId] = useState<any>(null as any);
  const columnHelper = createColumnHelper<any>();
  const {
    isOpen: isOpenActionCreateProject,
    onOpen: onOpenActionCreateProject,
    onClose: onCloseActionCreateProject,
  } = useDisclosure();
  const {
    isOpen: isOpenActionUpdateProject,
    onOpen: onOpenActionUpdateProject,
    onClose: onCloseActionUpdateProject,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const getId = (id?: string) => {
    console.log(id);
  };
  const query = useMemo(() => {
    return {
      _page: 1,
      _limit: 20,
      _order: "desc",
      _sort: "created_at",
    };
  }, []);
  const debounceQuery = useDebounce(query, 500);

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
    columnHelper.accessor("projectName", {
      cell: ({ getValue }) => {
        return (
          <Text fontSize="13px" fontWeight="medium">
            {getValue()}
          </Text>
        );
      },
      header: "Tên dự án",
    }),
    columnHelper.accessor("shortName", {
      cell: ({ getValue }) => {
        return (
          <Text fontSize="13px" fontWeight="medium">
            {getValue()}
          </Text>
        );
      },
      header: "Tên rút gọn",
    }),
    columnHelper.accessor("startDate", {
      cell: (info) => (
        <Text fontWeight="medium" fontSize="13px">
          {moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS")}
        </Text>
      ),
      header: "Ngày bắt đầu",
    }),
    columnHelper.accessor("statusName", {
      cell: ({ getValue }) => (
        <Text fontWeight="medium" fontSize="13px">
          {getValue()}
        </Text>
      ),
      header: "Trạng thái",
    }),
    columnHelper.accessor("action", {
      cell: ({ row }) => {
        const doc = row?.original;
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap="1">
            <Tooltip label="Xoá">
              <Button
                size="xs"
                onClick={() => {
                  onOpenConfirm();
                }}
              >
                <TraskIcon size={4} />
              </Button>
            </Tooltip>
            <Tooltip label="Cập nhật">
              <Button
                size="xs"
                bg="blue.200"
                onClick={(e: any) => {
                  e.stopPropagation();
                  onOpenActionUpdateProject();
                  setId(doc?.id);
                }}
              >
                <AirplayIcon size={4} />
              </Button>
            </Tooltip>
            <Tooltip label="Hover me">
              <Button size="xs" bg="green.200">
                <EditIcon size={4} />
              </Button>
            </Tooltip>
            <Tooltip label="Hover me">
              <Button size="xs" bg="yellow.200">
                <EditIcon size={4} />
              </Button>
            </Tooltip>
          </Grid>
        );
      },
      header: "Action",
    }),
  ];

  return (
    <Flex rounded="lg" flexDirection="column" gap="20px">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        bgColor="bg.white"
        p="4"
      >
        <Heading
          as="h2"
          fontSize="18"
          fontWeight="semibold"
          textTransform="uppercase"
        >
          Danh Sách Dự Án
        </Heading>
        <Box>
          <Breadcrumb spacing="8px" separator="/" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink as={ReactRouterLink} to="/admin">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={ReactRouterLink} to="/admin/qlda">
                Quản lý dự án
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </Flex>
      <Flex w="100%" gap="2">
        <Flex
          alignItems="start"
          justifyContent="space-between"
          bgColor="bg.white"
          flexDirection="column"
          w="50%"
          p="4"
          gap="2"
          borderRadius="6"
        >
          <Flex w="100%" justifyContent="flex-start">
            <Button
              leftIcon={<PlusCircleIcon size={4} color="text.textSuccess" />}
              px="3"
              lineHeight="1"
              color="text.textSuccess"
              bgColor="bg.bgSuccess"
              onClick={onOpenActionCreateProject}
            >
              Tạo mới
            </Button>
          </Flex>
          <TableThinkPro
            columns={columns}
            useData={useGetAllProjectQuery}
            defaultPageSize={10}
            query={debounceQuery}
            defautFunctions={getId}
          />
        </Flex>

        {/* <Flex
          alignItems="start"
          justifyContent="space-between"
          p="4"
          bgColor="bg.white"
          flexDirection="column"
          w="50%"
          gap="2"
        >
          <Flex w="100%" justifyContent="flex-start">
            <Button
              as={ReactRouterLink}
              leftIcon={<PlusCircleIcon size={5} color="text.textSuccess" />}
              px="4"
              lineHeight="2"
              color="text.textSuccess"
              bgColor="bg.bgSuccess"
            >
              Tạo mới
            </Button>
          </Flex>
          <TableThinkPro
            columns={columns}
            useData={useGetAllProductQuery}
            defaultPageSize={10}
            query={debounceQuery}
          />
        </Flex> */}
      </Flex>

      {/* tao dự án*/}
      <DialogThinkPro
        size="6xl"
        isOpen={isOpenActionCreateProject}
        onClose={onCloseActionCreateProject}
        isCentered
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Tạo mới dự án
          </Heading>
        }
      >
        <ActionCreateProject onClose={onCloseActionCreateProject} />
      </DialogThinkPro>
      {/* cập nhật dự án*/}
      <DialogThinkPro
        size="6xl"
        isOpen={isOpenActionUpdateProject}
        onClose={onCloseActionUpdateProject}
        isCentered
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Cập nhật dự án
          </Heading>
        }
      >
        <ActionUpdateProject onClose={onCloseActionUpdateProject} />
      </DialogThinkPro>
      <ConfirmThinkPro
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        // handleClick={handleDeleteProduct}
      />
    </Flex>
  );
};

export default QuanLyDuAnView;
