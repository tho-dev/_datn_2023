import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  useToast,
  Textarea,
  Select,
  Divider,
} from "@chakra-ui/react";
import { useAppSelector } from "~/redux/hook/hook";

type Props = {};

const DetailScan = () => {
  const { document }: any = useAppSelector(
    (state) => state.persistedReducer.scan
  );
  console.log(document);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="4">
        <FormControl isInvalid={errors.year as any}>
          <FormLabel htmlFor="year" fontSize="15" fontWeight="semibold">
            Đơn vị lưu trữ
          </FormLabel>
          <Select
            placeholder="Select option"
            borderRadius="6"
            size="md"
            {...register("storageId", {
              required: "Không được để trống !!!",
            })}
          >
            <option value={document?.storageOrgan.id} selected>
              {document?.storageOrgan.shortName}
            </option>
          </Select>
          <FormErrorMessage>
            {(errors.year as any) && errors?.year?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.year as any}>
          <FormLabel htmlFor="year" fontSize="15" fontWeight="semibold">
            Loại tài liệu
          </FormLabel>
          <Select
            placeholder="Select option"
            borderRadius="6"
            size="md"
            {...register("documentId", {
              required: "Không được để trống !!!",
            })}
          >
            <option value={document?.documentName} selected>
              {document?.documentName}
            </option>
          </Select>
          <FormErrorMessage>
            {(errors.year as any) && errors?.year?.message}
          </FormErrorMessage>
        </FormControl>
        <Divider borderColor="gray" />
        <Flex gap="2">
          <FormControl isInvalid={errors.boxid as any}>
            <FormLabel htmlFor="boxid" fontSize="15" fontWeight="semibold">
              Hộp số
            </FormLabel>
            <Input
              id="boxid"
              placeholder="VD: LS01"
              {...register("boxId", {
                required: "Không được để trống !!!",
              })}
              size={"md"}
              defaultValue={document?.boxName}
            />
            <FormErrorMessage>
              {(errors.year as any) && errors?.year?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.nameFile as any}>
            <FormLabel htmlFor="nameFile" fontSize="15" fontWeight="semibold">
              Tên File
            </FormLabel>
            <Input
              id="nameFile"
              placeholder="VD: HE-KC"
              {...register("nameFile", {
                required: "Không được để trống !!!",
              })}
              size={"md"}
              defaultValue={document?.fileName}
            />
            <FormErrorMessage>
              {(errors.nameFile as any) && errors?.nameFile?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex gap="2">
          <FormControl isInvalid={errors.numberFile as any}>
            <FormLabel htmlFor="numberFile" fontSize="15" fontWeight="semibold">
              Số đếm
            </FormLabel>
            <Input
              type="text"
              id="numberFile"
              placeholder="VD: 0001"
              {...register("numberFile", {
                required: "Không được để trống !!!",
              })}
              defaultValue={`0001`}
              size={"md"}
            />
            <FormErrorMessage>
              {(errors.numberFile as any) && errors?.numberFile?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.minimumDigits as any}>
            <FormLabel
              htmlFor="minimumDigits"
              fontSize="15"
              fontWeight="semibold"
            >
              Số chữ số tối thiểu
            </FormLabel>
            <Input
              id="minimumDigits"
              placeholder="VD: 4"
              {...register("minimumDigits", {
                required: "Không được để trống !!!",
              })}
              size={"md"}
              defaultValue={document?.minimumDigits}
            />
            <FormErrorMessage>
              {(errors.minimumDigits as any) && errors?.minimumDigits?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Divider borderColor="gray" />
        <Flex gap="2">
          <FormControl isInvalid={errors.scanMode as any}>
            <FormLabel htmlFor="scanMode" fontSize="15" fontWeight="semibold">
              Chế độ scan
            </FormLabel>
            <Select
              rounded="lg"
              size="md"
              {...register("scanMode", {
                required: "Không được để trống !!!",
              })}
              fontSize="md"
            >
              <option value="1">Scan màu</option>
            </Select>
            <FormErrorMessage>
              {(errors.scanMode as any) && errors?.scanMode?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.pdfQuality as any}>
            <FormLabel htmlFor="pdfQuality" fontSize="15" fontWeight="semibold">
              Chất lượng PDF
            </FormLabel>
            <Select
              rounded="lg"
              size="md"
              {...register("pdfQuality", {
                required: "Không được để trống !!!",
              })}
              fontSize="md"
            >
              <option value="200">200</option>
            </Select>
            <FormErrorMessage>
              {(errors.pdfQuality as any) && errors?.pdfQuality?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap="2">
          <FormControl isInvalid={errors.pdfVersion as any}>
            <FormLabel htmlFor="pdfVersion" fontSize="15" fontWeight="semibold">
              Phiên bản PDF
            </FormLabel>
            <Select
              rounded="lg"
              size="md"
              {...register("pdfVersion", {
                required: "Không được để trống !!!",
              })}
              fontSize="md"
            >
              <option value="1.4">1.4</option>
            </Select>
            <FormErrorMessage>
              {(errors.pdfVersion as any) && errors?.pdfVersion?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.pdfFormat as any}>
            <FormLabel htmlFor="pdfFormat" fontSize="15" fontWeight="semibold">
              Định dạng PDF
            </FormLabel>
            <Select
              rounded="lg"
              size="md"
              {...register("pdfFormat", {
                required: "Không được để trống !!!",
              })}
              fontSize="md"
            >
              <option value="PDF">PDF</option>
            </Select>
            <FormErrorMessage>
              {(errors.pdfFormat as any) && errors?.pdfFormat?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
    </form>
  );
};

export default DetailScan;
