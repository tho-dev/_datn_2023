import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/layout";
import CardThinkPro from "~/components/CardThinkPro";
import AllNewsView from "./AllNewsView";

type Props = {
    data?: any;
};

const PostThinkPro = ({ data }: Props) => {
    return (
        <GridItem colSpan={2}>
            {data?.map((product: any, index: number) => {
                return (
                    <AllNewsView product={product} key={index} />
                );
            })}
        </GridItem>
    );
};

export default PostThinkPro;
