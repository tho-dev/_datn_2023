import React from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";

type Props = {};

const SignUpView = (props: Props) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>ThinkPro | Đăng ký</title>
			</Helmet>
			<h1>Đăng ký</h1>
		</HelmetProvider>
	);
};

export default SignUpView;
