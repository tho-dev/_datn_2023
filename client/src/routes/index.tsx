import { RouteObject } from "react-router-dom";

// view layout
import AdminLayout from "~/layouts/AdminLayout";
import AuthLayout from "~/layouts/AuthLayout";
import DefaultLayout from "~/layouts/DefaultLayout";
import MainLayout from "~/layouts/MainLayout";

// view client
import { CartView } from "~/views/public/CartView/";
import NewsView from "~/views/public/NewsView/NewsView";
import { HomeView } from "~/views/public/HomeView";
import { ContentView } from "~/views/public/NewsView";
import { NotFoundView } from "~/views/public/NotFoundView";
import { ProductDetailView } from "~/views/public/ProductDetailView";
import { ProfileView } from "~/views/public/ProfileView/";
import { SignInView } from "~/views/public/SignInView";
import { SignUpView } from "~/views/public/SignUpView";
import { SlugView } from "~/views/public/SlugView";

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
import { CompareView } from "~/views/public/CompareView";
import { CreatePasswordView } from "~/views/public/CreatePasswordView";
import { HistoryOrderView } from "~/views/public/HistoryOrderView";
import { Payment } from "~/views/public/PaymentView";
import { PromotionView } from "~/views/public/PromotionView";
import ResetPasswordView from "~/views/public/ResetPasswordView/ResetPasswordView";
import { SearchView } from "~/views/public/SearchView";
import { ThankView } from "~/views/public/ThankView";
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
				element: <MainLayout />,
				children: [
					{
						index: true,
						element: <HomeView />,
					},
					{
						path: "gio-hang",
						element: <CartView />,
					},
					{
						path: "thanh-toan",
						element: <Payment />,
					},
					{
						path: "so-sanh/:slug",
						element: <CompareView />,
					},
					{
						path: "thong-tin",
						element: <ProfileView />,
					},
					{
						path: "tin-tuc/:slug",
						element: <NewsView />,
					},
					{
						path: "tin-tuc/:slug/:slug",
						element: <ContentView />,
					},
					{
						path: "tim-kiem",
						element: <SearchView />,
					},
					{
						path: "lich-su-mua-hang",
						element: <HistoryOrderView />,
					},
					{
						path: "khuyen-mai/:slug",
						element: <PromotionView />,
					},
					{
						path: "thanks",
						element: <ThankView />,
					},
					{
						path: ":slug",
						element: <SlugView />,
					},
					{
						path: ":slug/:slug",
						element: <ProductDetailView />,
					},
				],
			},
			{
				element: <DefaultLayout />,
				children: [
					{
						element: <AuthLayout />,
						children: [
							{
								path: "dang-nhap",
								element: <SignInView />,
							},
							{
								path: "dang-ky",
								element: <SignUpView />,
							},
							{
								path: "thiet-lap-mat-khau",
								element: <ResetPasswordView />,
							},
							{
								path: "quen-mat-khau",
								element: <CreatePasswordView />,
							},
						],
					},
					{
						path: "*",
						element: <NotFoundView />,
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
						path: "khuyen-mai",
						element: <PromotionManageView />,
					},
					{
						path: "khuyen-mai/gmail/add",
						element: <AddGmailView />,
					},
					{
						path: "khuyen-mai/gmail",
						element: <GmailView />,
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
