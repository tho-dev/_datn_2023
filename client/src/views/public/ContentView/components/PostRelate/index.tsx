import { Image } from '@chakra-ui/react'
import { Box, Text, Flex, Link, Heading } from '@chakra-ui/layout'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Clock } from '~/components/common/Icons'; 

type Props = {
    product?: any;
};


const PostRelate = ({ product }: Props) => {
    return (
        <Link
            to={"/"}
            as={ReactRouterLink}
            w="full"
            rounded="md"
            display="inline-block"
            backgroundColor="bg.white"
            _hover={{
                textDecoration: "none",
            }}
        >
 
            <Image borderTopRadius={'xl'}
                src="https://images.thinkgroup.vn/unsafe/660x370/https://media-api-beta.thinkpro.vn/media/social/articles/2023/8/17/07a7041-thinkpro-jOd.jpg"
            />
             <Text p={5} fontSize={16} fontWeight={'semibold'}>Apple nộp bằng sáng chế mới, MacBook sẽ sớm có FaceID?</Text>
            
        </Link>
    )
}

export default PostRelate
