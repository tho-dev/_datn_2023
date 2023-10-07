import React, { useEffect } from "react";
import DialogThinkPro from "~/components/DialogThinkPro";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
type Props = {
  open: any;
};

const PopupCheckOtp = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    props.open == true ? onOpen() : "";
  }, [props.open]);

  const [value, setValue] = React.useState("");

  const submitForm = (e: any) => {
    e.preventDefault();
    console.log("value_", value);
    if (value.length < 6) return;
    onClose();
  };
  return (
    <DialogThinkPro isOpen={isOpen} onClose={onClose} isCentered>
      <form onSubmit={submitForm}>
        <Flex my={"5"} w={"full"} justifyContent="center" alignItems="center">
          <Flex
            flexDirection="column"
            backgroundColor={"white"}
            borderRadius={"md"}
            p={"24px"}
            mr={"5"}
            w={{ md: "80%", base: "full" }}
            alignItems="center"
            gap={4}
          >
            <Text fontSize={"20px"} fontWeight={600} as={"h3"}>
              Nhập mã OTP
            </Text>
            <Text fontSize={"12px"} fontWeight={"semibold"}>
              Một mã OTP vừa được chúng tôi gửi đến số điện thoại của bạn
            </Text>
            <FormControl w="100%">
              <Flex justifyContent="center" gap={2}>
                <PinInput onChange={(value) => setValue(value)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </Flex>
              <FormErrorMessage>
                {value.length === 0 ? "Mời bạn nhập mã OTP" : ""}
              </FormErrorMessage>
            </FormControl>
            <Button
              bg={`${value.length < 6 ? "gray.400" : "green.400"}`}
              color={`${value.length < 6 ? "gray.500" : "white"}`}
              mt={"16px"}
              type="submit"
            >
              Xác nhận
            </Button>
          </Flex>
        </Flex>
      </form>
    </DialogThinkPro>
  );
};

export default PopupCheckOtp;
