import { Box, Text, Divider, Flex, Checkbox, Button } from "@chakra-ui/react";

const Accounts = () => {
  return (
    <Box>
      {/*Delete your account */}
      <Box
        my={7}
        w={"100%"}
        bg={"#ffff"}
        borderRadius={"15px"}
        p={5}
        fontSize={14}
      >
        <Text fontSize={16} fontWeight={700} mb={5}>
          Delete your account
        </Text>
        <Divider />
        <Text py={3}>
          When you delete your account, you lose access to Front account
          services, and we permanently delete your personal data. You can cancel
          the deletion for 14 days.
        </Text>
        <Checkbox size="md" fontSize={14}>
          Confirm that I want to delete my account.
        </Checkbox>
        <Flex justifyContent="flex-end" alignItems="center">
          <Button type="submit" bgColor="#ed4c78" textColor="white" isDisabled>
            Delete
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Accounts;
