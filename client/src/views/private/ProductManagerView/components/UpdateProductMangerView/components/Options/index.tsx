import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray } from "react-hook-form";
import slugify from "react-slugify";
import {
  AddAdminIcon,
  AppOptionIcon,
  TrashIcon,
} from "~/components/common/Icons";
import {
  useDeleteOptionProductMutation,
  useSaveVariantsMutation,
} from "~/redux/api/product";

type Props = {
  register?: any;
  control?: any;
  errors?: any;
  watch?: any;
  setValue?: any;
  getValues?: any;
  resetField?: any;
};

const OptionNested = ({ nestIndex, control, register, errors, watch }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `variants.${nestIndex}.options`,
  });

  const isDisabled = watch(`variants.${[nestIndex]}.option_id`) ? true : false;

  return (
    <Box w="full" h="auto">
      <Flex
        gap="3"
        flexDir="column"
        alignItems="flex-end"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            height: "32px !important",
            borderRadius: "24px",
            backgroundColor: "#e6e6e6",
          },
        }}
      >
        {fields?.map((item, k) => {
          const checkColor =
            slugify(watch(`variants.${[nestIndex]}.name.label`)) == "mau" ||
            slugify(watch(`variants.${[nestIndex]}.name.label`)) == "color";

          return (
            <Flex gap="4" w="full" key={item?.id} alignItems="flex-end">
              <Flex flex="1" flexDir="column">
                <Box>
                  <FormLabel fontSize="sm" fontWeight="semibold">
                    Nhãn
                  </FormLabel>
                </Box>
                <Flex gap="2">
                  <FormControl
                    isInvalid={
                      errors?.variants?.[nestIndex]?.options?.[k]?.label as any
                    }
                  >
                    <Input
                      disabled={isDisabled}
                      size="small"
                      {...register(`variants.${nestIndex}.options.${k}.label`, {
                        required: "Không được để trống",
                      })}
                      bgColor="transparent"
                      placeholder="Thêm label nhãn mới"
                      borderColor={
                        errors?.variants?.[nestIndex]?.options?.[k]?.label
                          ? "border.error"
                          : "border.primary"
                      }
                    />
                    <FormErrorMessage>
                      {(errors?.variants?.[nestIndex]?.options?.[k]
                        ?.label as any) &&
                        errors?.variants?.[nestIndex]?.options?.[k]?.label
                          ?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      errors?.variants?.[nestIndex]?.options?.[k]?.value as any
                    }
                  >
                    <Flex alignItems="center" gap="4">
                      <Input
                        disabled={isDisabled}
                        size="small"
                        {...register(
                          `variants.${nestIndex}.options.${k}.value`,
                          {
                            required: "Không được để trống",
                          }
                        )}
                        bgColor="transparent"
                        placeholder="Thêm value nhãn mới"
                        borderColor={
                          errors?.variants?.[nestIndex]?.options?.[k]?.value
                            ? "border.error"
                            : "border.primary"
                        }
                        type={checkColor ? "color" : "text"}
                        w={checkColor ? "40px" : "full"}
                        p={checkColor ? "0" : "auto"}
                      />

                      {checkColor && (
                        <Text
                          my="1"
                          fontWeight="medium"
                          fontSize="13px"
                          px="2"
                          py="1"
                          rounded="2px"
                          bgColor={watch(
                            `variants.${nestIndex}.options.${k}.value`
                          )}
                          color="white"
                          display="inline-block"
                        >
                          {watch(`variants.${nestIndex}.options.${k}.value`)}
                        </Text>
                      )}
                    </Flex>

                    <FormErrorMessage>
                      {(errors?.variants?.[nestIndex]?.options?.[k]
                        ?.value as any) &&
                        errors?.variants?.[nestIndex]?.options?.[k]?.value
                          ?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </Flex>
              {!isDisabled && (
                <Flex
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  onClick={() => remove(k)}
                  rounded="md"
                  bgColor="bg.bgDelete"
                  w="10"
                  h="10"
                >
                  <TrashIcon
                    size={5}
                    strokeWidth={1.5}
                    color="text.textDelete"
                  />
                </Flex>
              )}
            </Flex>
          );
        })}
      </Flex>
      {!isDisabled && (
        <Button
          mt="4"
          bgColor="text.textSuccess"
          size="small"
          fontWeight="medium"
          px="4"
          _hover={{
            textDecor: "none",
          }}
          onClick={() =>
            append({
              label: "",
              value: "",
            })
          }
        >
          Xong
        </Button>
      )}
    </Box>
  );
};

