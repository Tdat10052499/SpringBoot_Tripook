-- =====================================================
-- Script setup PostgreSQL cho dự án Tripook
-- Chạy script này với quyền superuser (postgres)
-- =====================================================

-- 1. Tạo database
CREATE DATABASE tripook_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- 2. Tạo user cho ứng dụng
CREATE USER tripook_user WITH
    LOGIN
    NOSUPERUSER
    CREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD 'tripook_password';

-- 3. Cấp quyền cho user trên database
GRANT ALL PRIVILEGES ON DATABASE tripook_db TO tripook_user;

-- 4. Kết nối với database tripook_db để cấp thêm quyền
\c tripook_db;

-- 5. Cấp quyền schema cho user (cần cho Flyway)
GRANT ALL ON SCHEMA public TO tripook_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tripook_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO tripook_user;

-- 6. Cấp quyền mặc định cho các table/sequence sẽ tạo sau
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT ALL PRIVILEGES ON TABLES TO tripook_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT ALL PRIVILEGES ON SEQUENCES TO tripook_user;

-- 7. Tạo extension nếu cần (cho geolocation queries)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Hiển thị thông tin setup
SELECT 'Database tripook_db created successfully!' as status;
SELECT 'User tripook_user created with all privileges!' as status;

-- Hiển thị danh sách databases
\l

-- Hiển thị danh sách users
\du