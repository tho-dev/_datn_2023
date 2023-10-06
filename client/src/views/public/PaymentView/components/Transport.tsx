import React, { useState, useRef, useEffect } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text,
	Flex,
	Box,
	Heading,
	Input,
} from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";
import axios from "axios";

type Props = {
	addres: any;
};

const Transport = ({ addres }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [district, setDistrict] = useState<any>({});
	const [conscious, setConscious] = useState([]);
	const [value, setValue] = useState<string>("");
	useEffect(() => {
		axios.get("https://provinces.open-api.vn/api/").then(({ data }) => setConscious(data));
		///huyện
		// axios.get("https://provinces.open-api.vn/api/p/1?depth=2").then(({ data }) => setcountry(data));
		///xã
		// axios.get("https://provinces.open-api.vn/api/d/1?depth=2").then(({ data }) => setcountry(data));
	}, []);

	const districtConsious = async (item: any) => {
		if (
			item.division_type == "huyện" ||
			item.division_type == "thị xã" ||
			item.ivision_type == "thành phố" ||
			item.division_type == "quận"
		) {
			return await axios.get("https://provinces.open-api.vn/api/" + `d/${item.code}?depth=2`).then(({ data }) => {
				setConscious(data.wards);
				setValue(item.name + "," + value);
			});
		}
		if (item.division_type == "xã" || item.division_type == "phường") {
			setValue(item.name + "," + value);
			onClose();
		}

		return await axios.get("https://provinces.open-api.vn/api/" + `p/${item.code}?depth=2`).then(({ data }) => {
			setConscious(data.districts);
			setValue(item.name + "," + value);
		});
	};

	useEffect(() => {
		addres(value);
	}, [value]);

	return (
		<Box>
			<Flex>
				<Flex
					onClick={onOpen}
					as={"button"}
					fontSize={"14px"}
					alignItems={"center"}
					textAlign={"center"}
					color={"text.blue"}
					border={"none"}
					pl={"8px"}
					py={"2px"}
					placeholder="Khu vực"
					bg={"#F6F9FC"}
					borderRadius={"6px"}
					w={"full"}
					justifyContent={"space-between"}
				>
					Chọn địa chỉ giao hàng
					<Flex
						w="9"
						h="9"
						right="4"
						top={"calc(50% - 24px)"}
						translateY="-50%"
						zIndex="5"
						rounded="full"
						cursor="pointer"
						alignItems="center"
						justifyContent="center"
						className="btn-next"
					>
						<NavArrowRightIcon size={4} strokeWidth={2} color="text.black" />
					</Flex>
				</Flex>

				{/* Modal */}
				<DialogThinkPro
					isOpen={isOpen}
					onClose={onClose}
					isCentered
					title={<Heading fontSize="xl">Chọn Tỉnh / Thành phố{district ? district?.name : ""}</Heading>}
				>
					<Box>
						<Flex>
							<Text>Tỉnh/Thành phố</Text>|<Text>Quận/Huyện</Text>|<Text>Phường/Xã</Text>
						</Flex>
					</Box>
					<Input placeholder={"Tìm kiếm ....."} />
					{conscious?.map((item: any) => (
						<Box
							borderBottom={"1px soid #E6E8EA"}
							key={item.code}
							py={"16px"}
							as={"button"}
							display={"block"}
							onClick={() => districtConsious(item)}
						>
							{item.name}
						</Box>
					))}
				</DialogThinkPro>
			</Flex>
		</Box>
	);
};

export default Transport;
