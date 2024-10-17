import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  useDisclosure,
  useToast,
  FormLabel,
  Tooltip,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment/moment";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import DialogThinkPro from "~/components/DialogThinkPro";
import {
  AirplayIcon,
  EditIcon,
  PlusCircleIcon,
  SearchIcon,
  TraskIcon,
} from "~/components/common/Icons";
import SelectThinkPro from "~/components/SelectThinkPro";
import {
  useGetAllProjectQuery,
  useGetStorageByIdProjectQuery,
} from "~/redux/api/product";
import { useDebounce } from "@uidotdev/usehooks";
import LoadingPolytech from "~/components/LoadingPolytech";
import TableProject from "~/components/TableProject";
import {
  useDeleteDocumentMutation,
  useGetAllDocumentQuery,
  useGetDocumentByIdQuery,
  useGetDocumentByProjectQuery,
  useGetDocumentByStorageQuery,
} from "~/redux/api/category";
import ActionCreateDocument from "./components/ActionCreateDocument";
import ActionUpdateDocument from "./components/ActionUpdateDocument";

type Props = {};

const QuanLyHoSoView = (props: Props) => {
  const toast = useToast();
  const columnHelper = createColumnHelper<any>();
  const [idProject, setIdProject] = useState<any>(null);
  const [dataProject, setDataProject] = useState<any>();
  const [storageOrgan, setStorageOrgan] = useState<any>(null);
  const [dataDocument, setDataDocument] = useState<any>(null);
  const [idDocument, setIdDocument] = useState<any>(null);

  const {
    isOpen: isOpenCreateDocument,
    onOpen: onOpenCreateDocument,
    onClose: onCloseCreateDocument,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdateDocument,
    onOpen: onOpenUpdateDocument,
    onClose: onCloseUpdateDocument,
  } = useDisclosure();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const {
    register,
    formState: { errors },
    control,
  } = useForm();

  const projectForm = useWatch({
    control,
    name: "project",
  });
  const storageForm = useWatch({
    control,
    name: "storage",
  });

  const query = useMemo(() => {
    return {
      _page: 1,
      _limit: 20,
      _order: "desc",
      _sort: "created_at",
    };
  }, []);
  const debounceQuery = useDebounce(query, 500);
  // call api
  const { data: documents } = useGetAllDocumentQuery(debounceQuery);
  const { data: dataProjectApi, isLoading } =
    useGetAllProjectQuery(debounceQuery);
  console.log(dataProjectApi);

  const { data: dataStorageApi } = useGetStorageByIdProjectQuery(idProject, {
    skip: !idProject, // Chỉ gọi API khi idProject không phải null
  });
  const { data: dataDocumentByIdProject } = useGetDocumentByProjectQuery(
    idProject,
    { skip: !idProject }
  );
  const { data: dataDocumentByIdStorage } = useGetDocumentByStorageQuery(
    storageForm?.value,
    { skip: !storageForm?.value }
  );
  const [deleteDocument] = useDeleteDocumentMutation();
  const { data: dataOneDocument } = useGetDocumentByIdQuery(idDocument, {
    skip: !idDocument,
  });

  useEffect(() => {
    if (dataProjectApi) {
      const projectFilter = dataProjectApi?.data?.map((item: any) => {
        return {
          label: item?.projectName,
          value: item?.id,
        };
      });
      setDataProject(projectFilter);
    }
    if (dataDocumentByIdProject) {
      setDataDocument(dataDocumentByIdProject?.data);
    }
    if (dataDocumentByIdStorage) {
      setDataDocument(dataDocumentByIdStorage?.data);
    }
    if (dataStorageApi) {
      const storageFilter = dataStorageApi?.data?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });
      setStorageOrgan(storageFilter);
    }
  }, [
    dataProjectApi,
    dataStorageApi,
    dataDocumentByIdProject,
    dataDocumentByIdStorage,
  ]);

  useEffect(() => {
    if (dataProjectApi) {
      setIdProject(projectForm?.value);
    }
  }, [projectForm]);

  useEffect(() => {
    if (documents) {
      setDataDocument(documents?.data);
    }
  }, [documents]);
  // hàm xoá
  const handleDeleteDocument = async () => {
    try {
      await deleteDocument(idDocument).unwrap();
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Xoá tài liệu thành công",
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
    columnHelper.accessor("documentName", {
      cell: ({ getValue }) => {
        return (
          <Text fontSize="13px" fontWeight="medium">
            {getValue()}
          </Text>
        );
      },
      header: "Tên loại tài liệu",
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
    columnHelper.accessor("fileName", {
      cell: ({ getValue }) => {
        return (
          <Text fontSize="13px" fontWeight="medium">
            {getValue()}
          </Text>
        );
      },
      header: "Tên file scan",
    }),
    columnHelper.accessor("minimumDigits", {
      cell: ({ getValue }) => (
        <Text fontWeight="medium" fontSize="13px">
          {getValue()}
        </Text>
      ),
      header: "Số chữ số tối thiểu",
    }),
    columnHelper.accessor("complete", {
      cell: ({ getValue }) => (
        <Text fontWeight="medium" fontSize="13px">
          {getValue() ? "Hoàn thành" : "Chưa hoàn thành"}
        </Text>
      ),
      header: "Trạng thái",
    }),
    columnHelper.accessor("storageOrgan", {
      cell: ({ getValue }) => (
        <Text fontWeight="medium" fontSize="13px">
          {getValue()?.shortName}
        </Text>
      ),
      header: "Đơn vị lưu trữ",
    }),
    columnHelper.accessor("project", {
      cell: ({ getValue }) => (
        <Text fontWeight="medium" fontSize="13px">
          {getValue()?.projectName}
        </Text>
      ),
      header: "Dự án",
    }),
    columnHelper.accessor("action", {
      cell: ({ row }) => {
        const doc = row?.original;
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap="1">
            <Tooltip label="Cập nhật tài liệu">
              <Button
                size="xs"
                bg="blue.200"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setIdDocument(doc.id);
                  onOpenUpdateDocument();
                }}
              >
                <AirplayIcon size={4} />
              </Button>
            </Tooltip>
            <Tooltip label="Cập nhật trạng thái dự án">
              <Button
                size="xs"
                bg="green.200"
                onClick={(e: any) => {
                  e.stopPropagation();
                }}
              >
                <EditIcon size={4} />
              </Button>
            </Tooltip>
            <Tooltip label="Xoá">
              <Button
                size="xs"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setIdDocument(doc.id);
                  onOpenConfirm();
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

  if (isLoading) {
    return <LoadingPolytech />;
  }
  return (
    <>
      <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="xl">
        <Flex alignItems="center" justifyContent="space-between" pb="5">
          <Heading
            as="h2"
            fontSize="18"
            fontWeight="semibold"
            textTransform="uppercase"
          >
            Danh Sách Loại Hồ Sơ
          </Heading>
          <Box>
            <Breadcrumb spacing="8px" separator="/" fontSize="sm">
              <BreadcrumbItem>
                <BreadcrumbLink as={ReactRouterLink} to="/admin">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="/admin/qlhs">
                  Quản lý hồ sơ
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
        </Flex>
        <Flex alignItems="center" mb="6" w="100%" gap="4">
          <Box w="50%">
            <SelectThinkPro
              control={control}
              name="project"
              title="Chọn dự án"
              placeholder="Danh sách dự án"
              data={dataProject}
            />
          </Box>
          <Box w="50%">
            <SelectThinkPro
              control={control}
              name="storage"
              title="Chọn đơn vị lưu trữ"
              placeholder="Danh sách đơn vị lưu trữ"
              data={storageOrgan}
            />
          </Box>
        </Flex>
        <Flex mb="6" w="100%" gap="4">
          <Button
            leftIcon={<PlusCircleIcon size={5} color="text.textSuccess" />}
            px="4"
            lineHeight="2"
            color="text.textSuccess"
            bgColor="bg.bgSuccess"
            onClick={onOpenCreateDocument}
          >
            Tạo mới hồ sơ
          </Button>
        </Flex>
        <TableProject
          columns={columns}
          dataUser={dataDocument}
          defaultPageSize={10}
        />
        {/* thêm */}
        <DialogThinkPro
          size="6xl"
          isOpen={isOpenCreateDocument}
          onClose={onCloseCreateDocument}
          isCentered
          title={
            <Heading fontSize="16" textTransform="uppercase">
              Tạo mới tài liệu
            </Heading>
          }
        >
          <ActionCreateDocument
            onClose={onCloseCreateDocument}
            dataProject={dataProject}
          />
        </DialogThinkPro>
        {/* sửa */}
        <DialogThinkPro
          size="6xl"
          isOpen={isOpenUpdateDocument}
          onClose={onCloseUpdateDocument}
          isCentered
          title={
            <Heading fontSize="16" textTransform="uppercase">
              Cập nhật tài liệu
            </Heading>
          }
        >
          <ActionUpdateDocument
            onClose={onCloseUpdateDocument}
            dataDocument={dataOneDocument?.data}
            dataProject={dataProject}
          />
        </DialogThinkPro>
        {/* xoá */}
        <ConfirmThinkPro
          isOpen={isOpenConfirm}
          onClose={onCloseConfirm}
          handleClick={handleDeleteDocument}
        />
      </Box>
      {/* Form */}
    </>
  );
};

export default QuanLyHoSoView;
