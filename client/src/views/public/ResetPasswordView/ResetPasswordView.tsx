import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ArrowLeftCirleIcon, CodeIcon } from '~/components/common/Icons';
import { FormErrorMessage, FormControl, Input, Button, Center, Box, Flex, Link, Stack, Heading, Text, Divider, AbsoluteCenter, useToast } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { ResetPasswordSchema } from '~/validate/user';
import { useAppDispatch, useAppSelector } from '~/redux/hook/hook';
import { resetForm } from '~/redux/slices/authSlice';
import { useResetPassWordMutation } from '~/redux/api/user';

type Props = {};

type State = {};

const ResetPasswordView = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: joiResolver(ResetPasswordSchema),
  });
  const dispatch = useAppDispatch();
  const [resetPassWord, { isLoading }] = useResetPassWordMutation();
  const toast = useToast();
  const { isEmail, isOtpCode } = useAppSelector((state: any) => state.persistedReducer.auth);
  const onSubmit = async (data: any) => {
    const result: any = await resetPassWord(data);
    console.log('submit', result);
    if (result.data?.status === 200) {
      toast({
        title: 'Thiết lập thành công',
        description: result.data?.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast({
        title: 'Thiết lập mật khẩu thất bại',
        description: result.error.data.errors.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    dispatch(resetForm(result));
  };

  return (
    <Center h='full' px={{ sm: 5, md: 5, lg: 0, xl: 0, '2xl': 0 }}>
      <Flex w='460px' h='full' direction='column' pt='8'>
        <Box>
          <Link as={ReactRouterLink} to='/'>
            <ArrowLeftCirleIcon boxSize='10' />
          </Link>
        </Box>
        <Stack direction='row' gap='0' pt='8' pb='12'>
          <Heading as='h3' color='primary.font' size='lg' fontWeight='semibold'>
            Think
          </Heading>
          <Heading as='h3' size='lg' color='text.200' fontWeight='semibold' position='relative'>
            Pro
            <CodeIcon boxSize='5' position='absolute' color='primary.font' />
          </Heading>
        </Stack>
        <Stack direction='column' gap='0' pb='12'>
          <Heading as='h3' size='lg'>
            Quên mật khẩu
          </Heading>
        </Stack>
        <form
          style={{
            width: '100%',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex direction='column' gap='4'>
            <FormControl isInvalid={errors.email as any}>
              <Input id='email' value={isEmail} type='email' placeholder='Email' size='lager' {...register('email')} />
              <FormErrorMessage>{(errors.email as any) && (errors?.email?.message as any)}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.new_password as any}>
              <Input id='new_password' type='password' placeholder='Nhập mật khẩu mới' size='lager' {...register('new_password')} />
              <FormErrorMessage>{(errors.new_password as any) && (errors?.new_password?.message as any)}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <Input id='otp_code' value={isOtpCode} type='text' placeholder='Nhập Mã OTP' size='lager' {...register('otp_code')} />
              <FormErrorMessage>{(errors.otp_code as any) && (errors?.otp_code?.message as any)}</FormErrorMessage>
            </FormControl>
            <Button isLoading={isLoading} loadingText={isLoading ? 'Đang thiết lập' : ''} size='lager' type='submit' w='full' mt='4' rounded='full'>
              Thiết lập lại mật khẩu
            </Button>
          </Flex>
        </form>
      </Flex>
    </Center>
  );
};
export default ResetPasswordView;
