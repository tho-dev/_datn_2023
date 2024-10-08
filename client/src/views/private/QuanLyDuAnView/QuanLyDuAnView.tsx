/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
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
  useToast,
  Checkbox,
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
import {
  useDeleteProjectMutation,
  useDeleteStorageMutation,
  useGetAllProjectHiddenQuery,
  useGetAllProjectQuery,
  useGetAllStatusProjectQuery,
  useGetProjectByIdQuery,
  useGetStorageByIdProjectQuery,
  useGetStorageByIdQuery,
  useUnHideProjectMutation,
} from "~/redux/api/product";
import moment from "moment/moment";
import { useDebounce } from "@uidotdev/usehooks";
import DialogThinkPro from "~/components/DialogThinkPro";
import ActionCreateProject from "./Components/ActionCreateProject";
import ActionUpdateProject from "./Components/ActionUpdateProject";
import notfound from "~/assets/images/notfound.svg";
import TableProject from "~/components/TableProject";
import ActionUpdateStatusProject from "./Components/ActionUpdateStatusProject";
import ActionCreateStorage from "./Components/ActionCreateStorage";
import ActionUpdateStorage from "./Components/ActionUpdateStorage";

type Props = {};

const QuanLyDuAnView = (props: Props) => {
  const toast = useToast();

  const [idProject, setIdProject] = useState<any>(null as any);
  const [idStorage, setIdStorage] = useState<any>(null as any);
  const [idStorageDelete, setIdStorageDelete] = useState<any>(null as any);
  const [idProjectUpdate, setIdProjectUpdate] = useState<any>(null as any);
  const [idProjectDelete, setIdProjectDelete] = useState<any>(null as any);
  const [isChecked, setIsChecked] = useState(false);

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
    isOpen: isOpenActionUpdateStatusProject,
    onOpen: onOpenActionUpdateStatusProject,
    onClose: onCloseActionUpdateStatusProject,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const {
    isOpen: isOpenConfirmStorage,
    onOpen: onOpenConfirmStorage,
    onClose: onCloseConfirmStorage,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirmUnHidden,
    onOpen: onOpenConfirmUnHidden,
    onClose: onCloseConfirmUnHidden,
  } = useDisclosure();
  const {
    isOpen: isOpenActionCreateStorage,
    onOpen: onOpenActionCreateStorage,
    onClose: onCloseActionCreateStorage,
  } = useDisclosure();
  const {
    isOpen: isOpenActionUpdateStorage,
    onOpen: onOpenActionUpdateStorage,
    onClose: onCloseActionUpdateStorage,
  } = useDisclosure();

  // gọi api
  const { data: dataStorage } = useGetStorageByIdProjectQuery(idProject, {
    skip: !idProject, // Chỉ gọi API khi idProject không phải null
  });
  const { data: dataProject } = useGetProjectByIdQuery(idProjectUpdate, {
    skip: !idProjectUpdate,
  });
  const { data: dataStatusId } = useGetAllStatusProjectQuery("");
  const { data: dataStorageId } = useGetStorageByIdQuery(idStorage, {
    skip: !idStorage,
  });

  const [deleteProject] = useDeleteProjectMutation();
  const [deleteStorage] = useDeleteStorageMutation();
  const [unHideProject] = useUnHideProjectMutation();

  const handleGetIdProject = (id?: string) => {
    setIdProject(id);
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
  // Xử lý khi checkbox được nhấn
  const handleCheckboxChange = (event: any) => {
    const isChecked = event.target.checked; // Kiểm tra trạng thái của checkbox
    setIsChecked(isChecked);
  };
  // xử lý khi unhidden
  const handleUnhiddenProject = async () => {
    try {
      const data = {
        id: idProject,
        isHidden: false,
      };
      await unHideProject(data).unwrap();
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Hiện dự án thành công",
      });
    } catch (error) {
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: "Hiện thất bại",
      });
    }
    onCloseConfirmUnHidden();
  };
  // hàm xoá
  const handleDeleteProject = async () => {
    try {
      await deleteProject(idProjectDelete);
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Xoá dự án thành công",
      });
    } catch (error) {
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: "Xoá thất bại",
      });
    }
    onCloseConfirm();
  };
  const handleDeleteStorage = async () => {
    try {
      await deleteStorage(idStorageDelete);
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Xoá thành công",
      });
    } catch (error) {
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: "Xoá thất bại",
      });
    }
    onCloseConfirmStorage();
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
            {!isChecked && (
              <Tooltip label="Cập nhật dự án">
                <Button
                  size="xs"
                  bg="blue.200"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onOpenActionUpdateProject();
                    setIdProjectUpdate(doc?.id);
                  }}
                >
                  <AirplayIcon size={4} />
                </Button>
              </Tooltip>
            )}
            {!isChecked && (
              <Tooltip label="Cập nhật trạng thái dự án">
                <Button
                  size="xs"
                  bg="green.200"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onOpenActionUpdateStatusProject();
                    setIdProjectUpdate(doc?.id);
                  }}
                >
                  <EditIcon size={4} />
                </Button>
              </Tooltip>
            )}
            {isChecked && (
              <Tooltip label="Hiện dự án">
                <Button
                  size="xs"
                  bg="green.200"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onOpenConfirmUnHidden();
                    setIdProject(doc.id);
                  }}
                >
                  <EditIcon size={4} />
                </Button>
              </Tooltip>
            )}
            {isChecked && (
              <Tooltip label="Xem chi tiết">
                <Button
                  size="xs"
                  bg="blue.200"
                  onClick={(e: any) => {
                    e.stopPropagation();
                  }}
                >
                  <AirplayIcon size={4} />
                </Button>
              </Tooltip>
            )}
            <Tooltip label="Xoá">
              <Button
                size="xs"
                onClick={(e: any) => {
                  e.stopPropagation();
                  onOpenConfirm();
                  setIdProjectDelete(doc?.id);
                }}
              >
                <TraskIcon size={4} />
              </Button>
            </Tooltip>
          </Grid>
        );
      },
      header: "Action",
    }),
  ];
  const columnsStorage = [
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
    columnHelper.accessor("shortName", {
      cell: ({ getValue }) => {
        return (
          <Text fontSize="13px" fontWeight="medium">
            {getValue()}
          </Text>
        );
      },
      header: "Viết tắt",
    }),
    columnHelper.accessor("name", {
      cell: ({ getValue }) => {
        return (
          <Text fontSize="13px" fontWeight="medium">
            {getValue()}
          </Text>
        );
      },
      header: "Nơi lưu trữ",
    }),
    columnHelper.accessor("action", {
      cell: ({ row }) => {
        const doc = row?.original;
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap="1">
            <Tooltip label="Xoá">
              <Button
                size="xs"
                onClick={(e: any) => {
                  e.stopPropagation();
                  onOpenConfirmStorage();
                  setIdStorageDelete(doc?.id);
                }}
              >
                <TraskIcon size={4} />
              </Button>
            </Tooltip>
            <Tooltip label="Cập nhật">
              <Button
                size="xs"
                bg="blue.200"
                onClick={() => {
                  onOpenActionUpdateStorage();
                  setIdStorage(doc.id);
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
          justifyContent="space-start"
          bgColor="bg.white"
          flexDirection="column"
          w="60%"
          p="4"
          gap="2"
          borderRadius="6"
        >
          <Flex w="100%" justifyContent="flex-start" gap="10">
            <Button
              leftIcon={<PlusCircleIcon size={4} color="text.textSuccess" />}
              px="3"
              lineHeight="1"
              color="text.textSuccess"
              bgColor="bg.bgSuccess"
              onClick={onOpenActionCreateProject}
            >
              Tạo mới dự án
            </Button>
            <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
              Hiện dự án bị ẩn
            </Checkbox>
          </Flex>
          <TableThinkPro
            columns={columns}
            useData={
              !isChecked ? useGetAllProjectQuery : useGetAllProjectHiddenQuery
            }
            defaultPageSize={10}
            query={debounceQuery}
            defautFunctions={handleGetIdProject}
          />
        </Flex>
        {idProject && (
          <Flex
            alignItems="start"
            justifyContent="space-start"
            p="4"
            bgColor="bg.white"
            flexDirection="column"
            w="40%"
            gap="2"
            borderRadius="6"
          >
            <Flex w="100%" justifyContent="flex-start">
              <Button
                leftIcon={<PlusCircleIcon size={5} color="text.textSuccess" />}
                px="4"
                lineHeight="2"
                color="text.textSuccess"
                bgColor="bg.bgSuccess"
                onClick={onOpenActionCreateStorage}
              >
                Tạo mới đơn vị lưu trữ
              </Button>
            </Flex>
            <TableProject
              columns={columnsStorage}
              dataUser={dataStorage?.data}
              defaultPageSize={10}
            />
          </Flex>
        )}
        {!idProject && (
          <Flex
            alignItems="start"
            justifyContent="space-between"
            p="4"
            bgColor="bg.white"
            flexDirection="column"
            w="40%"
            gap="2"
          >
            <Flex
              w="full"
              h="full"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              bgColor="bg.gray"
            >
              <Center>
                <Box w="343px" h="343px">
                  <Image src={notfound} w="full" h="full" objectFit="cover" />
                </Box>
              </Center>
              <Box my="4">
                <Center>
                  <Heading as="h3" fontSize="18px">
                    Hãy chọn dự án để hiển thị chi tiết đơn vị lưu trữ
                  </Heading>
                </Center>
              </Box>
            </Flex>
          </Flex>
        )}
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
      {/* tạo đơn vị lưu trữ */}
      <DialogThinkPro
        size="xl"
        isOpen={isOpenActionCreateStorage}
        onClose={onCloseActionCreateStorage}
        isCentered
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Tạo mới đơn vị lưu trữ
          </Heading>
        }
      >
        <ActionCreateStorage
          onClose={onCloseActionCreateStorage}
          idProject={idProject}
        />
      </DialogThinkPro>
      {/* cập nhật đơn vị lưu trữ */}
      <DialogThinkPro
        size="xl"
        isOpen={isOpenActionUpdateStorage}
        onClose={onCloseActionUpdateStorage}
        isCentered
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Cập nhật đơn vị lưu trữ
          </Heading>
        }
      >
        <ActionUpdateStorage
          onClose={onCloseActionUpdateStorage}
          idProject={idProject}
          dataStorageId={dataStorageId?.data}
        />
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
        <ActionUpdateProject
          onClose={onCloseActionUpdateProject}
          dataProject={dataProject?.data}
        />
      </DialogThinkPro>
      {/* cập nhật trạng thái */}
      <DialogThinkPro
        size="xl"
        isOpen={isOpenActionUpdateStatusProject}
        onClose={onCloseActionUpdateStatusProject}
        isCentered
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Cập nhật trạng thái dự án
          </Heading>
        }
      >
        <ActionUpdateStatusProject
          onClose={onCloseActionUpdateStatusProject}
          dataProject={dataProject?.data}
          dataStatusId={dataStatusId?.data}
        />
      </DialogThinkPro>

      <ConfirmThinkPro
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        handleClick={handleDeleteProject}
      />

      <ConfirmThinkPro
        isOpen={isOpenConfirmStorage}
        onClose={onCloseConfirmStorage}
        handleClick={handleDeleteStorage}
      />
      <ConfirmThinkPro
        isOpen={isOpenConfirmUnHidden}
        onClose={onCloseConfirmUnHidden}
        handleClick={handleUnhiddenProject}
        content="Bạn có chắc muốn hiện bản ghi này không?"
        icon={<EditIcon />}
      />
    </Flex>
  );
};

export default QuanLyDuAnView;
