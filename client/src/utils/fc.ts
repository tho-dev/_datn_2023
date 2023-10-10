export function sortJSON(data: any[]) {
    // Lọc ra các đối tượng có "name" là "specs" và "type"
    const specsObj = data.filter(obj => obj.name === "specs")[0];
    const typeObj = data.filter(obj => obj.name === "type")[0];

    // Loại bỏ các đối tượng "specs" và "type" khỏi mảng gốc
    data = data.filter(obj => obj.name !== "specs" && obj.name !== "type");

    // Thêm đối tượng "specs" và "type" vào đầu mảng
    data.unshift(specsObj);
    data.push(typeObj);

    return data;
}

export function chuyenDoiSoDienThoai(soDienThoai: any) {
    // Sử dụng biểu thức chính quy để tìm và thay thế số điện thoại
    // từ định dạng Việt Nam sang định dạng quốc tế
    const regex = /^0(\d{9})$/; // Kiểm tra xem số điện thoại có bắt đầu bằng số 0 và có 10 chữ số không
    if (regex.test(soDienThoai)) {
        // Nếu số điện thoại hợp lệ
        return '+84' + soDienThoai.substr(1); // Thay thế số 0 bằng +84
    } else {
        // Nếu số điện thoại không hợp lệ
        return false;
    }
}