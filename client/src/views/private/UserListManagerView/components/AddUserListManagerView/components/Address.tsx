import { Box, Grid, GridItem, Flex, Text } from "@chakra-ui/layout"
import { FormControl, FormErrorMessage, Input, Select  } from "@chakra-ui/react"
import { useForm } from "react-hook-form";


const Address = () => {
    const {
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    return (
        <Box>

            {/* Location */}
            <Grid
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} fontWeight={600} colSpan={1}>
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
                    <FormControl mt={10} isInvalid={errors.city as any}>
                        <Input
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
                    <FormControl mt={10} isInvalid={errors.state as any}>
                        <Input
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
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} fontWeight={600} colSpan={1}>
                    Address line 1
                </GridItem>
                <GridItem colSpan={3}>
                    <FormControl isInvalid={errors.addressLine1 as any}>
                        <Input
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
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} colSpan={1}>
                    <Flex>
                        <Text fontWeight={600} mr={2}>Address line 2</Text>
                        <Text color={"gray"}>(Optional)</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={3}>
                <FormControl isInvalid={errors.addressLine2 as any}>
                        <Input
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
                mt={10}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem fontSize={20} fontWeight={600} colSpan={1}>
                Zip code 
                </GridItem>
                <GridItem colSpan={3}>
                    <FormControl isInvalid={errors.zipCode as any}>
                        <Input
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
        </Box>
    )
}

export default Address