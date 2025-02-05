# 📌 Node.js Express Backend

## 📦 Cài đặt và chạy dự án

### 1️ Clone repository

Đầu tiên, bạn cần clone repository về máy:

```
git clone <repository-url>
cd <repository-folder>

```
### 2️ Cài đặt dependencies

Sử dụng npm để cài đặt các package cần thiết:

```
npm install

```
### 3️ Cài đặt migrations với sequelize-cli

#### 3️.1 Cấu hình file config/config.json

Mở file config/config.json và cấu hình kết nối cơ sở dữ liệu cho dự án (ví dụ: MySQL, PostgreSQL).

#### 3.2 Chạy migration

Khi đã chuẩn bị các migration, bạn có thể chạy chúng để tạo các bảng trong cơ sở dữ liệu:

```
npx sequelize-cli db:migrate

```
#### 3.3 (Tuỳ chọn) Seed dữ liệu mẫu

Nếu bạn muốn thêm dữ liệu mẫu vào cơ sở dữ liệu, có thể sử dụng lệnh sau:

```
npx sequelize-cli db:seed:all

