import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  useToast,
  Select,
} from "@chakra-ui/react";
import { CloseSmallIcon, NavArrowLeflIcon } from "~/components/common/Icons";
import {
  useGetBoxByIdDocumentQuery,
  useUpdateDemandMutation,
} from "~/redux/api/demand";
import { useEffect } from "react";
import { useAppDispatch } from "~/redux/hook/hook";
import {
  closeModal,
  createDocument,
  openModal,
} from "~/redux/slices/scanSlice";

type Props = {
  onClose: () => void;
  dataDocuments: any;
  handleReturnBox: () => void;
};

const ActionBoxOld = ({ onClose, dataDocuments, handleReturnBox }: Props) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const IdDocument = watch("documentId");
  // call api
  const { data: dataBox } = useGetBoxByIdDocumentQuery(IdDocument);
  const onSubmit = async (data: any) => {
    const documnets = dataDocuments?.find((item: any) => {
      return item.id == data.documentId;
    });
    const box = dataBox?.data.find((item: any) => {
      return item.id == data.boxId;
    });
    const dataScan = {
      ...documnets,
      boxId: box.id,
      boxName: box.name,
      boxYear: box.year,
    };
    dispatch(createDocument(dataScan));
    dispatch(closeModal());
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="4">
        <FormControl isInvalid={errors.year as any}>
          <FormLabel htmlFor="year" fontSize="15" fontWeight="semibold">
            Loại tài liệu
          </FormLabel>
          <Select
            fontSize="sm"
            borderRadius="6"
            placeholder="Chọn loại tài liệu"
            size="lg"
            {...register("documentId", {
              required: "Không được để trống !!!",
            })}
          >
            {dataDocuments?.map((item: any) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.documentName}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>
            {(errors.year as any) && errors?.year?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.year as any}>
          <FormLabel htmlFor="year" fontSize="15" fontWeight="semibold">
            Chọn Hộp
          </FormLabel>
          <Select
            fontSize="sm"
            borderRadius="6"
            size="lg"
            {...register("boxId", {
              required: "Không được để trống !!!",
            })}
            placeholder="Chọn hộp"
          >
            {dataBox?.data?.map((item: any) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>
            {(errors.year as any) && errors?.year?.message}
          </FormErrorMessage>
        </FormControl>
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
          leftIcon={<NavArrowLeflIcon size={4} />}
          onClick={() => {
            handleReturnBox();
            reset();
            onClose();
          }}
        >
          Quay lại
        </Button>
        <Button
          type="submit"
          bgColor="text.textSuccess"
          textColor="text.white"
          fontWeight="bold"
          px="4"
        >
          Bắt đầu làm
        </Button>
      </Flex>
    </form>
  );
};

export default ActionBoxOld;
