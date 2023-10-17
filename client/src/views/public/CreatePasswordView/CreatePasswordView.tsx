import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ArrowLeftCirleIcon, CodeIcon } from '~/components/common/Icons';
import { FormErrorMessage, FormControl, Input, Button, Center, Box, Flex, Link, Stack, Heading, Text, Divider, AbsoluteCenter, useToast } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { sendOtpPasswordSchema } from '~/validate/user';
import { useSendOtpResetPasswordMutation } from '~/redux/api/user';
import { resetForm, resetPassword } from '~/redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '~/redux/hook/hook';

type Props = {};

type State = {};

const CreatePasswordView = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: joiResolver(sendOtpPasswordSchema),
  });
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [sendOtpResetPassword, { isLoading }] = useSendOtpResetPasswordMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    const result: any = await sendOtpResetPassword(data);
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
    dispatch(resetPassword({ result: result.data || result.error, email: data.email }));
    navigate('/thiet-lap-mat-khau');
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
            Thiết lập mật khẩu
          </Heading>
          <Text fontSize='lg' fontWeight='medium' mt='4'>
            Nhập email đăng nhập của bạn để thiết lập lại mật khẩu.
          </Text>
        </Stack>

        <form
          style={{
            width: '100%',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex direction='column' gap='4'>
            <FormControl isInvalid={errors.email as any}>
              <Input id='email' type='email' placeholder='Email' size='lager' {...register('email')} />
              <FormErrorMessage>{(errors.email as any) && (errors?.email?.message as any)}</FormErrorMessage>
            </FormControl>
            <Button size='lager' type='submit' w='full' mt='4' rounded='full' isLoading={isLoading} loadingText={isLoading ? 'Đang thiết lập' : ''}>
              Thiết lập lại mật khẩu
            </Button>
          </Flex>
        </form>
      </Flex>
    </Center>
  );
};
export default CreatePasswordView;
