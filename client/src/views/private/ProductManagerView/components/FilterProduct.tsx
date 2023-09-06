import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Input,
} from "@chakra-ui/react";
import CustomRadio from "./CustomRadio";
import thinkpro from "~/data/clone-thinkpro.json";

type Props = {};

const FilterProduct = (props: Props) => {
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(100);

  const avatars = [
    { name: "Black", code: "#111" },
    { name: "Orange", code: "#FFA500" },
    { name: "Pink", code: "#FFC0CB" },
    { name: "Pinky", code: "#FFC0CC" },
  ];

  return (
    <Box bgColor="bg.white" position="sticky" top="120px">
      <Box p="4">
        <Text fontWeight="bold" fontSize="16px">
          Lọc sản phẩm theo
        </Text>
      </Box>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem border="none">
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              textTransform="capitalize"
              fontWeight="bold"
              fontSize="14px"
            >
              Danh mục
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {thinkpro.data.map((item: any, index: number) => {
              return (
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  py={1}
                  px={0.5}
                  _hover={{ bgColor: "#F1F4F9" }}
                  cursor="pointer"
                  borderRadius="4px"
                  mb={2}
                  key={index}
                >
                  <Text fontWeight="semibold" fontSize="14px">
                    {item.name}
                  </Text>
                  <Text bgColor="#F1F4F9" px={1.5} py={1} fontSize="12px">
                    {item.products.length}
                  </Text>
                </Flex>
              );
            })}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight="bold"
              fontSize="14px"
              textTransform="capitalize"
            >
              Giá
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <RangeSlider
              aria-label={["min", "max"]}
              defaultValue={[0, 100]}
              onChangeEnd={(val) => {
                setPriceMin(Number(val[0]));
                setPriceMax(Number(val[1]));
              }}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Flex my={2} gap={2}>
              <Input
                size="xs"
                borderColor="#06D6A0"
                value={priceMin}
                onChange={(e: any) => setPriceMin(Number(e.target.value))}
              />
              <Text>to</Text>
              <Input
                size="xs"
                borderColor="#06D6A0"
                value={priceMax}
                onChange={(e: any) => setPriceMax(Number(e.target.value))}
              />
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight="bold"
              fontSize="14px"
              textTransform="capitalize"
            >
              Màu
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <CustomRadio arrayRadio={avatars} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default FilterProduct;
