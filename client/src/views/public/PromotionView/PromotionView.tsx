import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from "@chakra-ui/react"; 
import PromotionProduct from './PromotionProduct/PromotionProduct';

const PromotionView = () => {
    return (
        <Box my={6}>
            <Box
                w="100%"
                borderRadius="xl"
            >
                <Image borderTopRadius={"xl"} src={"https://images.thinkgroup.vn/unsafe/2400x640/https://media-api-beta.thinkpro.vn/media/core/banners/2023/6/7/2400-x-640-thinkpro.png"} w="full" h="full" objectFit="cover" />

                <Box
                    bg="white"
                    p={7}
                    fontSize={20}
                    fontWeight={'bold'}
                >
                    <Text>LENOVO THINKBOOK GIẢM CỰC SÂU</Text>
                </Box>
            </Box>

            <Flex mt={6} gap={3}>
                <PromotionProduct />
                <PromotionProduct />
                <PromotionProduct />
                <PromotionProduct />
                <PromotionProduct />
            </Flex>
        </Box>

    )
}

export default PromotionView