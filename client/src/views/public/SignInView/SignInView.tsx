import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

type Props = {};

const SignInView = (props: Props) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>ThinkPro | Đăng Nhập</title>
			</Helmet>
			<h1>Đăng Nhập</h1>
		</HelmetProvider>
	);
};

export default SignInView;
