import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, GridItem } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Image, useToast } from '@chakra-ui/react';
import banner from '~/assets/images/TGDD-540x270-1.png';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Flex } from '@chakra-ui/react';
import { checkPhoneSchema } from '~/validate/order';
import CheckOtp from './CheckOtp';
import { useSendOtpMutation } from '~/redux/api/order';
import { useAppDispatch, useAppSelector } from '~/redux/hook/hook';
import { assert } from 'joi';
import { sendOtpPhone, resetOtpPhone } from '~/redux/slices/orderSlice';

const CheckPhone = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: joiResolver(checkPhoneSchema),
  });
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPhone, setIphone] = useState<boolean>(false);
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const onSubmit = async (data: any) => {
    const payload = {
      phone_number: data.phone_number.replace(/^0/, '+84'),
    };
    const result: any = await sendOtp(payload);

    if (result.data?.status === 200) {
      toast({
        title: 'Tra cứu thành công',
        description: result.data?.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setIphone(true);
    } else {
      toast({
        title: 'Tra cứu thất bại',
        description: result.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    // dispatch(resetOtpPhone(result));
    dispatch(sendOtpPhone(data));
  };
  return (
    <Box>
      <Grid gridTemplateColumns='repeat(2,1fr)'>
        <GridItem>
          <Box w='100%' height='600px' display='flex' alignItems='center'>
            <Image src={banner} alt='Dan Abramov' width='100%' objectFit='cover' />
          </Box>
        </GridItem>
        <GridItem>
          {isPhone ? (
            <CheckOtp />
          ) : (
            <form
              style={{
                width: '100%',
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Flex padding='20px' height='500px' flexDirection='column' bgColor='bg.white' borderRadius='6px' alignItems='center'>
                <FormControl isInvalid={errors.phone_number as any} margin='20px 0' w='70%'>
                  <FormLabel marginTop='20px' fontSize='18px' fontWeight='bold' textAlign='center'>
                    Tra cứu thông tin đơn hàng
                  </FormLabel>
                  <Input id='phone_number' {...register('phone_number')} border='none' type='number' placeholder='Nhập số điện thoại mua hàng' px='0' />
                  <FormHelperText></FormHelperText>
                  <FormErrorMessage>{(errors.phone_number as any) && (errors?.phone_number?.message as any)}</FormErrorMessage>
                </FormControl>
                <Button mt={4} type='submit' bgColor='bg.blue' w='70%' isLoading={isLoading} loadingText={isLoading ? 'Đang tra cứu' : ''}>
                  Tra cứu
                </Button>
              </Flex>
            </form>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CheckPhone;
