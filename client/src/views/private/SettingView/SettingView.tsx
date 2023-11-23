import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import CommonBox from "./components/CommonBox";
import { useEffect, useState } from "react";
import {
  useGetGeneralQuery,
  useUpdateGeneralMutation,
} from "~/redux/api/general";

const SettingView = () => {
  const toast = useToast();
  const [defaultData, setDefaultData] = useState<any>();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    mode: "onTouched",
    defaultValues: defaultData,
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "branch",
  });

  const { data: general } = useGetGeneralQuery({});
  const [updateGeneral] = useUpdateGeneralMutation();

  useEffect(() => {
    if (general) {
      setDefaultData(general?.data);
      reset(general?.data);
    }
  }, [general]);

  const onSubmit = async (data: any) => {
    try {
      await updateGeneral(data).unwrap();
      toast({
        status: "success",
        title: "Thành công",
        description: "Cập nhật cấu hình thành công",
        duration: 1600,
        position: "top-right",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Có lỗi",
        description: "Cập nhật cấu hình thất bại",
        duration: 1600,
        position: "top-right",
      });
    }
  };

  return (
    <Box px="6" py="8" bgColor="bg.white" rounded="lg">
      <Heading fontSize="lg" fontWeight="semibold" textTransform="uppercase">
        Cấu Hình Chung
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid mt="6" gap="8" templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={7}>
            <Flex flex="1" flexDir="column" gap="6">
              <CommonBox title="Website">
                <Flex gap="4" flexDir="column">
                  <FormControl isInvalid={errors?.banner_title as any}>
                    <FormLabel
                      htmlFor="title"
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      Tiêu đề
                    </FormLabel>
                    <Input
                      id="banner_title"
                      {...register("banner_title", {
                        required: "Không được để trống",
                      })}
                      placeholder="..."
                      borderColor={errors?.banner_title && "red.500"}
                    />
                    <FormErrorMessage>
                      {(errors?.banner_title as any) &&
                        errors?.banner_title?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.banner_description as any}>
                    <FormLabel
                      htmlFor="title"
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      Mô tả
                    </FormLabel>
                    <Input
                      id="banner_description"
                      {...register("banner_description", {
                        required: "Không được để trống",
                      })}
                      placeholder="..."
                      borderColor={errors?.banner_description && "red.500"}
                    />
                    <FormErrorMessage>
                      {(errors?.banner_description as any) &&
                        errors?.banner_description?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Flex gap="4">
                    <FormControl isInvalid={errors?.banner_color as any}>
                      <FormLabel
                        htmlFor="title"
                        fontSize="sm"
                        fontWeight="semibold"
                      >
                        Màu chữ
                      </FormLabel>
                      <Input
                        id="banner_color"
                        {...register("banner_color", {
                          required: "Không được để trống",
                        })}
                        placeholder="..."
                        borderColor={errors?.banner_color && "red.500"}
                      />
                      <FormErrorMessage>
                        {(errors?.banner_color as any) &&
                          errors?.banner_color?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={errors?.banner_background_color as any}
                    >
                      <FormLabel
                        htmlFor="title"
                        fontSize="sm"
                        fontWeight="semibold"
                      >
                        Màu nền
                      </FormLabel>
                      <Input
                        id="banner_background_color"
                        {...register("banner_background_color", {
                          required: "Không được để trống",
                        })}
                        placeholder="..."
                        borderColor={
                          errors?.banner_background_color && "red.500"
                        }
                      />
                      <FormErrorMessage>
                        {(errors?.banner_background_color as any) &&
                          errors?.banner_background_color?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Flex gap="6">
                    <FormControl
                      w="max-content"
                      isInvalid={errors?.logo as any}
                    >
                      <FormLabel
                        htmlFor="title"
                        fontSize="sm"
                        fontWeight="semibold"
                      >
                        Logo
                      </FormLabel>

                      <Flex>
                        <Box w="120px" h="120px" rounded="full">
                          <FileUploadThinkPro
                            fileName="banner"
                            getDataFn={(data) => setValue("logo", data)}
                            setData={watch("logo")}
                          />
                        </Box>
                      </Flex>

                      <FormErrorMessage>
                        {(errors?.logo as any) && errors?.logo?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      flex="1"
                      isInvalid={errors?.banner_thumbnail as any}
                    >
                      <FormLabel
                        htmlFor="title"
                        fontSize="sm"
                        fontWeight="semibold"
                      >
                        Banner
                      </FormLabel>

                      <Flex>
                        <Box w="full" h="200px" rounded="full">
                          <FileUploadThinkPro
                            fileName="banner"
                            getDataFn={(data) =>
                              setValue("banner_thumbnail", data)
                            }
                            setData={watch("banner_thumbnail")}
                          />
                        </Box>
                      </Flex>

                      <FormErrorMessage>
                        {(errors?.banner_thumbnail as any) &&
                          errors?.banner_thumbnail?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </Flex>
              </CommonBox>
              <CommonBox title="Thông Tin SEO">
                <Flex gap="4" flexDir="column">
                  <FormControl isInvalid={errors?.meta_title as any}>
                    <FormLabel
                      htmlFor="meta_title"
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      Tiêu đề trang
                    </FormLabel>
                    <Input
                      id="meta_title"
                      {...register("meta_title", {
                        required: "Không được để trống",
                      })}
                      placeholder="..."
                      borderColor={errors?.meta_title && "red.500"}
                    />
                    <FormErrorMessage>
                      {(errors?.meta_title as any) &&
                        errors?.meta_title?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.meta_keyword as any}>
                    <FormLabel
                      htmlFor="meta_keyword"
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      Từ khóa
                    </FormLabel>
                    <Input
                      id="meta_keyword"
                      {...register("meta_keyword", {
                        required: "Không được để trống",
                      })}
                      placeholder="..."
                      borderColor={errors?.meta_keyword && "red.500"}
                    />
                    <FormErrorMessage>
                      {(errors?.meta_keyword as any) &&
                        errors?.meta_keyword?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.meta_slug as any}>
                    <FormLabel
                      htmlFor="meta_slug"
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      Đường dẫn trang
                    </FormLabel>
                    <Input
                      id="meta_slug"
                      {...register("meta_slug", {
                        required: "Không được để trống",
                      })}
                      placeholder="..."
                      borderColor={errors?.meta_slug && "red.500"}
                    />
                    <FormErrorMessage>
                      {(errors?.meta_slug as any) && errors?.meta_slug?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.meta_description as any}>
                    <FormLabel
                      htmlFor="meta_description"
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      Mô tả trang
                    </FormLabel>
                    <Input
                      id="meta_description"
                      {...register("meta_description", {
                        required: "Không được để trống",
                      })}
                      placeholder="..."
                      borderColor={errors?.meta_description && "red.500"}
                    />
                    <FormErrorMessage>
                      {(errors?.meta_description as any) &&
                        errors?.meta_description?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </CommonBox>
            </Flex>
          </GridItem>

          <GridItem colSpan={5}>
            <Flex flexDir="column" flex="1" gap="6">
              <CommonBox title="Các chi nhánh">
                <Box>
                  <Flex gap="6" flexDir="column">
                    {fields.map((field: any, index) => {
                      return (
                        <Box
                          px="4"
                          py="6"
                          key={field.id}
                          rounded="lg"
                          borderWidth="1px"
                          borderColor="#eef1f6"
                          boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
                        >
                          <Flex justifyContent="space-between">
                            <Heading
                              color="text.textDelete"
                              fontSize="md"
                              fontWeight="bold"
                            >
                              ✔ Chi nhánh {index + 1}
                            </Heading>

                            <Button
                              onClick={() => remove(index)}
                              size="small"
                              px="4"
                              bgColor="bg.bgDelete"
                              color="text.textDelete"
                            >
                              Xóa
                            </Button>
                          </Flex>
                          <Flex mt="2" gap="3" flexDir="column">
                            <FormControl>
                              <FormLabel fontSize="sm" fontWeight="semibold">
                                Thành phố
                              </FormLabel>
                              <Input
                                {...register(`branch.${index}.city`, {
                                  required: "Không được để trống",
                                })}
                                placeholder="Thành phố Hồ Chí Minh, ..."
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel fontSize="sm" fontWeight="semibold">
                                Địa chỉ
                              </FormLabel>
                              <Input
                                {...register(`branch.${index}.address`, {
                                  required: "Không được để trống",
                                })}
                                placeholder="Số 5 - 7 Nguyễn Huy Tưởng, F6, Q. Bình Thạnh, .."
                              />
                            </FormControl>
                            <Flex gap="4">
                              <FormControl>
                                <FormLabel
                                  htmlFor="title"
                                  fontSize="sm"
                                  fontWeight="semibold"
                                >
                                  Thời gian mở cửa
                                </FormLabel>
                                <Input
                                  {...register(`branch.${index}.time_open`, {
                                    required: "Không được để trống",
                                  })}
                                  placeholder="9:00, .."
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel
                                  htmlFor="title"
                                  fontSize="sm"
                                  fontWeight="semibold"
                                >
                                  Thời gian đóng cửa
                                </FormLabel>
                                <Input
                                  id="banner_title"
                                  {...register(`branch.${index}.time_close`, {
                                    required: "Không được để trống",
                                  })}
                                  placeholder="22:00, ..."
                                />
                              </FormControl>
                            </Flex>
                            <FormControl>
                              <FormLabel
                                htmlFor="title"
                                fontSize="sm"
                                fontWeight="semibold"
                              >
                                Trạng thái
                              </FormLabel>
                              <Switch defaultChecked />
                            </FormControl>
                            <FormControl>
                              <FormLabel
                                htmlFor="title"
                                fontSize="sm"
                                fontWeight="semibold"
                              >
                                Map
                              </FormLabel>
                              <Input
                                {...register(`branch.${index}.map`, {
                                  required: "Không được để trống",
                                })}
                                placeholder="https://www.google.com/maps/place/ThinkPro+-+95+Tr%E1%BA%A7n+Thi%E1%BB%87n+Ch%C3%A1nh,+P12,+Q10,+TP+HCM/@10.7720769,106.6680882,17z/data=!3m1!4b1!4m5!3m4!1s0x31752fea4b76a251:0x3b34f5af9212aadc!8m2!3d10.7720769!4d106.6702769."
                              />
                            </FormControl>
                          </Flex>
                        </Box>
                      );
                    })}
                  </Flex>
                  <Button
                    mt="4"
                    size="small"
                    bgColor="bg.bgSuccess"
                    color="text.textSuccess"
                    onClick={() => {
                      setValue("branch", [
                        ...(getValues().branch || []),
                        {
                          city: "",
                          time_open: "",
                          time_close: "",
                          map: "",
                          address: "",
                          status: true,
                        },
                      ]);
                    }}
                  >
                    Thêm chi nhánh
                  </Button>
                </Box>
              </CommonBox>
            </Flex>
          </GridItem>
        </Grid>

        <Flex
          position="fixed"
          bottom="2"
          left="50%"
          zIndex="999"
          transform="translateX(calc(50% - 260px))"
          w="full"
          maxW="400px"
          bgColor="bg.white"
          px="6"
          py="4"
          rounded="lg"
          justifyContent="space-around"
          borderWidth="1px"
          borderColor="#eef1f6"
          boxShadow="0 0.375rem 0.75rem rgba(140,sm2,164,.075)"
        >
          <Button
            w={"40"}
            bgColor="bg.bgDelete"
            color="text.textDelete"
            onClick={() => reset()}
          >
            Hủy
          </Button>
          <Button
            w={"40"}
            isLoading={isSubmitting}
            type="submit"
            bgColor="bg.bgEdit"
            color="text.textEdit"
          >
            Cập Nhật
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default SettingView;
