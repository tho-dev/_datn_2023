import { Route, Routes, Navigate, Outlet } from "react-router-dom";
const protectedRouter = () => {
  // const user = JSON.parse(localStorage.getItem("persist:root") as string);
  // if (user) {
  //   const auth = JSON.parse(user?.global);

  //   if (auth?.isLogin == true) {
  //     if (auth?.user?.role == "admin") {
  //       return true;
  //     }
  //     return false;
  //   } else {
  //     return false;
  //   }
  // }
  // return false;
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return protectedRouter() ? <Outlet /> : <Navigate to="/dang-nhap" />;
};

export default PrivateRoute;
