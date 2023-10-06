import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ArrowLeftCirleIcon, CodeIcon } from '~/components/common/Icons';
import { FormErrorMessage, FormControl, Input, Button, Center, Box, Flex, Link, Stack, Heading, Text, Divider, AbsoluteCenter, useToast } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { ResetPasswordSchema } from '~/validate/user';
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
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    console.log(data);
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
              <Input id='email' type='email' placeholder='Email' size='lager' {...register('email')} />
              <FormErrorMessage>{(errors.email as any) && (errors?.email?.message as any)}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password as any}>
              <Input id='password' type='password' placeholder='Nhập mật khẩu mới' size='lager' {...register('password')} />
              <FormErrorMessage>{(errors.password as any) && (errors?.password?.message as any)}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirm_password as any}>
              <Input id='confirm_password' type='password' placeholder='Nhập Lại Mật Khẩu' size='lager' {...register('confirm_password')} />
              <FormErrorMessage>{(errors.confirm_password as any) && (errors?.confirm_password?.message as any)}</FormErrorMessage>
            </FormControl>

            <Button size='lager' type='submit' w='full' mt='4' rounded='full'>
              Thiết lập lại mật khẩu
            </Button>
          </Flex>
        </form>
      </Flex>
    </Center>
  );
};
export default ResetPasswordView;
