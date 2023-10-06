import { Box, Grid, GridItem } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Image } from "@chakra-ui/react";
import banner from "~/assets/images/TGDD-540x270-1.png";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

import CheckOtp from "./CheckOtp";
type Props = {
  handleCheckOrdered: () => void;
};

const CheckPhone = ({ handleCheckOrdered }: Props) => {
  const [isPhone, setIphone] = useState<boolean>(false);
  const handleCheckOtp = () => {
    setIphone(true);
  };
  return (
    <Box>
      <Grid gridTemplateColumns="repeat(2,1fr)">
        <GridItem>
          <Box w="100%" height="600px" display="flex" alignItems="center">
            <Image
              src={banner}
              alt="Dan Abramov"
              width="100%"
              objectFit="cover"
            />
          </Box>
        </GridItem>
        <GridItem>
          {isPhone ? (
            <CheckOtp handleCheckOrdered={handleCheckOrdered} />
          ) : (
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
                  Tra cứu thông tin đơn hàng
                </FormLabel>
                <Input
                  type="number"
                  placeholder="Nhập số điện thoại mua hàng"
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              <Button
                mt={4}
                type="submit"
                bgColor="bg.blue"
                w="70%"
                onClick={handleCheckOtp}
              >
                Tra cứu
              </Button>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CheckPhone;
