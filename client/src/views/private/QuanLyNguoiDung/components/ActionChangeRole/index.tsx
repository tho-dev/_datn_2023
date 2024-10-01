import { useEffect, useState } from "react";
import {
  Box,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Grid,
  GridItem,
  Divider,
  Button,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAssignRoleMutation } from "~/redux/api/promotion";
type Props = {
  data: any;
  dataRole: any;
  onClose: () => void;
};

const ActionChangeRole = ({ data, dataRole, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const toast = useToast();
  const [assignRole] = useAssignRoleMutation();
  const handleUpdateRole = async (dataRoleForm: any) => {
    setLoading(true);
    const { roleId, ...rest } = dataRoleForm;

    try {
      await assignRole({ userId: data.id, roleId });
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Cập nhật vai trò thành công",
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
    setLoading(false);
    onClose();
  };
  useEffect(() => {
    if (data) {
      reset(data); // Reset form với dữ liệu từ props
    }
  }, [data, reset]);
  return (
    <Box
      mt={7}
      w={"100%"}
      bg={"#ffff"}
      borderRadius={"6px"}
      p={5}
      fontSize={14}
    >
      <form onSubmit={handleSubmit(handleUpdateRole)}>
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            User Name
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.username as any}>
              <Input
                type="text"
                placeholder="Enter current address"
                size="lager"
                {...register("username", {
                  required: "Không được để trống !!!",
                })}
                readOnly
                defaultValue={data?.username}
              />
              <FormErrorMessage>
                {(errors.username as any) && errors?.username?.message}
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
            Vai Trò
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.password as any}>
              <Select
                placeholder="Chọn vai trò "
                borderRadius="5px"
                size="lager"
                {...register("roleId", {
                  required: "Không được để trống !!!",
                })}
              >
                {dataRole?.map((item: any) => {
                  return (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.name === data?.roleName}
                    >
                      {item.description}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {(errors.password as any) && errors?.password?.message}
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
          isLoading={loading}
        >
          Lưu thay đổi
        </Button>
      </form>
    </Box>
  );
};

export default ActionChangeRole;
