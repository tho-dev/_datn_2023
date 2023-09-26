import { Box } from "@chakra-ui/react";
import Information from "./components/Information";
import Accounts from "./components/Accounts";
import Email from "./components/Email";
import Password from "./components/Password";

const ProfileManagerView = () => {
  return (
    <Box>
      {/* Information */}
      <Information />
      {/* Email */}
      <Email />
      {/* Change your password */}
      <Password />
      {/* Accounts */}
      <Accounts />
    </Box>
  );
};

export default ProfileManagerView;
