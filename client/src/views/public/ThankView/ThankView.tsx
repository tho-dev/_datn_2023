import { Text, Flex, Image, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import logo from "~/assets/images/logo-thinkpro.svg";
import { usePaymentStatusMutation } from "~/redux/api/order";

const ThankView = () => {
	let payment: any = {};
	const [searchParams] = useSearchParams();
	const [time, setTime] = useState<number>(5);
	const navigate = useNavigate();
	const [paymentStatus] = usePaymentStatusMutation();

	for (const entry of searchParams.entries()) {
		const [param, value] = entry;
		payment = {
			...payment,
			[param]: value,
		};
	}
	useEffect(() => {
		const fetchApi = async () => {
			try {
				await paymentStatus(payment);
			} catch (error) {
				console.log(error);
			}
		};
		fetchApi();
	}, []);

	useEffect(() => {
		if (time == 0) {
			navigate("/");
		}
		const timeout = setTimeout(() => {
			setTime(time - 1);
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [time]);

	return (
		<Flex
			width="100%"
			justifyContent="center"
			alignItems="center"
			bgColor="white"
			my="12"
			rounded="2xl"
		>
			<Flex
				width="100%"
				height="480px"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				padding={8}
				gap={4}
			>
				<Flex
					w="160px"
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
				>
					<Image
						src={logo}
						objectFit="contain"
						aspectRatio="16/9"
					/>
				</Flex>
				<Text
					fontSize="36px"
					fontWeight="bold"
					textTransform="capitalize"
				>
					Thank You !
				</Text>
				<Text
					fontSize={18}
					fontWeight="semibold"
				>
					Đơn hàng đã đặt thành công, bạn sẽ được chuyển đến trang chủ sau {time}
				</Text>
				<Link to="/">
					<Button
						bg="bg.bgEdit"
						color="text.textEdit"
						rounded="full"
						fontWeight="bold"
					>
						Chuyển đến ngay
					</Button>
				</Link>
			</Flex>
		</Flex>
	);
};

export default ThankView;
