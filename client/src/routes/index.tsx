import { RouteObject } from "react-router-dom";

// view layout
import AdminLayout from "~/layouts/AdminLayout";
import AuthLayout from "~/layouts/AuthLayout";

// view client
import { NotFoundView } from "~/views/public/NotFoundView";
import { SignInView } from "~/views/public/SignInView";

// view admin
import { BrandView } from "~/views/private/BrandView";
import { CategoryManagerView } from "~/views/private/CategoryManagerView";
import { DashboardView } from "~/views/private/DashboardView";
import { DemandView } from "~/views/private/DemandView";
import OrderManagementView from "~/views/private/OrderManagementView";
import OrderDetailView from "~/views/private/OrderManagementView/childrenViews/OrderDetailView";
import PostCategoryView from "~/views/private/PostCategoryView";
import { PostManagementView } from "~/views/private/PostManagementView";
import { QuanLyDuAnView } from "~/views/private/QuanLyDuAnView";
import { ProfileManagerView } from "~/views/private/ProfileManagerView";
import { UserListManagerView } from "~/views/private/UserListManagerView";
import { AddUserListManagerView } from "~/views/private/UserListManagerView/components/AddUserListManagerView";
import { UpdateUserListManagerView } from "~/views/private/UserListManagerView/components/UpdateUserManagerView";
import { AddPostMangerView } from "~/views/private/PostManagementView/components/AddPostMangerView";
import UpdateOrder from "~/views/private/OrderManagementView/updateOrder/UpdateOrder";
import ReturedOrder from "~/views/private/OrderManagementView/childrenViews/ReturedOrder";
import { QuanLyNguoiDungView } from "~/views/private/QuanLyNguoiDung";
import QuanLyTaiKhoanView from "~/views/private/QuanLyTaiKhoan";

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <SignInView />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <DashboardView />,
          },
          {
            path: "qlnd",
            element: <QuanLyNguoiDungView />,
          },
          {
            path: "qltk",
            element: <QuanLyTaiKhoanView />,
          },
          {
            path: "qlda",
            element: <QuanLyDuAnView />,
          },
          {
            path: "danh-muc",
            element: <CategoryManagerView />,
          },
          {
            path: "danh-muc-bai-viet",
            element: <PostCategoryView />,
          },
          {
            path: "bai-viet",
            element: <PostManagementView />,
          },
          {
            path: "bai-viet/add",
            element: (
              <AddPostMangerView
                onClose={function (): void {
                  throw new Error("Function not implemented.");
                }}
                parents={undefined}
              />
            ),
          },
          {
            path: "don-hang",
            element: <OrderManagementView />,
          },
          {
            path: "don-hang/:id",
            element: <OrderDetailView />,
          },
          {
            path: "don-hang/cap-nhat/:id",
            element: <UpdateOrder />,
          },
          {
            path: "don-hang/hang-hoan",
            element: <ReturedOrder />,
          },
          {
            path: "tai-khoan",
            element: <UserListManagerView />,
          },
          {
            path: "tai-khoan/add",
            element: <AddUserListManagerView />,
          },
          {
            path: "tai-khoan/:id/update",
            element: <UpdateUserListManagerView />,
          },
          {
            path: "profile",
            element: <ProfileManagerView />,
          },
          {
            path: "thuong-hieu",
            element: <BrandView />,
          },
          {
            path: "nhu-cau",
            element: <DemandView />,
          },
        ],
      },
      {
        path: "404",
        element: <NotFoundView />,
      },
      {
        path: "*",
        element: <NotFoundView />,
      },
    ],
  },
];

routes.push({
  path: "/admin",
  element: <NotFoundView />,
});

export default routes;
