export const sortOptions = (input) => {
	input.sort((a, b) => (a.position > b.position ? 1 : -1))
	return input
}

export const checkStatusOrder = (status) => {
	if (status == "processing") {
		return "Chờ xác nhận"
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