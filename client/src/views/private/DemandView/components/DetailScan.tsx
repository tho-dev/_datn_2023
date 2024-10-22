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
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { replaceCounter } from "~/utils/fc";
import {
  changeNumberFile,
  changeMinimumDigits,
  changeNameFile,
  countNumberFileReduce,
  countNumberFile,
} from "~/redux/slices/scanSlice";
import { CheveronUpIcon, ChevronDownIcon } from "~/components/common/Icons";

type Props = {};

const DetailScan = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { document, documentView, box }: any = useAppSelector(
    (state) => state.persistedReducer.scan
  );
  const handleChangeNumberFile = (e: any) => {
    if (Number(e.target.value) < 1) {
      return toast({
        duration: 1600,
        position: "top-right",
        status: "error",
        description: "Giá trị phải lớn hơn hoặc bằng 1",
      });
    }
    dispatch(changeNumberFile(Number(e.target.value)));
  };
  const handleChangeMinimumDigits = (e: any) => {
    dispatch(changeMinimumDigits(Number(e.target.value)));
  };
  const handleChangeFileName = (e: any) => {
    dispatch(changeNameFile(e.target.value));
  };
  const handleDecrement = () => {
    if (documentView?.numberFile == 1) {
      return toast({
        duration: 1600,
        position: "top-right",
        status: "error",
        description: "Giá trị phải lớn hơn hoặc bằng 1",
      });
    }
    dispatch(countNumberFileReduce());
  };
  const handleIncrement = (e: any) => {
    dispatch(countNumberFile());
  };
  return (
    <Flex flexDir="column" gap="4">
      <Flex gap="2">
        <Box>
          <FormLabel htmlFor="year" fontSize="15" fontWeight="semibold">
            Loại tài liệu
          </FormLabel>
          <Input
            id="documentName"
            placeholder="VD: LS01"
            size={"md"}
            value={document?.documentName || 1}
            readOnly
            bgColor={"gray.100"}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="boxid" fontSize="15" fontWeight="semibold">
            Hộp số
          </FormLabel>
          <Input
            id="boxid"
            placeholder="VD: LS01"
            size={"md"}
            value={box?.name || 1}
            readOnly
            bgColor={"gray.100"}
          />
        </Box>
      </Flex>
      <Box>
        <FormLabel htmlFor="nameFile" fontSize="15" fontWeight="semibold">
          Tên đầy đủ
        </FormLabel>
        <Input
          id="nameFile"
          placeholder="VD: HE-KC"
          size={"md"}
          value={documentView?.fullName}
          readOnly
          bgColor={"gray.100"}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="fileName" fontSize="15" fontWeight="semibold">
          Tên File
        </FormLabel>
        <Input
          id="fileName"
          placeholder="VD: HE-KC"
          size={"md"}
          value={document?.fileName}
          onChange={handleChangeFileName}
        />
      </Box>

      <Flex gap="2">
        <Box>
          <FormLabel htmlFor="numberFile" fontSize="15" fontWeight="semibold">
            Số đếm
          </FormLabel>
          <Flex w="full" gap="2">
            <Flex w="50%" gap="2">
              <IconButton
                aria-label="+"
                icon={<CheveronUpIcon size={6} />}
                size={"md"}
                bgColor={"gray.500"}
                onClick={handleIncrement}
              />
              <IconButton
                aria-label="-"
                icon={<ChevronDownIcon size={6} />}
                size={"md"}
                bgColor={"gray.500"}
                onClick={handleDecrement}
              />
            </Flex>
            <Input
              type="number"
              id="numberFile"
              placeholder="VD: 0001"
              value={documentView?.numberFile || 1}
              size={"md"}
              onChange={handleChangeNumberFile}
              w="50%"
            />
          </Flex>
        </Box>
        <Box>
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
            size={"md"}
            value={document?.minimumDigits}
            onChange={handleChangeMinimumDigits}
          />
        </Box>
      </Flex>
      <Divider borderColor="gray" />
      <Flex gap="2" w="full">
        <Box w="50%">
          <FormLabel htmlFor="scanMode" fontSize="15" fontWeight="semibold">
            Chế độ scan
          </FormLabel>
          <Input
            id="scanMode"
            placeholder="VD: 4"
            size={"md"}
            value={document?.scanMode?.description || ""}
            readOnly
            bgColor={"gray.100"}
          />
        </Box>

        <Box w="50%">
          <FormLabel htmlFor="pdfQuality" fontSize="15" fontWeight="semibold">
            Chất lượng PDF
          </FormLabel>
          <Input
            id="pdfQuality"
            placeholder="VD: 4"
            size={"md"}
            value={document?.pdfQuality || ""}
            readOnly
            bgColor={"gray.100"}
          />
        </Box>
      </Flex>

      <Flex gap="2" w="full">
        <Box w="50%">
          <FormLabel htmlFor="pdfVersion" fontSize="15" fontWeight="semibold">
            Phiên bản PDF
          </FormLabel>
          <Input
            id="pdfVersion"
            placeholder="VD: 4"
            size={"md"}
            value={document?.pdfVersion || ""}
            readOnly
            bgColor={"gray.100"}
          />
        </Box>
        <Box w="50%">
          <FormLabel htmlFor="pdfFormat" fontSize="15" fontWeight="semibold">
            Định dạng PDF
          </FormLabel>
          <Input
            id="pdfFormat"
            placeholder="VD: 4"
            size={"md"}
            value={document?.pdfFormat?.name || ""}
            readOnly
            bgColor={"gray.100"}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default DetailScan;
