# CapCut - Video Editing Application

Giao diện ứng dụng chỉnh sửa video hiện đại được xây dựng bằng **Next.js**, **React** và **TypeScript**. Ứng dụng cung cấp các tính năng như chỉnh sửa video, quản lý dự án, xác thực người dùng và tích hợp bot tự động hóa.

## Tính năng chính

- **Video Editor** - Chỉnh sửa video với giao diện trực quan
- **Authentication** - Đăng nhập, đăng ký và quản lý tài khoản
- **Project Management** - Tạo, lưu trữ và quản lý các dự án video
- **Matrix Bot** - Tích hợp bot tự động hóa cho các tác vụ liên quan đến kênh
- **Dashboard** - Bảng điều khiển quản lý tài khoản và dự án
- **Responsive UI** - Giao diện đẹp, tương thích với mọi thiết bị

## Tech Stack

### Frontend
- **Framework:** Next.js 16.2.0
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4.2.0
- **Component Library:** Radix UI
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Chart:** Recharts
- **Icons:** Lucide React

### Development
- **Language:** TypeScript 5.7.3
- **Linting:** ESLint
- **Build Tool:** Next.js CLI

## Yêu cầu hệ thống

- Node.js 18+ 
- npm hoặc yarn
- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)

## Cài đặt và Chạy

### 1. Clone repository
```bash
git clone <repository-url>
cd capcut
```

### 2. Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### 3. Chạy development server
```bash
npm run dev
```

Truy cập ứng dụng tại `http://localhost:3000`

## Cấu trúc dự án

```
capcut/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React Components
│   ├── ui/                       # Reusable UI components (Radix UI)
│   ├── auth/                     # Authentication components
│   ├── shared/                   # Shared components
│   ├── matrix-bot/               # Bot-related components
│   └── video-editor/             # Video editor components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── public/                       # Static assets
├── styles/                       # Global CSS
├── next.config.mjs               # Next.js configuration
├── tailwind.config.mjs           # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies
```

## Các lệnh chính

```bash
# Chạy development server
npm run dev

# Build ứng dụng
npm run build

# Chạy production server
npm start

# Kiểm tra linting
npm run lint
```

## Các component chính

### Video Editor (`components/video-editor/`)
- `video-editor.tsx` - Thành phần chính của video editor
- `timeline.tsx` - Timeline chỉnh sửa
- `video-preview.tsx` - Xem trước video
- `left-panel.tsx` - Panel điều khiển bên trái
- `right-main-area.tsx` - Khu vực chính bên phải
- `bottom-action-bar.tsx` - Thanh hành động dưới cùng

### Authentication (`components/auth/`)
- `auth-form.tsx` - Form đăng nhập/đăng ký

### Matrix Bot (`components/matrix-bot/`)
- `matrix-bot.tsx` - Thành phần chính của bot
- `bot-sidebar.tsx` - Sidebar bot
- `views/` - Các views khác nhau (accounts, channels, dashboard, etc.)

### UI Components (`components/ui/`)
Thư viện đầy đủ các component UI được xây dựng trên Radix UI:
- Form components (input, textarea, select, etc.)
- Layout components (sidebar, card, dialog, etc.)
- Display components (table, toast, alert, etc.)

## Tính năng giao diện

### Editor Video
- Timeline chỉnh sửa tương tác
- Xem trước video theo thời gian thực
- Panel điều khiển bên trái/phải
- Thanh hành động dưới cùng cho các công cụ chỉnh sửa

### Quản lý dự án
- Tạo và quản lý các dự án video
- Lưu trữ cấu hình dự án
- Giao diện tổ chức các tài sản

### Giao diện người dùng
- Bảng điều khiển (Dashboard)
- UI components có thể tái sử dụng
- Hỗ trợ Dark Mode
- Responsive design cho các thiết bị khác nhau


