import { Box, Grid, GridItem, Flex, Text } from "@chakra-ui/layout";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Props = {
  handlePrevStep: () => void;
  handleNextStep: () => void;
};
const Address = ({ handlePrevStep, handleNextStep }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <Box bgColor="white" my={8} padding="16px 24px" borderRadius={6}>
      {/* Location */}
      <Grid
        mt={10}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontSize={16} fontWeight={600} colSpan={1}>
          Địa chỉ
        </GridItem>
        <GridItem colSpan={3}>
          {/* state */}
          <FormControl isInvalid={errors.state as any}>
            <Input
              id="state"
              placeholder="State"
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
        mt={10}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontWeight={600} colSpan={1}>
          Mật khẩu
        </GridItem>
        <GridItem colSpan={3}>
          <FormControl isInvalid={errors.password as any}>
            <Input
              type="password"
              // id="password"
              placeholder="Enter password"
              size="lager"
              {...register("password", {
                required: "Không được để trống !!!",
              })}
            />
            <FormErrorMessage>
              {(errors.password as any) && errors?.password?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

      {/* Address line 2 (Optional) */}
      <Grid
        mt={10}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontWeight={600} colSpan={1}>
          Xác nhận mật khẩu
        </GridItem>
        <GridItem colSpan={3}>
          <FormControl isInvalid={errors.password as any}>
            <Input
              type="password"
              // id="password"
              placeholder="Enter confirm password"
              size="lager"
              {...register("password", {
                required: "Không được để trống !!!",
              })}
            />
            <FormErrorMessage>
              {(errors.password as any) && errors?.password?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

      <Grid
        mt={10}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        <GridItem fontSize={16} fontWeight={600} colSpan={1}>
          Mã code
        </GridItem>
        <GridItem colSpan={3}>
          <FormControl isInvalid={errors.zipCode as any}>
            <Input
              id="zipCode"
              placeholder="Mã code"
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
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          onClick={handlePrevStep}
        >
          Prev
        </Button>
        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          onClick={handleNextStep}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default Address;
