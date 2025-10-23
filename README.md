# DailyDesk

## Giới thiệu

DailyDesk là một project Next.js nhỏ dùng để demo cấu trúc ứng dụng web hiện đại với TypeScript, Drizzle ORM và một vài thư viện phổ biến trong hệ sinh thái React.

## Công nghệ sử dụng

- Next.js (React) - framework ứng dụng web phía server và client
- TypeScript - kiểu tĩnh cho JavaScript
- Drizzle ORM (drizzle-kit) - ORM cho PostgreSQL (sử dụng driver pglite)
- PostgreSQL cơ sở dữ liệu
- Axios - HTTP client tùy chỉnh (`lib/http.ts`)
- Tailwind CSS - tiện ích giúp viết CSS nhanh
- Zod - validation schema

## Hướng dẫn code

1. HTTP client

	- Project có một HTTP client tùy chỉnh dùng `axios` tại `lib/http.ts`.
	- Để gọi API từ client hoặc server, import client này:

	  Ví dụ (client-side):

	  ```ts
	  import http from '@/lib/http';

	  const res = await http.get('/hello');
	  ```

2. Drizzle (migrations / push)

	- Các lệnh liên quan trong `package.json`:
	  - `pnpm run db:push`: Cập nhật database
	- Thiết lập env:
	  - `DATABASE_URL` cần được đặt để Drizzle kết nối tới database. Ví dụ cho pglite (local):
		 DATABASE_URL=postgresql://user:password@localhost:5432/dbname

	- Schema chính nằm trong `lib/db/schema.ts` (ví dụ table `users` được định nghĩa sẵn).

3. Cấu trúc folder chính (tóm tắt)

	- `app/` — routes và components theo Next.js App Router
	- `components/` — các component UI tái sử dụng
	- `lib/` — helper như `lib/http.ts`, `lib/db/schema.ts`
	- `db/` or `lib/db/` — nơi đặt schema và kết nối DB

5. Environment variables (ví dụ)

	- `NEXT_PUBLIC_API_BASE_URL` — base URL cho client-side API
	- `DATABASE_URL` — connection string cho Drizzle / pglite