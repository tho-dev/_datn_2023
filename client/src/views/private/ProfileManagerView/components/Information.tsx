import { Flex, Box, Text, FormControl, Input, FormErrorMessage, Grid, GridItem, HStack, Radio, RadioGroup, Image, Button, Divider, Spacer, Select, Checkbox } from "@chakra-ui/react";
import { useForm } from "react-hook-form";


const Information = () => {
    const {
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    return (
        <Box>
            <Box
                w={"100%"}
                h={40}
                bg={"#b3e7ff"}
                borderTopRadius={"15px"}
                position={'relative'}
            >
                <Image
                    position={'absolute'}
                    m={"80px 42%"}
                    borderRadius='full'
                    boxSize='150px'
                    src='https://bit.ly/dan-abramov'
                    alt='Dan Abramov'
                />

            </Box>
            <Box
                w={"100%"}
                h={"52"}
                bg={"#ffff"}
                borderBottomRadius={"15px"}
            >
                <Text p={"90px 0 15px 25px"}>Who can see your profile photo?</Text>
                <Select pl={"25px"} color={"#797a7b"} fontSize={16} fontWeight={600} w={"xs"}   borderRadius={"md"}  > 
                    <option value='option1'>Anyone</option> 
                    <option value='option2'>Only one</option> 
                </Select>
            </Box>


            <Box
                mt={7}
                w={"100%"}
                bg={"#ffff"}
                borderRadius={"15px"}
                p={5}
                fontSize={18}
            >
                <Text fontSize={22} fontWeight={700} mb={5}>
                    Basic information
                </Text>
                <Divider />


                {/* Full name  */}
                <Grid
                    mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}>
                    <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
                        Full name
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Grid
                            templateColumns={{
                                sm: "repeat(1, 1fr)",
                                md: "repeat(1, 1fr)",
                                xl: "repeat(31, 1fr)",
                            }}>
                            <GridItem colSpan={15}>
                                <FormControl isInvalid={errors.firstName as any}>
                                    <Input
                                        fontSize={16}
                                        id="firstName"
                                        placeholder="Clarice"
                                        size="lager"
                                        {...register("firstName", {
                                            required: "Không được để trống !!!",
                                        })}
                                    />
                                    <FormErrorMessage>{(errors.firstName as any) && errors?.firstName?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <Spacer />
                            <GridItem colSpan={15}>
                                <FormControl isInvalid={errors.lastName as any}>
                                    <Input
                                        fontSize={16}
                                        id="lastName"
                                        placeholder="Boone"
                                        size="lager"
                                        {...register("lastName", {
                                            required: "Không được để trống !!!",
                                        })}
                                    />
                                    <FormErrorMessage>{(errors.lastName as any) && errors?.lastName?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </Grid>
                    </GridItem>
                </Grid>

                {/* Email */}
                <Grid
                    mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}>
                    <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
                        Email
                    </GridItem>
                    <GridItem colSpan={3}>
                        <FormControl isInvalid={errors.email as any}>
                            <Input
                                fontSize={16}
                                id="email"
                                placeholder="abc@gmail.com"
                                size="lager"
                                {...register("email", {
                                    required: "Không được để trống !!!",
                                })}
                            />
                            <FormErrorMessage>{(errors.email as any) && errors?.email?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </Grid>

                {/* Phone */}
                <Grid
                    mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}>
                    <GridItem colSpan={1}>
                        <Flex>
                            <Text fontWeight={600} color={"#797a7b"} mr={2}>Phone</Text>
                            <Text color={"gray"}>(Optional)</Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <FormControl isInvalid={errors.phone as any}>
                            <Input
                                fontSize={16}
                                id="phone"
                                placeholder="(+84)XXX XXX XXX"
                                size="lager"
                                {...register("phone", {
                                    required: "Không được để trống !!!",
                                })}
                            />
                            <FormErrorMessage>{(errors.phone as any) && errors?.phone?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </Grid>

                {/* Organization */}
                <Grid
                    mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}>
                    <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
                        Organization
                    </GridItem>
                    <GridItem colSpan={3}>
                        <FormControl isInvalid={errors.organization as any}>
                            <Input
                                fontSize={16}
                                id="organization"
                                placeholder="Htmlstream"
                                size="lager"
                                {...register("organization", {
                                    required: "Không được để trống !!!",
                                })}
                            />
                            <FormErrorMessage>{(errors.organization as any) && errors?.organization?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </Grid>


                {/* Department */}
                <Grid
                    mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}>
                    <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
                        Department
                    </GridItem>
                    <GridItem colSpan={3}>
                        <FormControl isInvalid={errors.department as any}>
                            <Input
                                fontSize={16}
                                id="department"
                                placeholder="Human resources"
                                size="lager"
                                {...register("department", {
                                    required: "Không được để trống !!!",
                                })}
                            />
                            <FormErrorMessage>{(errors.department as any) && errors?.department?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </Grid>

                {/* Account type */}
                <Grid
                    mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}>
                    <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
                        Account type
                    </GridItem>
                    <GridItem colSpan={3}>

                        <RadioGroup defaultValue='Itachi'>
                            <HStack spacing='24px' fontSize={16} color={"gray.500"} fontWeight={"medium"}>
                                <Radio value='Individual'>Individual</Radio>
                                <Radio value='Company'>Company</Radio>
                            </HStack>
                        </RadioGroup>

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

                        {/* city */}
                        <FormControl mt={5} isInvalid={errors.city as any}>
                            <Input
                                fontSize={16}
                                id="city"
                                placeholder="City"
                                size="lager"
                                {...register("city", {
                                    required: "Không được để trống !!!",
                                })}
                            />
                            <FormErrorMessage>{(errors.city as any) && errors?.city?.message}</FormErrorMessage>
                        </FormControl>

                        {/* state */}
                        <FormControl mt={5} isInvalid={errors.state as any}>
                            <Input
                                fontSize={16}
                                id="state"
                                placeholder="State"
                                size="lager"
                                {...register("state", {
                                    required: "Không được để trống !!!",
                                })}
                            />
                            <FormErrorMessage>{(errors.state as any) && errors?.state?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </Grid>

                {/* Address line 1 */}
                <Grid
                    mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}>
                    <GridItem fontWeight={600} color={"#797a7b"} colSpan={1}>
                        Address line 1
                    </GridItem>
                    <GridItem colSpan={3}>
                        <FormControl isInvalid={errors.addressLine1 as any}>
                            <Input
                                fontSize={16}
                                id="addressLine1"
                                placeholder="Your address"
                                size="lager"
                                {...register("addressLine1", {
                                    required: "Không được để trống !!!",
                                })}
                            />
                            <FormErrorMessage>{(errors.addressLine1 as any) && errors?.addressLine1?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </Grid>

                {/* Address line 2 (Optional) */}
                <Grid
                    mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}>
                    <GridItem colSpan={1}>
                        <Flex>
                            <Text fontWeight={600} color={"#797a7b"} mr={2}>Address line 2</Text>
                            <Text color={"gray"}>(Optional)</Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <FormControl isInvalid={errors.addressLine2 as any}>
                            <Input
                                fontSize={16}
                                id="addressLine2"
                                placeholder="Your address"
                                size="lager"
                                {...register("addressLine2", {
                                    required: "Không được để trống !!!",
                                })}
                            />
                            <FormErrorMessage>{(errors.addressLine2 as any) && errors?.addressLine2?.message}</FormErrorMessage>
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

                <Grid
                    mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}>
                    <GridItem colSpan={1}>
                        <Flex>
                            <Text fontWeight={600} color={"#797a7b"} mr={2}>Disable ads</Text>
                            <Box border={2} fontSize={15} bgColor={"#377dff"} color={"white"} px={2} py={1} borderRadius={10}>PRO</Box>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Checkbox defaultChecked>With your Pro account, you can disable ads across the site.</Checkbox>
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


        </Box>

    )
}

export default Information