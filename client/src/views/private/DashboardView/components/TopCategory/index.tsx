import { Box, Flex, Text } from "@chakra-ui/layout";
import { ArrowUpIcon } from "~/components/common/Icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  title: string;
};
export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const TopCategory = ({ title }: Props) => {
  return (
    <Box width="33%" border="1px solid #f1f4f9" rounded="md">
      <Flex
        justifyContent="space-between"
        borderBottom="1px solid #f1f4f9"
        p="4"
      >
        <Text fontSize="18" fontWeight="bold">
          {title}
        </Text>
        <Flex alignItems="center">
          <Text mr="2">Repost</Text>
          <ArrowUpIcon size={4} color="black" />
        </Flex>
      </Flex>

      <Box my="2">
        <Doughnut data={data} />
      </Box>
    </Box>
  );
};

export default TopCategory;
