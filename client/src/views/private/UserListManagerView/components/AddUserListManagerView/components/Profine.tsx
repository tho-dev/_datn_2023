import {
  FormLabel,
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
  Spacer,
  Button,
} from "@chakra-ui/react";
import { PictureIcon } from "~/components/common/Icons";
import { useForm } from "react-hook-form";

type Props = {
  handleNextStep: () => void;
};
const Profine = ({ handleNextStep }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <Box bgColor="white" my={8} padding="16px 24px" borderRadius={6}>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontSize={16} fontWeight={600} colSpan={1}>
          Avatar
        </GridItem>
        <GridItem colSpan={3}>
          <FormControl isInvalid={errors.file as any}>
            <Flex>
              <Box
                w="100px"
                h="100px"
                bgColor="#f3f6f9"
                rounded="md"
                position="relative"
                borderRadius="50%"
              ></Box>
              <Flex
                as="span"
                position="absolute"
                top="86px"
                left={"70px"}
                w="8"
                h="8"
                alignItems="center"
                rounded="full"
                bgColor="#f3f6f9"
              >
                <FormLabel
                  htmlFor="file"
                  display="inline-flex"
                  alignItems="center"
                  cursor="pointer"
                >
                  <PictureIcon size={8} color="#878a99" />
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

            <FormErrorMessage>
              {(errors.file as any) && errors?.file?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

      {/* Full name  */}
      <Grid
        mt={10}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontSize={16} fontWeight={600} colSpan={1}>
          Họ và tên
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
        mt={10}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontSize={16} fontWeight={600} colSpan={1}>
          Địa chỉ Email
        </GridItem>
        <GridItem colSpan={3}>
          <FormControl isInvalid={errors.email as any}>
            <Input
              id="email"
              placeholder="abc@gmail.com"
              size="lager"
              {...register("email", {
                required: "Không được để trống !!!",
              })}
            />
            <FormErrorMessage>
              {(errors.email as any) && errors?.email?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

      {/* Phone */}
      <Grid
        mt={10}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontSize={16} colSpan={1}>
          <Flex>
            <Text fontWeight={600} mr={2}>
              Số điện thoại
            </Text>
            <Text color={"gray"}>(Optional)</Text>
          </Flex>
        </GridItem>
        <GridItem colSpan={3}>
          <FormControl isInvalid={errors.phone as any}>
            <Input
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
        mt={10}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontSize={16} fontWeight={600} colSpan={1}>
          Vị trí
        </GridItem>
        <GridItem colSpan={3}>
          <FormControl isInvalid={errors.department as any}>
            <Input
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
        mt={10}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontSize={16} fontWeight={600} colSpan={1}>
          Tài khoản
        </GridItem>
        <GridItem colSpan={3}>
          <RadioGroup defaultValue="company">
            <HStack spacing="24px">
              <Radio value="customer">Khách hàng</Radio>
              <Radio value="company">Công ty</Radio>
            </HStack>
          </RadioGroup>
        </GridItem>
      </Grid>
      <Box>
        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          m={"20px 0 0 auto"}
          onClick={handleNextStep}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Profine;
