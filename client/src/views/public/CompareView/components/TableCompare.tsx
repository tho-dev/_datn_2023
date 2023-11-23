import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

type Props = {
  item: any;
  index: number;
};

const TableCompare = ({ item }: Props) => {
  return (
    <Box margin="20px 0">
      <Accordion allowToggle defaultIndex={[0]} allowMultiple>
        <AccordionItem border="none">
          <AccordionButton
            px="4"
            py="3"
            bgColor="bg.gray"
            _hover={{
              bgColor: "bg.gray",
            }}
            defaultChecked
          >
            <Text
              width="100%"
              textAlign="left"
              fontWeight="semibold"
              fontSize="md"
              color="text.black"
            >
              {item?.group_name}
            </Text>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel padding={0}>
            {item?.items?.map((z: any, i: number) => {
              return (
                <Flex key={i}>
                  <Box
                    w="calc(240px + 16px)"
                    px="3"
                    py="2"
                    fontSize="sm"
                    fontWeight="semibold"
                    borderWidth="0.5px"
                    borderColor="border.primary"
                  >
                    {z.label}
                  </Box>
                  <Grid flex="1" gridTemplateColumns="repeat(4,1fr)">
                    {z?.values?.map((v: any, k: number) => {
                      return (
                        <GridItem
                          key={k}
                          px="3"
                          py="2"
                          borderWidth="0.5px"
                          borderColor="border.primary"
                        >
                          <Text fontSize="13px" fontWeight="medium">
                            {v}
                          </Text>
                        </GridItem>
                      );
                    })}
                    {Array(4 - z?.values.length)
                      .fill(0)
                      .map((o) => {
                        return (
                          <GridItem
                            key={o}
                            px="3"
                            py="2"
                            borderWidth="0.5px"
                            borderColor="border.primary"
                          >
                            <Text fontSize="13px" fontWeight="medium"></Text>
                          </GridItem>
                        );
                      })}
                  </Grid>
                </Flex>
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default TableCompare;
