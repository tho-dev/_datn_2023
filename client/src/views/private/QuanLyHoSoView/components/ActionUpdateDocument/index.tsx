import { useForm, useWatch } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Textarea,
  Box,
  useToast,
  Text,
} from "@chakra-ui/react";
import { CloseSmallIcon } from "~/components/common/Icons";
import SelectThinkPro from "~/components/SelectThinkPro";
import { useEffect, useRef, useState } from "react";
import { useGetStorageByIdProjectQuery } from "~/redux/api/product";
import {
  useCreateDocumentMutation,
  useGetAllPdfFormatListQuery,
  useGetAllScanModeListQuery,
  useUpdateDocumentMutation,
} from "~/redux/api/category";

type Props = {
  onClose: () => void;
  dataDocument: any;
  dataProject: any;
};

const ActionUpdateDocument = ({
  onClose,
  dataDocument,
  dataProject,
}: Props) => {
  console.log(dataDocument);
  const toast = useToast();
  const [storageOrgan, setStorageOrgan] = useState<any>(null);
  const [idProject, setIdProject] = useState<any>(null);
  const [pdfFormatList, setpdfFormatList] = useState<any>(null);
  const [scanModeList, setScanModeList] = useState<any>(null);
  const [pdfVersion, setpdfVersion] = useState<any>([
    {
      label: "1.4",
      value: 1.4,
    },
    {
      label: "1.5",
      value: 1.5,
    },
    {
      label: "1.6",
      value: 1.6,
    },
    {
      label: "1.7",
      value: 1.7,
    },
    {
      label: "1.8",
      value: 1.8,
    },
    {
      label: "1.9",
      value: 1.9,
    },
    {
      label: "2.0",
      value: 2.0,
    },
  ]);
  const [pdfQuanlity, setpdfQuanlity] = useState<any>([
    {
      label: "150",
      value: 150,
    },
    {
      label: "200",
      value: 200,
    },
    {
      label: "240",
      value: 240,
    },
    {
      label: "300",
      value: 300,
    },
    {
      label: "400",
      value: 400,
    },
    {
      label: "600",
      value: 600,
    },
  ]);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const projectForm = useWatch({
    control,
    name: "project",
  });
  const storageForm = useWatch({
    control,
    name: "storageOrgan",
  });
  // api call
  const { data: dataStorageApi } = useGetStorageByIdProjectQuery(idProject, {
    skip: !idProject, // Chỉ gọi API khi idProject không phải null
  });
  const { data: dataPdfFormatList } = useGetAllPdfFormatListQuery("");
  const { data: dataScanModeList } = useGetAllScanModeListQuery("");
  const [updateDocument] = useUpdateDocumentMutation();

  const documentName = watch("documentName") || "";
  // Hàm loại bỏ dấu tiếng Việt
  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("SampleExcelFile", data.sampleExcelFile[0]);
    formData.append("DocumentName", data.documentName);
    formData.append("ShortName", data.shortName);
    formData.append("FileName", data.fileName);
    formData.append("MinimumDigits", data.minimumDigits);
    formData.append("ScanFolder", data.scanFolder);
    formData.append("TypingFolder", data.typingFolder);
    formData.append("Complete", "false");
    formData.append("HiddenOnTyping", "false");
    formData.append("HiddenOnScan", "false");
    formData.append("PdfFormatId", data.pdfFormat.value);
    formData.append("ScanModeId", data.scanMode.value);
    formData.append("StorageOrganId", data.storageOrgan?.value);
    formData.append("PdfVersion", data.pdfVersion.value);
    formData.append("PdfQuality", data.pdfQuality.value);
    try {
      await updateDocument({ id: dataDocument.id, data: formData }).unwrap();
      toast({
        title: "Thành công",
        duration: 2000,
        position: "top-right",
        status: "success",
        description: "Cập nhật hồ sơ thành công",
      });
    } catch (error: any) {
      toast({
        title: "Có lỗi",
        duration: 2000,
        position: "top-right",
        status: "error",
        description: error?.data?.message || "",
      });
    }

    reset();
    onClose();
  };
  useEffect(() => {
    if (dataStorageApi) {
      const storageFilter = dataStorageApi?.data?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });
      setStorageOrgan(storageFilter);
    }
  }, [dataStorageApi]);

  useEffect(() => {
    if (dataProject) {
      setIdProject(projectForm?.value);
    }
  }, [projectForm]);

  useEffect(() => {
    // Tạo một timer để delay 1 giây sau khi người dùng nhập
    const delayDebounceFn = setTimeout(() => {
      const nameParts = documentName.split(" ");
      if (nameParts.length > 0) {
        // Lấy ký tự đầu của mỗi từ và ghép lại
        const initials = nameParts
          .map((part: any) => part.charAt(0).toLowerCase())
          .join(""); // Ghép các ký tự đầu lại

        // Xóa dấu và viết hoa các ký tự
        const formattedName = removeAccents(initials).toUpperCase();
        setValue("shortName", formattedName);
        setValue("fileName", formattedName + "-<counter>");
        if (storageForm) {
          const dataScanFolder =
            `${formattedName}` +
            "\\" +
            `${
              dataStorageApi.data.filter(
                (item: any) => item.id == storageForm.value
              )[0].shortName
            }` +
            "\\" +
            "Scan";
          const dataTypingFolder =
            `${formattedName}` +
            "\\" +
            `${
              dataStorageApi.data.filter(
                (item: any) => item.id == storageForm.value
              )[0].shortName
            }` +
            "\\" +
            "Nhaplieu";

          setValue("scanFolder", dataScanFolder);
          setValue("typingFolder", dataTypingFolder);
        }
      } else {
        setValue("shortName", ""); // Nếu không có tên, đặt lại username rỗng
      }
    }, 1000);
    // Hủy timer nếu người dùng tiếp tục nhập trước khi hết thời gian
    return () => clearTimeout(delayDebounceFn);
  }, [documentName, setValue, storageForm, dataStorageApi]);

  useEffect(() => {
    if (dataPdfFormatList) {
      const dataPdfFormat = dataPdfFormatList?.data?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });
      setpdfFormatList(dataPdfFormat);
    }
    if (dataScanModeList) {
      const dataScanMode = dataScanModeList?.data?.map((item: any) => {
        return {
          label: item?.description,
          value: item?.id,
        };
      });
      setScanModeList(dataScanMode);
    }
  }, [dataPdfFormatList, dataScanModeList]);

  useEffect(() => {
    if (dataDocument) {
      const newDocument = {
        ...dataDocument,
        pdfFormat: {
          label: dataDocument.pdfFormat.name,
          value: dataDocument.pdfFormat.pdfFormatId,
        },
        scanMode: {
          label: dataDocument.scanMode.description,
          value: dataDocument.scanMode.scanModeId,
        },
        pdfQuality: {
          label: dataDocument.pdfQuality,
          value: dataDocument.pdfQuality,
        },
        pdfVersion: {
          label: dataDocument.pdfVersion,
          value: dataDocument.pdfVersion,
        },
        project: {
          label: dataDocument.project.projectName,
          value: dataDocument.project.id,
        },
        storageOrgan: {
          label: dataDocument.storageOrgan.name,
          value: dataDocument.storageOrgan.storageOrganId,
        },
      };
      reset(newDocument);
    }
  }, [dataDocument, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="4">
        <Flex flexDir="column" gap="4" w="50%">
          <FormControl isInvalid={errors.documentName as any}>
            <FormLabel
              htmlFor="documentName"
              fontSize="15"
              fontWeight="semibold"
            >
              Tên tài liệu
            </FormLabel>
            <Input
              id="documentName"
              placeholder="Tên tài liệu"
              {...register("documentName", {
                required: "Không được để trống !!!",
              })}
            />
            <FormErrorMessage>
              {(errors.documentName as any) && errors?.documentName?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.shortName as any}>
            <FormLabel htmlFor="shortName" fontSize="15" fontWeight="semibold">
              Tên rút gọn
            </FormLabel>
            <Input
              id="shortName"
              {...register("shortName", {
                required: "Không được để trống !!!",
              })}
            />
            <FormErrorMessage>
              {(errors.shortName as any) && errors?.shortName?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.shortName as any}>
            <FormLabel htmlFor="fileName" fontSize="15" fontWeight="semibold">
              Tên file scan
            </FormLabel>
            <Input
              id="fileName"
              {...register("fileName", {
                required: "Không được để trống !!!",
              })}
            />
            <FormErrorMessage>
              {(errors.fileName as any) && errors?.fileName?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.shortName as any}>
            <FormLabel
              htmlFor="minimumDigits"
              fontSize="15"
              fontWeight="semibold"
            >
              Số chữ số tối thiểu
            </FormLabel>
            <Input
              id="minimumDigits"
              placeholder="vd:1,2,3..."
              {...register("minimumDigits", {
                required: "Không được để trống !!!",
              })}
            />
            <FormErrorMessage>
              {(errors.minimumDigits as any) && errors?.minimumDigits?.message}
            </FormErrorMessage>
          </FormControl>
          {/* danh mục cha */}
          <SelectThinkPro
            control={control}
            name="project"
            title="Dự án"
            placeholder="-- Chọn dự án --"
            data={dataProject}
          />
          <SelectThinkPro
            control={control}
            name="storageOrgan"
            title="Đơn vị lưu trữ"
            placeholder="-- Chọn đơn vị lưu trữ --"
            data={storageOrgan}
          />
          <FormControl isInvalid={errors.scanFolder as any}>
            <FormLabel htmlFor="scanFolder" fontSize="15" fontWeight="semibold">
              Thư mục file scan
            </FormLabel>
            <Input
              id="scanFolder"
              {...register("scanFolder", {
                required: "Không được để trống !!!",
              })}
              readOnly
              bg="gray.100"
            />
            <FormErrorMessage>
              {(errors.scanFolder as any) && errors?.scanFolder?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex flexDir="column" gap="4" w="50%">
          <FormControl isInvalid={errors.typingFolder as any}>
            <FormLabel
              htmlFor="typingFolder"
              fontSize="15"
              fontWeight="semibold"
            >
              Thư mục file nhập
            </FormLabel>
            <Input
              id="typingFolder"
              {...register("typingFolder", {
                required: "Không được để trống !!!",
              })}
              readOnly
              bg="gray.100"
            />
            <FormErrorMessage>
              {(errors.typingFolder as any) && errors?.typingFolder?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.file as any}>
            <FormLabel
              htmlFor="sampleExcelFile"
              fontSize="15"
              fontWeight="semibold"
            >
              Tải file excel mẫu
            </FormLabel>
            <Flex
              justifyContent="center"
              alignItems="start"
              flexDir="column"
              gap="2"
            >
              <Input
                type="file"
                id="sampleExcelFile"
                {...register("sampleExcelFile")}
                w="full"
                h="full"
                p="2.5"
                cursor="pointer"
                accept=".xlsx"
              />
              {dataDocument?.sampleExcelFile && (
                <Text fontWeight="semibold" fontSize="sm" p="2">
                  File của bạn: {dataDocument?.sampleExcelFile}
                </Text>
              )}
            </Flex>

            <FormErrorMessage>
              {(errors.thumbnail as any) && errors?.thumbnail?.message}
            </FormErrorMessage>
          </FormControl>
          <SelectThinkPro
            control={control}
            name="pdfFormat"
            title="Định dạng Pdf"
            placeholder="-- Định dạng --"
            data={pdfFormatList}
          />
          <SelectThinkPro
            control={control}
            name="pdfVersion"
            title="Phiên bản Pdf"
            placeholder="-- Phiên bản --"
            data={pdfVersion}
          />
          <SelectThinkPro
            control={control}
            name="pdfQuality"
            title="Chất lượng Pdf"
            placeholder="-- Chất lượng --"
            data={pdfQuanlity}
          />
          <SelectThinkPro
            control={control}
            name="scanMode"
            title="Chế độ scan"
            placeholder="-- Chế độ --"
            data={scanModeList}
          />
        </Flex>
      </Flex>

      <Flex gap="3" justifyContent="flex-end" mt="6">
        <Button
          textColor="text.textDelete"
          bgColor="transparent"
          fontWeight="bold"
          px="4"
          _hover={{
            bgColor: "bg.bgDelete",
          }}
          leftIcon={<CloseSmallIcon size={4} />}
          onClick={onClose}
        >
          Đóng
        </Button>
        <Button
          type="submit"
          bgColor="text.textSuccess"
          textColor="text.white"
          fontWeight="bold"
          px="4"
        >
          Cập nhật
        </Button>
      </Flex>
    </form>
  );
};

export default ActionUpdateDocument;
