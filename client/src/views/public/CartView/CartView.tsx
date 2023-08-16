import React from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";

type Props = {};

const CartView = (props: Props) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>ThinkPro | Giỏ hàng của bạn</title>
			</Helmet>
			<h1>Giỏ hàng</h1>
		</HelmetProvider>
	);
};

export default CartView;
