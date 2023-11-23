import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useFieldArray } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AddAdminIcon, CloseSmallIcon } from "~/components/common/Icons";
import { useState } from "react";

type Props = {
  register?: any;
  control?: any;
  errors?: any;
  setValue?: any;
  getValues?: any;
};

const AttributeNested = ({ nestIndex, control, register, errors }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `attributes.${nestIndex}.items`,
  });

  return (
    <Box w="full" h="auto">
      <Flex
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
          return (
            <Flex gap="4" w="full" key={item?.id}>
              <Flex flex="1" gap="3" flexDir="column" mb="2">
                <FormControl
                  isInvalid={
                    errors?.attributes?.[nestIndex]?.items?.[k]?.label as any
                  }
                >
                  <FormLabel fontSize="sm" fontWeight="semibold">
                    Chi tiết
                  </FormLabel>
                  <Input
                    size="small"
                    {...register(`attributes.${nestIndex}.items.${k}.label`, {
                      required: "Không được để trống",
                    })}
                    placeholder="Kích thước/Cao tối đa lưng ghế,..."
                    borderColor={
                      errors?.attributes?.[nestIndex]?.items?.[k]?.label
                        ? "border.error"
                        : "transparent"
                    }
                  />
                  <FormErrorMessage>
                    {(errors?.attributes?.[nestIndex]?.items?.[k]
                      ?.label as any) &&
                      errors?.attributes?.[nestIndex]?.items?.[k]?.label
                        ?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    errors?.attributes?.[nestIndex]?.items?.[k]?.value as any
                  }
                >
                  <Input
                    size="small"
                    {...register(`attributes.${nestIndex}.items.${k}.value`, {
                      required: "Không được để trống",
                    })}
                    placeholder="66cm, 55cm,..."
                    borderColor={
                      errors?.attributes?.[nestIndex]?.items?.[k]?.value
                        ? "border.error"
                        : "transparent"
                    }
                  />
                  <FormErrorMessage>
                    {(errors?.attributes?.[nestIndex]?.items?.[k]
                      ?.value as any) &&
                      errors?.attributes?.[nestIndex]?.items?.[k]?.value
                        ?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={() => remove(k)}
                w="4"
                bgColor="bg.admin"
                rounded="full"
              >
                <Flex
                  w="full"
                  h="4"
                  mt="6"
                  bgColor="bg.bgDelete"
                  rounded="full"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CloseSmallIcon
                    size={3}
                    color="text.textDelete"
                    strokeWidth={1.5}
                  />
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Button
        mt="4"
        bgColor="text.textSuccess"
        size="small"
        fontWeight="medium"
        px="4"
        // leftIcon={<AddAdminIcon size={4} />}
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
    </Box>
  );
};

const Attributes = ({
  control,
  register,
  errors,
  setValue,
  getValues,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const { fields, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  return (
    <Box>
      <Box>
        <Checkbox onChange={(e) => setShow(e.target.checked)}>
          <Text fontSize="13px" fontWeight="semibold">
            Sản phẩm có nhiều thông tin đặc điểm khác nhau. Ví dụ thông tin
            hàng, ram,...
          </Text>
        </Checkbox>
      </Box>
      {show && (
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
            {fields.map((item, index) => {
              return (
                <GridItem key={item.id}>
                  <Flex
                    bgColor="bg.gray"
                    px="6"
                    py="5"
                    rounded="lg"
                    position="relative"
                    gap="6"
                  >
                    <Flex flex="1" justifyContent="flex-start">
                      <Flex gap="4" flexDir="column" w="full">
                        <FormControl
                          isInvalid={
                            errors?.attributes?.[index]?.group_name as any
                          }
                        >
                          <FormLabel fontSize="sm" fontWeight="semibold">
                            Đặc điểm
                          </FormLabel>
                          <Input
                            size="small"
                            {...register(`attributes.${index}.group_name`, {
                              required: "Không để trống",
                            })}
                            placeholder="Thiết kế, Kích thước & Trọng lượng, ..."
                            borderColor={
                              errors?.attributes?.[index]?.group_name
                                ? "border.error"
                                : "transparent"
                            }
                          />
                          <FormErrorMessage>
                            {(errors?.attributes?.[index]?.group_name as any) &&
                              errors?.attributes?.[index]?.group_name?.message}
                          </FormErrorMessage>
                        </FormControl>
                      </Flex>
                    </Flex>

                    {/* Thuộc tính lồng nhau */}
                    <Flex flex="2">
                      <AttributeNested
                        nestIndex={index}
                        control={control}
                        register={register}
                        errors={errors}
                      />
                    </Flex>
                    <Flex
                      position="absolute"
                      top="2"
                      right="2"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      onClick={() => remove(index)}
                      w="5"
                      h="5"
                      bgColor="bg.bgDelete"
                      rounded="full"
                    >
                      <CloseSmallIcon
                        size={4}
                        color="text.textDelete"
                        strokeWidth={1.5}
                      />
                    </Flex>
                  </Flex>
                </GridItem>
              );
            })}
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
              setValue("attributes", [
                ...(getValues().attributes || []),
                {
                  group_name: "",
                  items: [{ label: "", value: "" }],
                },
              ]);
            }}
          >
            Tạo đặc điểm
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Attributes;
