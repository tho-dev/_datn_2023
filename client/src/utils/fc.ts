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