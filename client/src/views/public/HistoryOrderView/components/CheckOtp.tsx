import { Box } from "@chakra-ui/layout";
import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
type Props = {
  handleCheckOrdered: () => void;
};

const CheckOtp = ({ handleCheckOrdered }: Props) => {
  return (
    <Box>
      <Flex
        padding="20px"
        height="500px"
        flexDirection="column"
        bgColor="bg.white"
        borderRadius="6px"
        alignItems="center"
      >
        <FormControl margin="20px 0" w="70%">
          <FormLabel
            marginTop="20px"
            fontSize="18px"
            fontWeight="bold"
            textAlign="center"
          >
            Nhập mã OTP vừa gửi đến số điện thoại của bạn
          </FormLabel>
          <Flex justifyContent="center">
            <PinInput>
              <PinInputField margin={2} />
              <PinInputField margin={2} />
              <PinInputField margin={2} />
              <PinInputField margin={2} />
              <PinInputField margin={2} />
              <PinInputField margin={2} />
            </PinInput>
          </Flex>
          <FormHelperText></FormHelperText>
        </FormControl>
        <Button
          mt={4}
          type="submit"
          bgColor="bg.blue"
          w="70%"
          onClick={handleCheckOrdered}
        >
          Xác minh mã OTP
        </Button>
      </Flex>
    </Box>
  );
};

export default CheckOtp;
