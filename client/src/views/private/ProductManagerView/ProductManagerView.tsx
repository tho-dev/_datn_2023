import { Box, Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Button,
  Input,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import FilterProduct from "./components/FilterProduct";
import TableProduct from "./components/TableProduct";
import { PlusIcon, SearchAdminIcon } from "~/components/common/Icons";
import ListView from "./components/ListView";
import thinkpro from "~/data/clone-thinkpro.json";

type Props = {};

const ProductManagerView = (props: Props) => {
  const [mode, setMode] = useState<boolean>(true);
  const [dataProducts, setDataProducts] = useState([] as any[]);

  const handleChangeModeView = () => {
    setMode(!mode);
  };
  useEffect(() => {
    let data: any[] = [];
    thinkpro.data.forEach((item: any) => {
      data.push(item.products);
    });
    setDataProducts(data.flat());
  }, []);
  return (
    <Box>
      <Grid templateColumns="repeat(8, 1fr)" gap={6}>
        <GridItem w="100%" colSpan={2} mt="6">
          <FilterProduct />
        </GridItem>
        <GridItem w="100%" colSpan={6} bgColor="bg.white" mt="6" p="6">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Flex gap={4}>
              <Button leftIcon={<PlusIcon size={5} />} bgColor="#06D6A0">
                Thêm mới
              </Button>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  Grid Views
                </FormLabel>
                <Switch
                  id="email-alerts"
                  onChange={handleChangeModeView}
                  value={mode as boolean}
                />
              </FormControl>
            </Flex>
            <Flex
              w="full"
              h="full"
              p="4"
              maxW={{
                sm: "160px",
                md: "160px",
                lg: "360px",
                xl: "360px",
                "2xl": "360px",
              }}
              maxH="40px"
              alignItems="center"
              rounded="md"
              backgroundColor="bg.admin1"
              display={{
                sm: "flex",
                md: "flex",
                lg: "flex",
                xl: "flex",
                "2xl": "flex",
              }}
            >
              <Flex as="span" mt="1">
                <SearchAdminIcon size={6} />
              </Flex>
              <Input
                h="full"
                border="none"
                bgColor="transparent"
                px="0"
                pl="1"
                placeholder="Tìm kiếm ..."
              />
            </Flex>
          </Flex>
          {mode ? <TableProduct dataProducts={dataProducts} /> : <ListView />}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProductManagerView;
