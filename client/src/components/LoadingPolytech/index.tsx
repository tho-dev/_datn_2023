import { Box, Flex, Text } from "@chakra-ui/layout";

const LoadingPolytech = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      w="100vw"
      h="100vh"
      maxH="full"
      maxW="full"
      alignItems="center"
      justifyContent="center"
      bgColor="bg.white"
      zIndex="999"
      flexDirection={"column"}
      gap={4}
      transition="all"
    >
      <Box w="96px" h="96px">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a5"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stop-color="#0dc1d2"></stop>
            <stop offset=".3" stop-color="#0dc1d2" stop-opacity=".9"></stop>
            <stop offset=".6" stop-color="#0dc1d2" stop-opacity=".6"></stop>
            <stop offset=".8" stop-color="#0dc1d2" stop-opacity=".3"></stop>
            <stop offset="1" stop-color="#0dc1d2" stop-opacity="0"></stop>
          </radialGradient>
          <circle
            style={{
              transformOrigin: "center",
            }}
            fill="none"
            stroke="url(#a5)"
            stroke-width="15"
            stroke-linecap="round"
            stroke-dasharray="200 1000"
            stroke-dashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            patternTransform="center"
            fill="none"
            opacity=".2"
            stroke="#0dc1d2"
            stroke-width="15"
            stroke-linecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </Box>
      <Text fontSize={"lg"} fontWeight="semibold">
        Đang Tải ...
      </Text>
    </Flex>
  );
};

export default LoadingPolytech;
