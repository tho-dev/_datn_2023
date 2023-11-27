import { Link as ReactRouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/layout";
import { Heading, Text, Box, Grid, GridItem, Flex } from "@chakra-ui/layout";
import { ArrowRightUpIcon } from "~/components/common/Icons";
import moment from "moment";

type Props = {
  title?: string;
  items?: any;
};

const Store = ({ title, items }: Props) => {
  const currentTime = moment();
  const targetTime1 = moment().hour(21).minute(0).second(0);
  const targetTime2 = moment().hour(9).minute(0).second(0);
  return (
    <Box mt="6">
      <Heading as="h2" fontSize="xl" color="text.black" fontWeight="semibold">
        {title}
      </Heading>
      <Grid
        mt="4"
        gap="3"
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
      >
        {items?.map((item: any, index: number) => {
          return (
            <GridItem key={index}>
              <Box
                p="4"
                rounded="md"
                fontSize="sm"
                color="text.black"
                backgroundColor="bg.gray"
              >
                <Text fontWeight="semibold">{item?.city}</Text>
                <Text>{item?.address}</Text>
                <Flex
                  mt="2"
                  alignItems="flex-end"
                  justifyContent="space-between"
                >
                  <Box fontSize="xs">
                    <Text
                      fontWeight="semibold"
                      color={item?.status ? "#5fb757" : "#f93920"}
                    >
                      {item?.status &&
                      currentTime.isBetween(targetTime2, targetTime1)
                        ? "Mở cửa"
                        : "Đã đóng cửa, hẹn bạn 09:00 ngày mai"}
                    </Text>
                    <Text fontWeight="medium">{`${item?.time_open} - ${item?.time_close}`}</Text>
                  </Box>
                  <Link
                    as={ReactRouterLink}
                    to={item?.map}
                    fontSize="xs"
                    color="text.blue"
                    fontWeight="bold"
                    textDecoration="none"
                  >
                    Chỉ đường
                    <ArrowRightUpIcon size={4} />
                  </Link>
                </Flex>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Store;
