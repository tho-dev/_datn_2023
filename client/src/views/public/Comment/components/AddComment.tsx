import { useForm } from "react-hook-form";
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Flex, Text, Textarea, Box, Image } from "@chakra-ui/react";
import { CloseSmallIcon, PictureIcon, Star } from "~/components/common/Icons";

type Props = {
    onClose: () => void;
};

const AddComment = ({ onClose }: Props) => {
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
                <Text fontSize={30} fontWeight={700}>Đánh giá sản phẩm</Text>
                <Flex>
                    <Image w={20} src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png" />
                    <Text
                        fontWeight={"bold"} ml={2}
                    >Bàn Phím Cơ Gaming không dây GK65 chống ồn - Bluetooth + USB - Pin sạc TypeC - kết nối nhiều thiết bị</Text>
                </Flex>
                <Flex>
                    <Text
                        mr={"45px"}
                    >Chất lượng sản phẩm</Text>
                    <Star size={6} />
                    <Star size={6} />
                    <Star size={6} />
                    <Star size={6} />
                    <Star size={6} />
                    <Text
                        color={"#ffc400"} ml={2}
                    >Tuyệt vời</Text>

                </Flex>

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
                <FormControl isInvalid={errors.name as any} mt={7}>
                    {/* <FormLabel
                        htmlFor="name"
                        fontSize="sm"
                    >
                        Vui lòng đánh giá
                    </FormLabel> */}
                    <Textarea
                    h={30}
                        id="name"
                        placeholder="Hãy chia sẻ cảm nhận đánh giá của bạn về sản phẩm này nhé"
                        size="lager"
                        {...register("name", {
                            required: "Không được để trống !!!",
                        })}
                    />
                    <FormErrorMessage>{(errors.name as any) && errors?.name?.message}</FormErrorMessage>
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
                    Gửi đánh giá
                </Button>
            </Flex>
        </form>
    );
};

export default AddComment;