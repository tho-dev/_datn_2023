import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "~/redux/hook/hook";

type Props = {
	children: React.ReactNode;
};

const PrivateLayout = ({ children }: Props): any => {
	const { user, isLogin } = useAppSelector((state) => state.persistedReducer.global);
	if (isLogin) {
		if (user?.role == "admin" || user?.role == "manager") {
			return children;
		} else {
			return <Navigate to="/dang-nhap" />;
		}
	} else {
		return <Navigate to="/dang-nhap" />;
	}
};

export default PrivateLayout;
