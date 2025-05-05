# Spotify Clone

Một ứng dụng web hiện đại mô phỏng các tính năng và giao diện người dùng của Spotify, được xây dựng bằng React và Vite.

## 🚀 Tính Năng

- Giao diện người dùng hiện đại và responsive
- Xác thực người dùng với Clerk
- Quản lý trạng thái với Zustand
- Định dạng với Tailwind CSS
- Điều hướng với React Router
- Thông báo với React Hot Toast

## 🛠️ Công Nghệ Sử Dụng

- React.js 19
- Vite 6
- Tailwind CSS 4
- React Router DOM 7
- Zustand (quản lý state)
- Clerk (xác thực)
- Axios
- React Hot Toast

## 📋 Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:
- Node.js (phiên bản 14.0.0 trở lên)
- npm hoặc yarn
- Git
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, hoặc Edge)

## 🔧 Cài Đặt

### 1. Clone repository:
```bash
git clone https://github.com/yourusername/spotify-clone.git
cd spotify-clone
```

### 2. Cài đặt các dependencies:
```bash
npm install
# hoặc
yarn install
```

### 3. Cấu hình môi trường:
Tạo file `.env` trong thư mục gốc và thêm các biến môi trường cần thiết:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 4. Khởi động máy chủ phát triển:
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ có sẵn tại `http://localhost:5173`

## 🌍 Thiết Lập Môi Trường

### Môi Trường Phát Triển
- Node.js v14.0.0 trở lên
- npm v6.0.0 trở lên
- Trình duyệt web hiện đại với JavaScript được bật
- Máy chủ phát triển cục bộ (được cung cấp bởi Vite)

### Môi Trường Sản Xuất
- Node.js v14.0.0 trở lên
- npm v6.0.0 trở lên
- Máy chủ web (ví dụ: Nginx, Apache)
- Chứng chỉ SSL (cho HTTPS)
- Cấu hình biến môi trường đúng cách

### Build Cho Sản Xuất
```bash
# Tạo bản build cho sản xuất
npm run build
# hoặc
yarn build

# Xem trước bản build
npm run preview
# hoặc
yarn preview
```

## 🎯 Cấu Trúc Dự Án

```
spotify-clone/
├── src/
│   ├── assets/        # Tài nguyên tĩnh
│   ├── components/    # Các component UI có thể tái sử dụng
│   ├── layout/        # Các component layout
│   ├── lib/          # Các utility functions và cấu hình
│   ├── pages/        # Các component trang
│   ├── providers/    # Các context providers
│   ├── stores/       # Zustand stores
│   ├── types/        # TypeScript types
│   ├── App.jsx       # Component gốc
│   ├── main.jsx      # Entry point
│   └── index.css     # Styles toàn cục
├── public/           # Tài nguyên công khai
└── ...
```

## 📝 Giấy Phép

Dự án này được cấp phép theo MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

