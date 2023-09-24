import { Box, Text, FormControl, Input, FormErrorMessage, Grid, GridItem, Divider, Spacer, Flex, Button, Stack, UnorderedList, ListItem, Select, Switch, FormLabel } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Information from './components/Information'
import Management from "./components/Management";
import Accounts from "./components/Accounts";

const ProfileManagerView = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <Box>
      {/* Information */}
      <Information />

      {/* Email */}
      <Box
        mt={7}
        w={"100%"}
        bg={"#ffff"}
        borderRadius={"15px"}
        p={5}
        fontSize={18}
      >
        <Text fontSize={22} fontWeight={700} mb={5}>
          Email
        </Text>
        <Divider />
        <Flex color={"#797a7b"} mt={5}>
          <Text mr={1}>Your current email address is </Text>
          <Text fontWeight={600}> mark@site.com</Text>
        </Flex>
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}>
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            New email address
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.email as any}>
              <Input
                fontSize={16}
                id="email"
                placeholder="Enter new email address"
                size="lager"
                {...register("email", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>{(errors.email as any) && errors?.email?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          m={"20px 0 0 auto"}
        >
          Save changes
        </Button>

      </Box>

      {/* Change your password */}
      <Box
        mt={7}
        w={"100%"}
        bg={"#ffff"}
        borderRadius={"15px"}
        p={5}
        fontSize={18}
      >
        <Text fontSize={22} fontWeight={700} mb={5}>
          Change your password
        </Text>
        <Divider />
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}>
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Current password
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.password as any}>
              <Input
                type="password"
                fontSize={16}
                // id="password"
                placeholder="Enter current address"
                size="lager"
                {...register("password", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>{(errors.password as any) && errors?.password?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}>
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            New password
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.password as any}>
              <Input
                type="password"
                fontSize={16}
                // id="password"
                placeholder="Enter new password"
                size="lager"
                {...register("password", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>{(errors.password as any) && errors?.password?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}>
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Confirm new password
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.password as any}>
              <Input
                type="password"
                fontSize={16}
                // id="password"
                placeholder="Confirm your new password"
                size="lager"
                {...register("password", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>{(errors.password as any) && errors?.password?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}>
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>

          </GridItem>
          <GridItem colSpan={3}>
            <Stack spacing={1} color={"#797a7b"} fontSize={16}>
              <Text fontSize='lg' color={"#1e2022"} fontWeight={500}>Password requirements:</Text>
              <Text>Ensure that these requirements are met:</Text>
              <UnorderedList fontSize={14} pl={7} spacing={0}>
                <ListItem>Minimum 8 characters long - the more, the better</ListItem>
                <ListItem>At least one lowercase character</ListItem>
                <ListItem>At least one uppercase character</ListItem>
                <ListItem>At least one number, symbol, or whitespace charactert</ListItem>
              </UnorderedList>
            </Stack>
          </GridItem>
        </Grid>

        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          m={"20px 0 0 auto"}
        >
          Save changes
        </Button>

      </Box>

      {/* Preferences
 */}
      <Box
        mt={7}
        w={"100%"}
        bg={"#ffff"}
        borderRadius={"15px"}
        p={5}
        fontSize={18}
      >
        <Text fontSize={22} fontWeight={700} mb={5}>
          Preferences

        </Text>
        <Divider />

        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}>
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Location
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.email as any}>
              <Select placeholder='Select option'>
                <option value='option1'>Vietnam</option>
                <option value='option2'>Afghanistan</option>
                <option value='option3'>Aland Islands</option>
                <option value='option4'>Albania</option>
                <option value='option5'>Finland</option>
                <option value='option6'>Scotland</option>
                <option value='option7'>Austria</option>
                <option value='option8'>France</option>
                <option value='option9'>Netherlands</option>
                <option value='option10'>United Kingdom</option>
                <option value='option11'>Italy</option>
                <option value='option12'>Hungary</option>
                <option value='option13'>Russia</option>
                <option value='option14'>Canada</option>
                <option value='option15'>Cuba</option>
                <option value='option16'>United States</option>
                <option value='option17'>China</option>
                <option value='option18'>Japan</option>
              </Select>
            </FormControl>

          </GridItem>
        </Grid>

        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}>
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Zip code
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.zipCode as any}>
              <Input
                fontSize={16}
                id="zipCode"
                placeholder="Your zip code"
                size="lager"
                {...register("zipCode", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>{(errors.zipCode as any) && errors?.zipCode?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <FormControl mt={3} display='flex' alignItems='center'>
          <FormLabel htmlFor='alerts' fontSize={18} color={"#797a7b"}>
            <Text fontWeight={600}>Early release</Text>
            <Text color={"#a0aab4"}>Get included on early releases for new Front features.</Text>
          </FormLabel>
          <Spacer />
          <Switch size={"lg"} id='alerts' />
        </FormControl>

        <FormControl mt={3} display='flex' alignItems='center'>
          <FormLabel htmlFor='alert' fontSize={18} color={"#797a7b"}>
            <Text fontWeight={600}>See info about people who view my profile</Text>
            <Text fontWeight={700} color={"#3d81ff"}>More about viewer info.</Text>
          </FormLabel>
          <Spacer />
          <Switch size={"lg"} id='alert' />
        </FormControl>

        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          m={"20px 0 0 auto"}
        >
          Save changes
        </Button>
      </Box>



      {/* Two-step verification */}
      <Box
        mt={7}
        w={"100%"}
        bg={"#ffff"}
        borderRadius={"15px"}
        p={5}
        fontSize={18}
      >
        <Text fontSize={22} fontWeight={700} mb={5}>
          Two-step verification
        </Text>
        <Divider />
        <Text color={"#797a7b"} mt={5} mr={1}>Start by entering your password so that we know it's you. Then we'll walk you through two more simple steps.</Text>
        <Grid
          mt={5}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}>
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
            Account password
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.password as any}>
              <Input
                fontSize={16}
                type="password"
                // id="password"
                placeholder="Enter current password"
                size="lager"
                {...register("password", {
                  required: "Không được để trống !!!",
                })}
              />
              <FormErrorMessage>{(errors.password as any) && errors?.password?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid
          mt={2}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            xl: "repeat(4, 1fr)",
          }}>
          <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
          </GridItem>
          <GridItem color={"#797a7b"} fontSize={15} colSpan={3}>
            <Text >This is the password you use to log in to your Front account.</Text>
          </GridItem>
        </Grid>

        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          m={"20px 0 0 auto"}
        >
          Set up
        </Button>

      </Box>



      {/* management */}
      <Management />

      {/* Accounts */}
      <Accounts />





    </Box>
  )
}

export default ProfileManagerView