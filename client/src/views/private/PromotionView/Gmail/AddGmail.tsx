import { Box, Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useDisclosure,
  useToast,
  Select,
  Button,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Link, Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import QuillThinkPro from "~/components/QuillThinkPro";
import { v4 as uuidv4 } from "uuid";
import { useAddMutation } from "~/redux/api/ads";

type Props = {};

const AddGmailView = (props: Props) => {
  const [add, { isLoading }] = useAddMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    const jobId = uuidv4();
    const new_array_email = data.email.split(",");
    const new_data = {
      ...data,
      email: new_array_email,
      jobId,
    };
    add(new_data)
      .unwrap()
      .then((data) => {
        toast({
          title: "Hệ thống",
          duration: 1600,
          position: "bottom-right",
          status: "success",
          description: data.message,
        });
        reset();
        navigate("/admin/khuyen-mai/gmail");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const content = watch("content");

  const onEditorStateChangeContent = (value: any) => {
    setValue("content", value);
  };
  return (
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="lg">
      <Flex alignItems="center" justifyContent="space-between" pb="5">
        <Heading as="h2" fontSize="18px" fontWeight="semibold">
          Chiến dịch quảng cáo
        </Heading>
        <Box>
          <Breadcrumb spacing="8px" separator="/" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink as={ReactRouterLink} to="/admin">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/admin/tai-khoan">
                Chiến dịch quảng cáo
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </Flex>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            gap={{
              xl: "6",
            }}
            templateColumns={{
              xl: "repeat(3, 1fr)",
            }}
          >
            <GridItem colSpan={2}>
              <Flex
                flexDir="column"
                gap="4"
                bgColor="white"
                my={4}
                padding="16px 24px"
                borderRadius={6}
                w={"100%"}
                boxShadow="lg"
              >
                {/* Đến */}
                <FormControl isInvalid={errors.email as any}>
                  <FormLabel
                    htmlFor="email"
                    fontSize="15"
                    fontWeight="semibold"
                  >
                    Đến
                  </FormLabel>
                  <Input
                    id="email"
                    placeholder="Đến"
                    {...register("email", {
                      required: "Không được để trống !!!",
                    })}
                    type="text"
                  />
                  <FormErrorMessage>
                    {(errors.email as any) && errors?.email?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.title as any}>
                  <FormLabel
                    htmlFor="title"
                    fontSize="15"
                    fontWeight="semibold"
                  >
                    Tiêu đề
                  </FormLabel>
                  <Input
                    id="title"
                    placeholder="Tiêu đề"
                    {...register("title", {
                      required: "Không được để trống !!!",
                    })}
                  />
                  <FormErrorMessage>
                    {(errors.title as any) && errors?.title?.message}
                  </FormErrorMessage>
                </FormControl>
                {/* thời gian */}
                <Flex alignItems="center" gap={4}>
                  <FormControl isInvalid={errors.startDate as any}>
                    <FormLabel
                      htmlFor="startDate"
                      fontSize="15"
                      fontWeight="semibold"
                    >
                      Từ ngày
                    </FormLabel>
                    <Input
                      id="startDate"
                      placeholder="Thời gian bắt đầu"
                      {...register("startDate", {
                        required: "Không được để trống !!!",
                      })}
                      type="date"
                    />
                    <FormErrorMessage>
                      {(errors.startDate as any) && errors?.startDate?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.endDate as any}>
                    <FormLabel
                      htmlFor="endDate"
                      fontSize="15"
                      fontWeight="semibold"
                    >
                      Đến ngày
                    </FormLabel>
                    <Input
                      id="endDate"
                      placeholder="Thời gian kết thúc"
                      {...register("endDate", {
                        required: "Không được để trống !!!",
                      })}
                      type="date"
                    />
                    <FormErrorMessage>
                      {(errors.endDate as any) && errors?.endDate?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <FormControl isInvalid={errors.sendTime as any}>
                  <FormLabel
                    htmlFor="sendTime"
                    fontSize="15"
                    fontWeight="semibold"
                  >
                    Thời gian gửi
                  </FormLabel>
                  <Input
                    id="sendTime"
                    placeholder="Thời gian gửi"
                    {...register("sendTime", {
                      required: "Không được để trống !!!",
                    })}
                    type="time"
                  />
                  <FormErrorMessage>
                    {(errors.sendTime as any) && errors?.sendTime?.message}
                  </FormErrorMessage>
                </FormControl>
                {/* content */}
                <FormControl isInvalid={errors.content as any}>
                  <FormLabel
                    fontSize="15"
                    htmlFor="content"
                    fontWeight="semibold"
                  >
                    Nội dung
                  </FormLabel>
                  <QuillThinkPro
                    data={content}
                    onEditorStateChange={onEditorStateChangeContent as any}
                  />
                  <FormErrorMessage>
                    {(errors.content as any) && errors?.content?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <Flex gap="3" justifyContent="flex-end" mt="6">
                <Button
                  type="submit"
                  bgColor="text.textSuccess"
                  textColor="text.white"
                  fontWeight="bold"
                  px="4"
                  isLoading={isLoading}
                  loadingText="Đang tạo chiến dịch..."
                >
                  Tạo chiến dịch
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddGmailView;
