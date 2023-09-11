import { Box } from '@chakra-ui/layout'
import React from 'react'
import Title from './components/Title'
import ProductList from './components/ProductList'

type Props = {}

const SearchView = (props: Props) => {
    return (
        <Box>
            <Title />
            <ProductList />
        </Box>
    )
}

export default SearchView