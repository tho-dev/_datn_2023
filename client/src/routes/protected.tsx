import { Route, Routes, Navigate, Outlet } from "react-router-dom";
export const protectedRouter = () => {
  const user = JSON.parse(localStorage.getItem("persist:root") as string);
  if (user) {
    const auth = JSON.parse(user?.global);

    if (auth?.isLogin == true) {
      if (auth?.user?.role == "admin") {
        return true;
      }
      return true;
    } else {
      return true;
    }
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return protectedRouter() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
