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
} from "@chakra-ui/react";
import { CloseSmallIcon, NavArrowLeflIcon } from "~/components/common/Icons";
import {
  useCreateBoxMutation,
  useCreateDemandMutation,
} from "~/redux/api/demand";
import {
  closeModal,
  createDocument,
  openModal,
} from "~/redux/slices/scanSlice";
import { useAppDispatch } from "~/redux/hook/hook";

type Props = {
  onClose: () => void;
  handleReturnBox: () => void;
  dataDocument: any;
};

const CreateBoxView = ({ onClose, dataDocument, handleReturnBox }: Props) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [createBox, { isLoading }] = useCreateBoxMutation();

  const onSubmit = async (data: any) => {
    const dataBox = {
      ...data,
      documentId: Number(data.documentId),
    };

    const documents = dataDocument.find((item: any) => {
      return item.id == data.documentId;
    });

    try {
      const resultBox = await createBox(dataBox).unwrap();
      const dataScan = {
        ...documents,
        boxId: resultBox.id,
        boxName: dataBox.name,
        boxYear: dataBox.year,
      };
      dispatch(createDocument(dataScan));
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Tạo hộp mới thành công",
      });
    } catch (error: any) {
      dispatch(openModal());
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: JSON.stringify(error?.data?.errors),
      });
    }
    reset();
    onClose();
    dispatch(closeModal());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="4">
        <FormControl isInvalid={errors.name as any}>
          <FormLabel htmlFor="name" fontSize="15" fontWeight="semibold">
            Tên hộp
          </FormLabel>
          <Input
            id="name"
            placeholder="VD: Học tập"
            {...register("name", {
              required: "Không được để trống !!!",
            })}
          />
          <FormErrorMessage>
            {(errors.name as any) && errors?.name?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.year as any}>
          <FormLabel htmlFor="year" fontSize="15" fontWeight="semibold">
            Loại tài liệu
          </FormLabel>
          <Select
            placeholder="Chọn loại tài liệu"
            borderRadius="6"
            {...register("documentId", {
              required: "Không được để trống !!!",
            })}
          >
            {dataDocument?.map((item: any) => {
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
            Năm
          </FormLabel>
          <Input
            id="year"
            placeholder="VD: Học tập"
            {...register("year", {
              required: "Không được để trống !!!",
            })}
          />
          <FormErrorMessage>
            {(errors.year as any) && errors?.year?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.year as any}>
          <FormLabel htmlFor="note" fontSize="15" fontWeight="semibold">
            ghi chú
          </FormLabel>
          <Textarea
            id="note"
            placeholder="VD: Học tập"
            {...register("note", {
              required: "Không được để trống !!!",
            })}
          />
          <FormErrorMessage>
            {(errors.note as any) && errors?.note?.message}
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
            onClose();
            handleReturnBox();
            reset();
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
          isLoading={isLoading}
        >
          Tạo mới
        </Button>
      </Flex>
    </form>
  );
};

export default CreateBoxView;
