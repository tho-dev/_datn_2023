import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Avatar, Button, Image, Text } from "@chakra-ui/react";

type Props = {
  handlePrevStep: () => void;
};
const Confirmation = ({ handlePrevStep }: Props) => {
  return (
    <Box bgColor="white" my={8} padding="16px 24px" borderRadius={6}>
      <Box
        w={"100%"}
        h={40}
        bg={"#b3e7ff"}
        borderTopRadius={"6px"}
        position={"relative"}
      >
        <Image
          position={"absolute"}
          m={"80px 42%"}
          borderRadius="full"
          boxSize="150px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
      </Box>

      {/* Location */}
      <Grid
        mt={120}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem
          fontSize={16}
          textAlign={"end"}
          mr={10}
          fontWeight={500}
          color={"gray"}
        >
          Location
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          Địa chỉ
        </GridItem>
      </Grid>
      <Grid
        mt={"17px"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem
          fontSize={16}
          textAlign={"end"}
          mr={10}
          fontWeight={500}
          color={"gray"}
        >
          Họ và tên
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          Nguyễn văn a
        </GridItem>
      </Grid>
      {/* Email */}
      <Grid
        mt={"17px"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem
          fontSize={16}
          textAlign={"end"}
          mr={10}
          fontWeight={500}
          color={"gray"}
        >
          Email
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          abc@gmail.com
        </GridItem>
      </Grid>

      {/* Phone */}
      <Grid
        mt={"17px"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem
          fontSize={16}
          textAlign={"end"}
          mr={10}
          fontWeight={500}
          color={"gray"}
        >
          Số điện thoại
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          (+84)842 842 842
        </GridItem>
      </Grid>

      {/* Department */}
      <Grid
        mt={"17px"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem
          fontSize={16}
          textAlign={"end"}
          mr={10}
          fontWeight={500}
          color={"gray"}
        >
          Vị trí
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          Admin
        </GridItem>
      </Grid>

      {/* Account type */}
      <Grid
        mt={"17px"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem
          fontSize={16}
          textAlign={"end"}
          mr={10}
          fontWeight={500}
          color={"gray"}
        >
          Tài khoản
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          Company
        </GridItem>
      </Grid>
      {/* Address line 2 */}
      <Grid
        mt={"17px"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem
          fontSize={16}
          textAlign={"end"}
          mr={10}
          fontWeight={500}
          color={"gray"}
        >
          Mật khẩu
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          1234567
        </GridItem>
      </Grid>
      <Grid
        mt={"17px"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem
          fontSize={16}
          textAlign={"end"}
          mr={10}
          fontWeight={500}
          color={"gray"}
        >
          Xác nhận mật khẩu
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          1234567
        </GridItem>
      </Grid>
      {/* Zip code */}
      <Grid
        mt={"17px"}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <GridItem
          fontSize={16}
          textAlign={"end"}
          mr={10}
          fontWeight={500}
          color={"gray"}
        >
          Zip code
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          100000
        </GridItem>
      </Grid>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button
          type="submit"
          bgColor="#377dff"
          textColor="text.white"
          fontWeight="bold"
          onClick={handlePrevStep}
        >
          Prev
        </Button>
        <Button
          type="submit"
          bgColor="bg.green"
          textColor="text.white"
          fontWeight="bold"
        >
          Tạo mới
        </Button>
      </Flex>
    </Box>
  );
};

export default Confirmation;
