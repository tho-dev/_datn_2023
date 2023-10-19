import { Box } from "@chakra-ui/react";
import Information from "./components/Information";
import Accounts from "./components/Accounts";
import Email from "./components/Email";
import Password from "./components/Password";
import { useAppSelector } from "~/redux/hook/hook";
import { useGetOneQuery } from "~/redux/api/user";

const ProfileManagerView = () => {
  const { user } = useAppSelector((state) => state.persistedReducer.global);
  const id = user._id;
  const { data, isLoading, isError } = useGetOneQuery(id);
  if (isLoading) {
    return <Box>Loading....</Box>;
  }
  if (isError) {
    return <Box>Loading....</Box>;
  }
  return (
    <Box>
      {/* Information */}
      <Information data={data.data} />
      {/* Email */}
      <Email data={data.data} />
      {/* Change your password */}
      <Password data={data.data} />
      {/* Accounts */}
      <Accounts />
    </Box>
  );
};

export default ProfileManagerView;
