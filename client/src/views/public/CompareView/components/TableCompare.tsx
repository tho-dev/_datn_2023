import { Box } from "@chakra-ui/layout";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

type Props = {};

const TableCompare = (props: Props) => {
  return (
    <Box margin="20px 0">
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton bgColor="bg.pink">
            <Text
              width="100%"
              textAlign="left"
              fontWeight="semibold"
              fontSize="18px"
            >
              Bộ xử lý
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel padding={0}>
            <TableContainer border="1px solid #ccc">
              <Table>
                <Tbody>
                  <Tr>
                    <Td border="1px solid #ccc">1</Td>
                    <Td border="1px solid #ccc">2</Td>
                    <Td border="1px solid #ccc">3</Td>
                    <Td border="1px solid #ccc">3</Td>
                    <Td border="1px solid #ccc">3</Td>
                  </Tr>
                  <Tr>
                    <Td border="1px solid #ccc">1</Td>
                    <Td border="1px solid #ccc">2</Td>
                    <Td border="1px solid #ccc">3</Td>
                    <Td border="1px solid #ccc">3</Td>
                    <Td border="1px solid #ccc">3</Td>
                  </Tr>
                  <Tr>
                    <Td border="1px solid #ccc">1</Td>
                    <Td border="1px solid #ccc">2</Td>
                    <Td border="1px solid #ccc">3</Td>
                    <Td border="1px solid #ccc">3</Td>
                    <Td border="1px solid #ccc">3</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default TableCompare;
