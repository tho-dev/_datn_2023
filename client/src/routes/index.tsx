import { RouteObject } from "react-router-dom";

// view layout
import MainLayout from "~/layouts/MainLayout";
import AuthLayout from "~/layouts/AuthLayout";
import DefaultLayout from "~/layouts/DefaultLayout";
import AdminLayout from "~/layouts/AdminLayout";

// view client
import { HomeView } from "~/views/public/HomeView";
import { SignInView } from "~/views/public/SignInView";
import { SignUpView } from "~/views/public/SignUpView";
import { SlugView } from "~/views/public/SlugView";
import { CartView } from "~/views/public/CartView/";
import { OrderView } from "~/views/public/OrderView";
import { ProfileView } from "~/views/public/ProfileView/";
import { ProductDetailView } from "~/views/public/ProductDetailView";
import { NewsView } from "~/views/public/NewsView";
import { ContentView } from "~/views/public/ContentView";
import { NotFoundView } from "~/views/public/NotFoundView";

// view admin
import { DashboardView } from "~/views/private/DashboardView";
import { ProductManagerView } from "~/views/private/ProductManagerView";
import { AddProductManagerView } from "~/views/private/ProductManagerView/components/AddProductMangerView";
import { UpdateProductManagerView } from "~/views/private/ProductManagerView/components/UpdateProductMangerView";
import { CategoryManagerView } from "~/views/private/CategoryManagerView";
import OrderManagementView from "~/views/private/OrderManagementView";
import OrderDetailView from "~/views/private/OrderManagementView/childrenViews/OrderDetailView";
import SubCategoryView from "~/views/private/SubCategoryView";
import { UserListManagerView } from "~/views/private/UserListManagerView";
import { BrandView } from "~/views/private/BrandView";
import SearchView from "~/views/public/SearchView/SearchView";
import PostCategoryManagement from "~/views/private/CategoryManagerView/PostCategoryManagement";
import { CompareView } from "~/views/public/CompareView";
import { Payment } from "~/views/public/PaymentView";
import PostManagementView from "~/views/private/PostManagementView";

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
						path: "don-hang",
						element: <OrderView />,
					},
					{
						path: "thong-tin",
						element: <ProfileView />,
					},
					{
						path: ":slug",
						element: <SlugView />,
					},
					{
						path: ":slug/:slug",
						element: <ProductDetailView />,
					},
					{
						path: "tin-tuc",
						element: <NewsView />,
					},
					{
						path: "noi-dung",
						element: <ContentView />,
					},
					{
						path: "so-sanh",
						element: <CompareView />,
					},
					{
						path: "tim-kiem",
						element: <SearchView />,
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
						],
					},
					{
						path: "*",
						element: <NotFoundView />,
					},
				],
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
				path: "danh-muc",
				element: <CategoryManagerView />,
			},
			{
				path: "danh-muc-bai-viet",
				element: <PostCategoryManagement />,
			},
			{
				path: "bai-viet",
				element: <PostManagementView />,
			},
			{
				path: "danh-muc-con",
				element: <SubCategoryView />,
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
				path: "tai-khoan",
				element: <UserListManagerView />,
			},
			{
				path: "thuong-hieu",
				element: <BrandView />,
			},
		],
	},
];

export default routes;
