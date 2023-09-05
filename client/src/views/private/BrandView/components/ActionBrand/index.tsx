import { useForm } from "react-hook-form";
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Flex, Textarea, Box } from "@chakra-ui/react";
import { CloseSmallIcon, PictureIcon } from "~/components/common/Icons";

type Props = {
    onClose: () => void;
};

const ActionBrand = ({ onClose }: Props) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    function onSubmit(values: any) {
        return new Promise((resolve: any) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resolve();
            }, 3000);
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
                flexDir="column"
                gap="4"
            >
                <FormControl isInvalid={errors.file as any}>
                    <Flex justifyContent="center">
                        <Box
                            w="100px"
                            h="100px"
                            bgColor="#f3f6f9"
                            rounded="md"
                            position="relative"
                        ></Box>
                        <Flex
                            as="span"
                            position="absolute"
                            top="86px"
                            right="200px"
                            w="8"
                            h="8"
                            borderWidth="1px"
                            borderColor="#878a99"
                            alignItems="center"
                            justifyContent="center"
                            rounded="full"
                            bgColor="#f3f6f9"
                        >
                            <FormLabel
                                htmlFor="file"
                                w="8"
                                h="8"
                                m="0"
                                display="inline-flex"
                                justifyContent="center"
                                alignItems="center"
                                cursor="pointer"
                            >
                                <PictureIcon
                                    size={4}
                                    color="#878a99"
                                />
                            </FormLabel>
                        </Flex>
                    </Flex>
                    <Input
                        id="file"
                        placeholder="VD: Dell"
                        size="lager"
                        type="file"
                        display="none"
                        {...register("file", {
                            required: "Không được để trống !!!",
                        })}
                    />

                    <FormErrorMessage>{(errors.file as any) && errors?.file?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name as any}>
                    <FormLabel
                        htmlFor="name"
                        fontSize="sm"
                    >
                        Thương hiệu
                    </FormLabel>
                    <Input
                        id="name"
                        placeholder="VD: Dell"
                        size="lager"
                        {...register("name", {
                            required: "Không được để trống !!!",
                        })}
                    />
                    <FormErrorMessage>{(errors.name as any) && errors?.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description as any}>
                    <FormLabel
                        fontSize="sm"
                        htmlFor="description"
                    >
                        Mô tả
                    </FormLabel>
                    <Textarea
                        id="description"
                        size="lager"
                        p="4"
                        border="1px solid"
                        borderWidth="text.black"
                        rounded="4px"
                        fontSize="sm"
                        boxShadow="none"
                        placeholder="VD: thuong hieu..."
                        _hover={{
                            border: "1px solid",
                            borderWidth: "text.black",
                            boxShadow: "none",
                        }}
                        _focus={{
                            border: "1px solid",
                            borderWidth: "text.black",
                            boxShadow: "none",
                        }}
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
                >
                    Tạo mới
                </Button>
            </Flex>
        </form>
    );
};

export default ActionBrand;