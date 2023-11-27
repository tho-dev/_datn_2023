import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { useFieldArray } from "react-hook-form";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import { CloseSmallIcon, PlusIcon } from "~/components/common/Icons";

type Props = {
  register?: any;
  watch?: any;
  getValues?: any;
  setValue?: any;
  errors: any;
  control: any;
};

const Media = ({ watch, setValue, getValues, control }: Props) => {
  const { fields, remove } = useFieldArray({
    control,
    name: `assets`,
  });

  console.log("image", watch("image"));

  return (
    <Grid gap="4" pt="8" minH="240px" templateColumns="repeat(12, 1fr)">
      <GridItem colSpan={4}>
        <Flex rounded="lg" w="full" h="full">
          <FileUploadThinkPro
            getDataFn={(data) => setValue(`image`, data)}
            fileName="thumbnail"
            setData={watch("image")}
          />
        </Flex>
      </GridItem>
      <GridItem colSpan={8}>
        <Grid
          rounded="lg"
          w="full"
          h="full"
          gap="4"
          rowGap="10"
          templateColumns="repeat(4, 1fr)"
          templateRows="max-content"
        >
          {fields?.map((item, index) => {
            return (
              <Box key={item.id} pb="100%" position="relative">
                <Box w="full" h="full" position="absolute" top="0" left="0">
                  <FileUploadThinkPro
                    getDataFn={(data) => setValue(`assets.${index}`, data)}
                    fileName="assets"
                    setData={watch(`assets.${index}`)}
                  />
                </Box>
                <Flex
                  w="4"
                  h="4"
                  rounded="full"
                  position="absolute"
                  top="-1"
                  right="-1"
                  zIndex="10"
                  alignItems="center"
                  justifyContent="center"
                  bgColor="bg.bgDelete"
                  cursor="pointer"
                  onClick={() => remove(index)}
                >
                  <CloseSmallIcon size={3} color="text.textDelete" />
                </Flex>
              </Box>
            );
          })}
          <Flex pb="100%" position="relative">
            <Flex
              w="full"
              h="full"
              position="absolute"
              rounded="lg"
              bgColor="bg.admin1"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={() => {
                setValue("assets", [
                  ...(getValues().assets || []),
                  {
                    id: "",
                    url: "",
                  },
                ]);
              }}
            >
              <PlusIcon size={8} strokeWidth={0.5} color="bg.black" />
            </Flex>
          </Flex>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default Media;
