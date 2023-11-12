export function sortJSON(data: any[]) {
  // Lọc ra các đối tượng có "name" là "specs" và "type"
  const specsObj = data.filter((obj) => obj.name === 'specs')[0];
  const typeObj = data.filter((obj) => obj.name === 'type')[0];

  // Loại bỏ các đối tượng "specs" và "type" khỏi mảng gốc
  data = data.filter((obj) => obj.name !== 'specs' && obj.name !== 'type');

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
  if (phoneNumber.startsWith('84') && phoneNumber.length === 11) {
    return '0' + phoneNumber.substring(2);
  }
  return phoneNumber;
}
export const objectToUrlParams = (obj: { [key: string]: any }) => {
  const params = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && (obj[key] || obj[key] === false || typeof obj[key] === 'string')) {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  }

  return params.join('&');
};

export const formatNumber = (str: string) => {
  return str
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + '.') + prev;
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
export const formatCurrency = (value: any, locale = 'vi-VN', currency = 'VND') => {
  if (!value) return '';
  return value.toLocaleString(locale, { style: 'currency', currency: currency });
};


export const validateEmail = (value: string) => {
  // Mẫu regex kiểm tra định dạng email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};