const Options = ({
  control,
  register,
  errors,
  setValue,
  getValues,
  watch,
}: Props) => {
  const toast = useToast();
  const { fields, remove, move } = useFieldArray({
    control,
    name: "variants",
  });

  const handleDrag = ({ source, destination }: any) => {
    if (destination) {
      move(source.index, destination.index);
      fields.map((item: any, index: number) => {
        console.log(item);
        setValue(`variants.${[index]}.position`, index);
      });
    }
  };

  // xóa thuộc tính sản phẩm
  const [deleteOption] = useDeleteOptionProductMutation();
  // cập nhật lại biến thể
  const [saveVariant] = useSaveVariantsMutation();

  const handleDeleteOption = async (
    isDisabled: boolean,
    lengthOptions: number,
    index: number
  ) => {
    if (!isDisabled || lengthOptions <= 1) {
      const option_id = watch(`variants.${[index]}.option_id`);
      const product_id = watch(`_id`);

      if (option_id) {
        await deleteOption({
          product_id: product_id,
          option_id: option_id,
        } as any).unwrap();

        await saveVariant({
          product_id: product_id,
        });
      }

      remove(index);
    } else {
      toast({
        title: "Lỗi",
        description: "Không thể xóa thuộc tính có nhiều hơn 1 nhãn",
        status: "error",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box>
      <Text fontSize="13px" fontWeight="semibold">
        Sản phẩm này có nhiều biến thể. Ví dự như khác nhau về phiên bản, màu
        sắc
      </Text>
      <Box>
        <Grid
          gap="4"
          templateColumns="repeat(1, 1fr)"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              height: "32px !important",
              borderRadius: "24px",
              backgroundColor: "#e6e6e6",
            },
          }}
        >
          <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId="test-items">
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((item, index) => {
                    return (
                      <Draggable
                        key={`test[${index}]`}
                        draggableId={`item-${index}`}
                        index={index}
                      >
                        {(provided) => {
                          const isDisabled = watch(
                            `variants.${[index]}.option_id`
                          )
                            ? true
                            : false;

                          const lengthOptions = watch(
                            `variants.${[index]}.options`
                          )?.length;

                          return (
                            <GridItem
                              key={item.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <Flex
                                px="4"
                                py="5"
                                rounded="lg"
                                gap="6"
                                borderBottomWidth="1px"
                                borderColor="border.primary"
                              >
                                <Flex
                                  alignItems="center"
                                  {...provided.dragHandleProps}
                                >
                                  <AppOptionIcon size={6} />
                                </Flex>

                                <Flex
                                  flex="2"
                                  gap="4"
                                  w="full"
                                  justifyItems="flex-end"
                                  maxH="max-content"
                                >
                                  <Flex
                                    w="full"
                                    h="max-content"
                                    gap="4"
                                    alignItems="flex-end"
                                  >
                                    <Box flex="1">
                                      <FormLabel
                                        fontSize="sm"
                                        fontWeight="semibold"
                                      >
                                        Thuộc tính
                                      </FormLabel>
                                      <Flex gap="2">
                                        <FormControl
                                          isInvalid={
                                            errors?.variants?.[index].name
                                              ?.label
                                          }
                                        >
                                          <Input
                                            disabled={isDisabled}
                                            size="small"
                                            {...register(
                                              `variants.${[index]}.name.label`,
                                              {
                                                required: "Không được để trống",
                                              }
                                            )}
                                            bgColor="transparent"
                                            placeholder="Tên thuộc tính"
                                            borderColor={
                                              errors?.variants?.[index]?.name
                                                ?.label
                                                ? "border.error"
                                                : "border.primary"
                                            }
                                          />
                                          <FormErrorMessage>
                                            {(errors?.variants?.[index]?.name
                                              ?.label as any) &&
                                              errors?.variants?.[index]?.name
                                                ?.label?.message}
                                          </FormErrorMessage>
                                        </FormControl>
                                      </Flex>
                                    </Box>

                                    <Flex
                                      display="inline-flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      cursor="pointer"
                                      onClick={() =>
                                        handleDeleteOption(
                                          isDisabled,
                                          lengthOptions,
                                          index
                                        )
                                      }
                                      rounded="md"
                                      bgColor={
                                        !isDisabled || lengthOptions <= 1
                                          ? "bg.bgDelete"
                                          : "#f3f4f6"
                                      }
                                      w="10"
                                      h="10"
                                    >
                                      <TrashIcon
                                        size={5}
                                        strokeWidth={1.5}
                                        color={
                                          !isDisabled || lengthOptions <= 1
                                            ? "text.textDelete"
                                            : "#d1d5db"
                                        }
                                      />
                                    </Flex>
                                  </Flex>
                                </Flex>

                                <Flex flex="4">
                                  {/* Thuộc tính lồng nhau */}
                                  <OptionNested
                                    nestIndex={index}
                                    control={control}
                                    register={register}
                                    errors={errors}
                                    watch={watch}
                                  />
                                </Flex>
                              </Flex>
                            </GridItem>
                          );
                        }}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
        <Button
          bgColor="text.textSuccess"
          size="small"
          px="4"
          mt="4"
          leftIcon={<AddAdminIcon size={4} />}
          _hover={{
            textDecor: "none",
          }}
          onClick={() => {
            // Giới hạn thuộc tính
            if (fields?.length > 2) {
              toast({
                title: "Giới hạn",
                description: "Bạn chỉ có thể tạo tối đa 3 thuộc tính",
                status: "error",
                duration: 1200,
                isClosable: true,
                position: "top-right",
              });

              return;
            }

            setValue("variants", [
              ...(getValues().variants || []),
              {
                option_id: null,
                position: fields?.length,
                options: [{ label: "", value: "" }],
              },
            ]);
          }}
        >
          Thêm thuộc tính khác
        </Button>
      </Box>
    </Box>
  );
};

export default Options;
