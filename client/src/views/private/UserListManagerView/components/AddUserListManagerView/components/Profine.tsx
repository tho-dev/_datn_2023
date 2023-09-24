import { FormLabel, Flex, Box, Text, FormControl, Input, FormErrorMessage, Grid, GridItem, HStack, Radio, RadioGroup, Spacer } from "@chakra-ui/react";
import { PictureIcon } from "~/components/common/Icons";
import { useForm } from "react-hook-form";



const Profine = () => {
    const {
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    return (
        <Box>
            <Grid
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} fontWeight={600} colSpan={1}>
                    Avatar
                </GridItem>
                <GridItem colSpan={3}>
                    <FormControl isInvalid={errors.file as any}>
                        <Flex >
                            <Box
                                w="100px"
                                h="100px"
                                bgColor="#f3f6f9"
                                rounded="md"
                                position="relative"
                            ></Box>
                            <Flex
                                as="span"
                                position="absolute"
                                top="86px"
                                left={"70px"}
                                w="8"
                                h="8"
                                // borderWidth="1px"
                                // borderColor="#878a99"
                                alignItems="center"
                                rounded="full"
                                bgColor="#f3f6f9"
                            >
                                <FormLabel
                                    htmlFor="file"
                                    display="inline-flex"
                                    alignItems="center"
                                    cursor="pointer"
                                >
                                    <PictureIcon
                                        size={8}
                                        color="#878a99"
                                    />
                                </FormLabel>
                            </Flex>
                        </Flex>
                        <Input
                            id="file"
                            placeholder="VD: Dell"
                            size="lager"
                            type="file"
                            display="none"
                            {...register("file", {
                                required: "Không được để trống !!!",
                            })}
                        />

                        <FormErrorMessage>{(errors.file as any) && errors?.file?.message}</FormErrorMessage>
                    </FormControl>
                </GridItem>
            </Grid>

            {/* Full name  */}
            <Grid
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} fontWeight={600} colSpan={1}>
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
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} fontWeight={600} colSpan={1}>
                    Email
                </GridItem>
                <GridItem colSpan={3}>
                    <FormControl isInvalid={errors.email as any}>
                        <Input
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
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} colSpan={1}>
                    <Flex>
                        <Text fontWeight={600} mr={2}>Phone</Text>
                        <Text color={"gray"}>(Optional)</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={3}>
                    <FormControl isInvalid={errors.phone as any}>
                        <Input
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
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} fontWeight={600} colSpan={1}>
                    Organization
                </GridItem>
                <GridItem colSpan={3}>
                    <FormControl isInvalid={errors.organization as any}>
                        <Input
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
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} fontWeight={600} colSpan={1}>
                    Department
                </GridItem>
                <GridItem colSpan={3}>
                    <FormControl isInvalid={errors.department as any}>
                        <Input
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
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} fontWeight={600} colSpan={1}>
                    Account type
                </GridItem>
                <GridItem colSpan={3}>

                    <RadioGroup defaultValue='Itachi'>
                        <HStack spacing='24px'>
                            <Radio value='Individual'>Individual</Radio>
                            <Radio value='Company'>Company</Radio>
                        </HStack>
                    </RadioGroup>

                </GridItem>
            </Grid>
        </Box>
    )
}

export default Profine