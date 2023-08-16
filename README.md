# Quy ước chung dự án
* `commit`: tiếng việt & chữ thường
    - `FE|feat: nội dung commit`
    - `FE|fix: nội dung commit`
    - `FE|delete: nội dung commit`
    - `BE|feat: nội dung commit`
    - `BE|fix: nội dung commit`
    - `BE|delete: nội dung commit`
* `Quy ước đặt tên branch`:
    - `VD`: giao diện trang chủ -> `giao-dien-trang-chu` 
* `Đặt tên file trong thư mục`: views
    - Example/[index.ts, Example.tsx]
    - `Trong index.ts`: export { default as ExampleView } from "./Example.tsx"
* `GlobalStyle`: cấu hình trong thư mục themes
    - `Màu`:
    - `Custom Style Component`:
* `Đặt lên file trong thư mục`: services -> viết các hàm gọi api
    - `VD`: example.service.ts
    - `Lưu ý`: dùng method trong cấu hình axios nằm trong `utils/http.ts`
        + `VD`: xem trong `services/product.service.ts`
* `Size font`: dùng mặc đinh của `Chakra-UI`
    - `2xs`: 10px
    - `xs`: 12px
    - `sm`: 14px
    - `md`: 16px
    - `lg`: 18px
    - `xl`: 20px
    - `2xl`: 24px
* `Size button`: custom trong `themes/components/button.ts`
    - `small`: nhỏ
    - `medium`: trung bình
    - `lager`: to 
* `Khi nào nên dùng thư mục components trong từng thư mục nằm trong views `: Nếu trang đó chứa nhiều thành phần thì mn có thể tách ra từng component nhỏ rồi ghép lại vào nhé 🎉🎉🎉
