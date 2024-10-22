import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { PDFDocument } from "pdf-lib";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";



export function sortJSON(data: any[]) {
	// Lọc ra các đối tượng có "name" là "specs" và "type"
	const specsObj = data.filter((obj) => obj.name === "specs")[0];
	const typeObj = data.filter((obj) => obj.name === "type")[0];

	// Loại bỏ các đối tượng "specs" và "type" khỏi mảng gốc
	data = data.filter((obj) => obj.name !== "specs" && obj.name !== "type");

	// Thêm đối tượng "specs" và "type" vào đầu mảng
	data.unshift(specsObj);
	data.push(typeObj);

	return data;
}
export function replaceCounter(str: string, counter: any, counterLength: any) {
	if (!(str && counter && counterLength)) {
		return "No data"
	}
	// Loại bỏ phần counter hiện tại
	const parts = str.split("-");
	const baseStr = parts.slice(0, -1).join("-");

	// Chuyển số đếm thành chuỗi và thêm số 0 vào đầu nếu cần, với chiều dài xác định
	const formattedCounter = String(counter).padStart(counterLength, '0');

	// Kết hợp chuỗi base với số đếm mới
	return `${baseStr}-${formattedCounter}`;
}

export const countPdfPages = async (pdfBytes: any) => {
	// Tải PDF từ buffer/byte array
	const pdfDoc = await PDFDocument.load(
		await fetch(pdfBytes).then((res) => res.arrayBuffer())
	);

	// Lấy số trang của PDF
	const numberOfPages = pdfDoc.getPageCount();

	return numberOfPages;
};
export function chuyenDoiSoDienThoai(soDienThoai: any) {
	// Sử dụng biểu thức chính quy để tìm và thay thế số điện thoại
	// từ định dạng Việt Nam sang định dạng quốc tế
	const regex = /^0(\d{9})$/; // Kiểm tra xem số điện thoại có bắt đầu bằng số 0 và có 10 chữ số không
	if (regex.test(soDienThoai)) {
		// Nếu số điện thoại hợp lệ
		return "+84" + soDienThoai.substr(1); // Thay thế số 0 bằng +84
	} else {
		// Nếu số điện thoại không hợp lệ
		return false;
	}
}
export const convertBlobUrlToBase64 = async (blobUrl: string) => {
	// Tải blob từ URL
	const response = await fetch(blobUrl);
	const blob = await response.blob();

	// Chuyển blob thành Base64
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result);  // Trả về toàn bộ chuỗi Base64 bao gồm định dạng
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}
export function chuyenDoiSoDienThoaiVe0(soDienThoai: any) {
	soDienThoai = soDienThoai.toString();
	// Kiểm tra xem số điện thoại có đúng định dạng "849" hay không
	if (/^849\d{8}$/.test(soDienThoai) && soDienThoai) {
		// Loại bỏ ký tự "84" ở đầu và trả về số điện thoại đã chuyển đổi
		return "0" + soDienThoai.slice(2);
	} else {
		// Nếu số điện thoại không đúng định dạng, trả về thông báo lỗi hoặc giữ nguyên số đó
		return "Số điện thoại không hợp lệ";
	}
}
export function formatPhoneNumber(phoneNumber: string) {
	if (phoneNumber.startsWith("84") && phoneNumber.length === 11) {
		return "0" + phoneNumber.substring(2);
	}
	return phoneNumber;
}
export function formatPhoneNumberPlus(phoneNumber: string) {
	if (phoneNumber.startsWith("+84") && phoneNumber.length === 12) {
		return "0" + phoneNumber.substring(3);
	}
	return phoneNumber;
}
export const objectToUrlParams = (obj: { [key: string]: any }) => {
	const params = [];

	for (const key in obj) {
		if (
			Object.prototype.hasOwnProperty.call(obj, key) &&
			(obj[key] || obj[key] === false || typeof obj[key] === "string")
		) {
			params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
		}
	}

	return params.join("&");
};

export const formatNumber = (str: string) => {
	return str
		.split("")
		.reverse()
		.reduce((prev, next, index) => {
			return (index % 3 ? next : next + ".") + prev;
		});
};

export const generateVariant = (input: any) => {
	if (input.length === 0) return [];

	let result = [[]] as any;

	for (const option of input) {
		const name = option.name.value;
		const optionValues = option.options;

		if (optionValues.length === 0) continue;

		const append = [];

		for (const valueObj of optionValues) {
			const label = valueObj.label;
			const value = valueObj.value;
			for (const data of result) {
				const newVariant = [
					...data,
					{
						name: name,
						label: label,
						value: value,
					},
				];
				append.push(newVariant);
			}
		}

		result = append;
	}

	return result;
};
export const formatCurrency = (value: any, locale = "vi-VN", currency = "VND") => {
	if (!value) return "";
	return value.toLocaleString(locale, { style: "currency", currency: currency });
};

export const validateEmail = (value: string) => {
	// Mẫu regex kiểm tra định dạng email
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(value);
};

export const baseQuery = fetchBaseQuery({
	baseUrl: process.env.VITE_API_URL,
	// xét token vào headers
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as any).persistedReducer.global.accessToken;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const checkStatusOrder = (status: string) => {
	if (status == "processing") {
		return "Chờ xác nhận";
	}
	if (status == "confirmed") {
		return "Đã xác nhận";
	}
	if (status == "delivering") {
		return "Đang vận chuyển";
	}
	if (status == "cancelled") {
		return "Đã huỷ đơn";
	}
	if (status == "delivered") {
		return "Đã hoàn thành";
	}
	if (status == "returned") {
		return "Đã hoàn hàng";
	}
	return "Chờ xác nhận";
};

export const checkOrderStatus = (status: string) => {
	switch (status) {
		case "processing":
			return {
				status: "Chờ xác nhận",
				color: "#f1bf63",
				background: "#fcf2da",
			};
		case "pendingComplete":
			return {
				status: "Chờ hoàn thành",
				color: "#f1bf63",
				background: "#fcf2da",
			};
		case "returned":
			return {
				status: "Đã hoàn hàng",
				color: "#fe3464",
				background: "#fe34641a",
			};
		case "confirmed":
			return {
				status: "Đã xác nhận",
				color: "#0abb87",
				background: "#0abb871a",
			};
		case "delivering":
			return {
				status: "Đang vận chuyển",
				color: "#0abb87",
				background: "#0abb871a",
			};
		case "cancelled":
			return {
				status: "Đã hủy đơn",
				color: "#fe3464",
				background: "#fe34641a",
			};
		case "delivered":
			return {
				status: "Đã hoàn thành",
				color: "#0abb87",
				background: "#0abb871a",
			};
	}
};
