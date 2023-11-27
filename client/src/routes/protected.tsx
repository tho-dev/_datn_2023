import { Navigate, Outlet } from "react-router-dom";
export const protectedRouter = () => {
  const user = JSON.parse(localStorage.getItem("persist:root") as string);
  if (user) {
    const auth = JSON.parse(user?.global);

    if (auth?.isLogin == true) {
      if (auth?.user?.role == "admin") {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }
  return false;
};

const PrivateRoute = (component: any) => {
  return protectedRouter() ? (
    <Outlet />
  ) : (
    <Navigate to="/dang-nhap" /> || component
  );
};

export default PrivateRoute;
