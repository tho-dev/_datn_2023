import { Box } from "@chakra-ui/react";
import Information from "./components/Information";
import Password from "./components/Password";
import { useAppSelector } from "~/redux/hook/hook";
import { useGetOneQuery } from "~/redux/api/user";
import { useGetSinglePromotionQuery } from "~/redux/api/promotion";

const ProfileManagerView = () => {
  const { user } = useAppSelector((state) => state.persistedReducer.global);
  const id = user.userId;
  const { data, isLoading, isError } = useGetOneQuery(id);
  const { data: dataUser } = useGetSinglePromotionQuery({
    id: id,
  });

  if (isLoading) {
    return <Box>Loading....</Box>;
  }
  if (isError) {
    return <Box>Loading....</Box>;
  }
  return (
    <Box>
      {/* Information */}
      <Information dataUser={dataUser} />
      {/* Change your password */}
      <Password data={data.data} />
    </Box>
  );
};

export default ProfileManagerView;
