import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Avatar, Button, Image, Text } from "@chakra-ui/react";

type Props = {
  first_name: string;
  last_name: string;
  phone: number;
  email: string;
  location: string;
  role: string;
  password: string;
  confirm_password: string;
  image: any;
};
const Confirmation = ({
  first_name,
  last_name,
  location,
  role,
  email,
  password,
  confirm_password,
  phone,
  image,
}: Props) => {
  console.log(image);
  return (
    <Box
      bgColor="white"
      my={8}
      padding="16px 24px"
      borderRadius={6}
      w={"100%"}
      boxShadow="lg"
    >
      <Box h={40} bg={"#b3e7ff"} borderTopRadius={"6px"} position={"relative"}>
        <Image
          position={"absolute"}
          m={"80px 42%"}
          borderRadius="full"
          boxSize="150px"
          alt="Dan Abramov"
          src={image.url ? image.url : image}
          objectFit="cover"
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
          {location ? location : "Địa chỉ"}
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
          {first_name || last_name !== ""
            ? first_name + " " + last_name
            : "Tên của bạn"}
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
          {email ? email : "Email của bạn"}
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
          (+84){phone ? phone : "Số điện thoại"}
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
          Vai trò
        </GridItem>
        <GridItem fontSize={16} fontWeight={700}>
          {role ? role : "Vai trò của bạn"}
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
          {password ? password : "*******"}
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
          {confirm_password ? confirm_password : "*******"}
        </GridItem>
      </Grid>
      {/* Zip code */}
    </Box>
  );
};

export default Confirmation;
