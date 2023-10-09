import { useForm } from "react-hook-form";
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
} from "@chakra-ui/react";
import { CloseSmallIcon } from "~/components/common/Icons";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import SelectThinkPro from "~/components/SelectThinkPro";
import { useCreateBrandMutation, useUpdateBrandMutation } from "~/redux/api/brand";

type Props = {
    onClose: () => void;
    parents: any;
    brand: any;
};

const categories = [
    {
        label: "Laptop",
        value: "6518080f58756a72b08947e2",
    },
    {
        label: "Bàn phím",
        value: "6518080f58756a72b08947e4",
    },
    {
        label: "Màn hình",
        value: "6518080f58756a72b08947e8",
    },
];

const ActionUpdateBrand = ({ onClose, parents, brand }: Props) => {
    const toast = useToast();
    const {
        control,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        defaultValues: brand,
    });

    const [updateBrand, { isLoading }] = useUpdateBrandMutation();

    const onSubmit = async (data: any) => {
        data = {
            ...data,
            parent_id: data?.parent_id?.value,
            category_id: data?.category_id?.value,
        };

        try {
            await updateBrand(data).unwrap();
            toast({
                title: "Thành công",
                duration: 1600,
                position: "top-right",
                status: "success",
                description: "Cập nhật danh mục thành công",
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

        reset();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
                flexDir="column"
                gap="4"
            >
                <FormControl isInvalid={errors.file as any}>
                    <Flex
                        justifyContent="center"
                        mt="8"
                    >
                        <Box
                            w="120px"
                            h="120px"
                        >
                            <FileUploadThinkPro
                                fileName="brand"
                                getDataFn={(data: any) => setValue("thumbnail", data)}
                                setData={watch("thumbnail")}
                            />
                        </Box>
                    </Flex>

                    <FormErrorMessage>{(errors.thumbnail as any) && errors?.thumbnail?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name as any}>
                    <FormLabel
                        htmlFor="name"
                        fontSize="15"
                        fontWeight="semibold"
                    >
                        Thương hiệu
                    </FormLabel>
                    <Input
                        id="name"
                        placeholder="VD: Dell"
                        {...register("name", {
                            required: "Không được để trống !!!",
                        })}
                    />
                    <FormErrorMessage>{(errors.name as any) && errors?.name?.message}</FormErrorMessage>
                </FormControl>
                {/* danh mục cha */}
                <SelectThinkPro
                    control={control}
                    name="parent_id"
                    title="Thương hiệu cha"
                    placeholder="-- Thương hiệu cha --"
                    data={parents}
                />
                {/* danh muc */}
                <SelectThinkPro
                    control={control}
                    name="category_id"
                    title="Danh mục"
                    placeholder="-- Danh mục --"
                    data={categories}
                    rules={{ required: "Không được để trống" }}
                />
                <FormControl isInvalid={errors.description as any}>
                    <FormLabel
                        fontSize="15"
                        htmlFor="description"
                        fontWeight="semibold"
                    >
                        Mô tả
                    </FormLabel>
                    <Textarea
                        id="description"
                        size="lager"
                        p="4"
                        rounded="4px"
                        fontSize="sm"
                        boxShadow="none"
                        placeholder="VD: thuong hieu..."
                        {...register("description", {
                            required: "Không được để trống !!!",
                        })}
                    />
                    <FormErrorMessage>{(errors.description as any) && errors?.description?.message}</FormErrorMessage>
                </FormControl>
            </Flex>
            <Flex
                gap="3"
                justifyContent="flex-end"
                mt="6"
            >
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
                    isLoading={isLoading}
                >
                    Cập Nhật
                </Button>
            </Flex>
        </form>
    );
};

export default ActionUpdateBrand;