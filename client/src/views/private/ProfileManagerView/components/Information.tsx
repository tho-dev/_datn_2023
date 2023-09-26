import {
  Flex,
  Box,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Radio,
  RadioGroup,
  Image,
  Button,
  Divider,
  Spacer,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Information = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <Box>
      <Box
        w={"100%"}
        h={40}
        bg={"#b3e7ff"}
        borderRadius={"6px"}
        position={"relative"}
      >
        <Box position={"absolute"} top="50%" left="45%">
          <Image
            borderRadius="full"
            boxSize="150px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Text textAlign="center" mt={4} fontSize="18" fontWeight="bold">
            Truong Nguyen
          </Text>
        </Box>
      </Box>
      <Box w={"100%"} h={"52"} bg={"#ffff"} borderBottomRadius={"6px"}>
        <Text p={"90px 0 15px 25px"} fontSize="16" fontWeight="bold">
          Who can see your profile ?
        </Text>
        <Select
          pl={"25px"}
          color={"#797a7b"}
          fontSize={16}
          fontWeight={600}
          w={"xs"}
          borderRadius={"md"}
        >
          <option value="option1">Anyone</option>
          <option value="option2">Only one</option>
        </Select>
      </Box>

      <Box
        mt={7}
        w={"100%"}
        bg={"#ffff"}
        borderRadius={"6px"}
        p={5}
        fontSize={14}
      >
        <Text fontSize={16} fontWeight={700} mb={5}>
          Basic information
        </Text>
        <Divider />

        {/* Full name  */}
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Tên đầy đủ
          </GridItem>
          <GridItem colSpan={3}>
            <Grid
              templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(1, 1fr)",
                xl: "repeat(31, 1fr)",
              }}
            >
              <GridItem colSpan={15}>
                <FormControl isInvalid={errors.firstName as any}>
                  <Input
                    fontSize={14}
                    id="firstName"
                    placeholder="firstName"
                    size="lager"
                    {...register("firstName", {
                      required: "Không được để trống !!!",
                    })}
                  />
                  <FormErrorMessage>
                    {(errors.firstName as any) && errors?.firstName?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <Spacer />
              <GridItem colSpan={15}>
                <FormControl isInvalid={errors.lastName as any}>
                  <Input
                    fontSize={14}
                    id="lastName"
                    placeholder="lastName"
                    size="lager"
                    {...register("lastName", {
                      required: "Không được để trống !!!",
                    })}
                  />
                  <FormErrorMessage>
                    {(errors.lastName as any) && errors?.lastName?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>

        {/* Email */}
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Email
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.email as any}>
              <Input
                fontSize={14}
                id="email"
                placeholder="abc@gmail.com"
                size="lager"
                {...register("email", {
                  required: "Không được để trống !!!",
                })}
                disabled
              />
              <FormErrorMessage>
                {(errors.email as any) && errors?.email?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        {/* ngày tháng năm sinh */}
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem colSpan={1}>
            <Flex>
              <Text fontWeight={600} color={"#797a7b"} mr={2}>
                Ngày tháng năm sinh
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.phone as any}>
              <Input
                fontSize={14}
                id="phone"
                placeholder="09/10/1997"
                size="lager"
                {...register("phone", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.phone as any) && errors?.phone?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        {/* Phone */}
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem colSpan={1}>
            <Flex>
              <Text fontWeight={600} color={"#797a7b"} mr={2}>
                Điện thoại
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.phone as any}>
              <Input
                fontSize={14}
                id="phone"
                placeholder="(+84)XXX XXX XXX"
                size="lager"
                {...register("phone", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.phone as any) && errors?.phone?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        {/* Department */}
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Vị trí
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.department as any}>
              <Input
                fontSize={14}
                id="department"
                placeholder="Admin"
                size="lager"
                {...register("department", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.department as any) && errors?.department?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        {/* Account type */}
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Tài khoản
          </GridItem>
          <GridItem colSpan={3}>
            <RadioGroup defaultValue="company">
              <HStack
                spacing="24px"
                fontSize={14}
                color={"gray.500"}
                fontWeight={"medium"}
              >
                <Radio value="customer">Khách hàng</Radio>
                <Radio value="company">Công ty</Radio>
              </HStack>
            </RadioGroup>
          </GridItem>
        </Grid>

        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Địa chỉ
          </GridItem>
          <GridItem colSpan={3}>
            {/* state */}
            <FormControl isInvalid={errors.state as any}>
              <Input
                fontSize={14}
                id="state"
                placeholder="Địa chỉ"
                size="lager"
                {...register("state", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.state as any) && errors?.state?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Mã code
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.zipCode as any}>
              <Input
                fontSize={14}
                id="zipCode"
                placeholder="Mã code của bạn"
                size="lager"
                {...register("zipCode", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>
                {(errors.zipCode as any) && errors?.zipCode?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          m={"20px 0 0 auto"}
        >
          Lưu thay đổi
        </Button>
      </Box>
    </Box>
  );
};

export default Information;
