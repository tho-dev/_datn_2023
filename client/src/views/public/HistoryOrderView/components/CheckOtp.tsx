import { Box } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Flex } from '@chakra-ui/react';
import { PinInput, PinInputField, useToast } from '@chakra-ui/react';

import { useCheckOtpMutation } from '~/redux/api/order';
import { useAppDispatch, useAppSelector } from '~/redux/hook/hook';
import { checkOtpPhone } from '~/redux/slices/orderSlice';

// type Props = {
//   handleCheckOrdered: () => void;
// };

const CheckOtp = () => {
  const { handleSubmit } = useForm<any>();
  const [pinValues, setPinValues] = useState(['', '', '', '', '', '']);
  const newPinValues = [...pinValues];
  const [checkOtp, { isLoading }] = useCheckOtpMutation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const phoneNumber = useAppSelector((state) => state.persistedReducer.order.isPhoneNumber);
  const handleChange = (index: any, value: any) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
  };

  const onSubmit = async (data: any) => {
    const payload = {
      phone_number: phoneNumber,
      code: newPinValues.join(''),
    };
    const result: any = await checkOtp(payload);
    if (result.data?.status === 200) {
      toast({
        title: 'Thành công',
        description: result.data?.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast({
        title: 'Thất bại',
        description: result.error.data.errors.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }

    dispatch(checkOtpPhone({ result: result, otp: payload }));
    // dispatch(resetOtpPhone(result));
  };

  return (
    <Box>
      <form
        style={{
          width: '100%',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex padding='20px' height='500px' flexDirection='column' bgColor='bg.white' borderRadius='6px' alignItems='center'>
          <FormControl margin='20px 0' w='70%'>
            <FormLabel marginTop='20px' fontSize='18px' fontWeight='bold' textAlign='center'>
              Nhập mã OTP vừa gửi đến số điện thoại của bạn
            </FormLabel>
            <Flex justifyContent='center'>
              <PinInput>
                {pinValues.map((value, index) => (
                  <PinInputField key={index} value={value} onChange={(e) => handleChange(index, e.target.value)} margin={2} />
                ))}
              </PinInput>
            </Flex>
            <FormHelperText></FormHelperText>
          </FormControl>
          <Button mt={4} type='submit' bgColor='bg.blue' w='70%'>
            Xác minh mã OTP
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CheckOtp;
