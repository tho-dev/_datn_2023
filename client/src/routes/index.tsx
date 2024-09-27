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
import { ProductManagerView } from "~/views/private/ProductManagerView";
import { AddProductManagerView } from "~/views/private/ProductManagerView/components/AddProductMangerView";
import { UpdateProductManagerView } from "~/views/private/ProductManagerView/components/UpdateProductMangerView";
import { VariantMangerView } from "~/views/private/ProductManagerView/components/VariantMangerView";
import { ProfileManagerView } from "~/views/private/ProfileManagerView";
import { SettingView } from "~/views/private/SettingView";
import { UserListManagerView } from "~/views/private/UserListManagerView";
import { AddUserListManagerView } from "~/views/private/UserListManagerView/components/AddUserListManagerView";
import { UpdateUserListManagerView } from "~/views/private/UserListManagerView/components/UpdateUserManagerView";
import { PromotionView as PromotionManageView } from "~/views/private/PromotionView";
import { AddPostMangerView } from "~/views/private/PostManagementView/components/AddPostMangerView";
import CouponView from "~/views/private/CouponView";
import AddGmailView from "~/views/private/PromotionView/Gmail/AddGmail";
import GmailView from "~/views/private/PromotionView/Gmail/Gmail";
import UpdateOrder from "~/views/private/OrderManagementView/updateOrder/UpdateOrder";
import ReturedOrder from "~/views/private/OrderManagementView/childrenViews/ReturedOrder";

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
            element: <PromotionManageView />,
          },
          {
            path: "coupon",
            element: <CouponView />,
          },
          {
            path: "san-pham",
            element: <ProductManagerView />,
          },
          {
            path: "san-pham/add",
            element: <AddProductManagerView />,
          },
          {
            path: "san-pham/:id/update",
            element: <UpdateProductManagerView />,
          },
          {
            path: "san-pham/:product_id/bien-the/:sku_id",
            element: <VariantMangerView />,
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
            path: "cau-hinh",
            element: <SettingView />,
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
