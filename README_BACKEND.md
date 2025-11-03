# Tripook Backend - Spring Boot API

## Mô tả dự án
Tripook là nền tảng giúp khách du lịch tìm/đặt nơi ở, và nhà cung cấp đăng/quản lý dịch vụ (khách sạn, homestay), với thanh toán online VNPay/Momo, đánh giá/bình luận, lưu yêu thích, và hiển thị vị trí dịch vụ.

## Công nghệ sử dụng
- **Spring Boot 3.5.7** (Java 17+)
- **Spring Web** (REST API)
- **Spring Data JPA** (ORM)
- **Spring Security + JWT** (Authentication & Authorization)
- **Bean Validation** (Validation)
- **Flyway** (Database Migration)
- **PostgreSQL** (Database)
- **Maven** (Build Tool)

## Cấu trúc dự án

```
src/main/java/com/AccomodationWebApp/Tripook/
├── TripookApplication.java          # Main application class
├── config/
│   └── WebSecurityConfig.java      # Security configuration
├── controller/
│   ├── AuthController.java         # Authentication endpoints
│   └── TestController.java         # Test endpoints
├── dto/
│   ├── request/
│   │   ├── LoginRequest.java
│   │   └── SignupRequest.java
│   └── response/
│       ├── JwtResponse.java
│       └── MessageResponse.java
├── entity/
│   ├── User.java                   # User entity
│   ├── Accommodation.java          # Accommodation entity
│   ├── AccommodationImage.java     # Accommodation images
│   ├── Booking.java                # Booking entity
│   ├── Payment.java                # Payment entity
│   ├── Review.java                 # Review entity
│   └── Favorite.java               # Favorite entity
├── repository/
│   ├── UserRepository.java
│   ├── AccommodationRepository.java
│   ├── BookingRepository.java
│   ├── ReviewRepository.java
│   ├── FavoriteRepository.java
│   └── PaymentRepository.java
├── security/
│   ├── JwtUtils.java               # JWT utilities
│   ├── AuthTokenFilter.java        # JWT filter
│   └── AuthEntryPointJwt.java      # JWT entry point
└── service/
    └── UserDetailsServiceImpl.java # User details service
```

## Setup và chạy dự án

### Yêu cầu hệ thống
- Java 17 hoặc cao hơn
- Maven 3.6+
- PostgreSQL 12+

### 1. Clone dự án
```bash
git clone <repository-url>
cd SpringBoot_Tripook/Tripook
```

### 2. Cài đặt PostgreSQL
1. Tải và cài đặt PostgreSQL từ [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
2. Tạo database và user:
```sql
-- Kết nối với PostgreSQL như superuser
psql -U postgres

-- Tạo database
CREATE DATABASE tripook_db;

-- Tạo user
CREATE USER tripook_user WITH PASSWORD 'tripook_password';

-- Cấp quyền
GRANT ALL PRIVILEGES ON DATABASE tripook_db TO tripook_user;
```

### 3. Cấu hình database
Cập nhật thông tin database trong `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tripook_db
spring.datasource.username=tripook_user
spring.datasource.password=tripook_password
```

### 4. Chạy ứng dụng
```bash
# Sử dụng Maven wrapper (được khuyến nghị)
./mvnw spring-boot:run

# Hoặc nếu đã cài Maven globally
mvn spring-boot:run
```

Ứng dụng sẽ chạy trên port 8080: http://localhost:8080

### 5. Test API endpoints

#### Authentication Endpoints

**Đăng ký tài khoản:**
```bash
curl -X POST http://localhost:8080/api/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "0123456789",
  "role": "GUEST"
}'
```

**Đăng nhập:**
```bash
curl -X POST http://localhost:8080/api/auth/signin \
-H "Content-Type: application/json" \
-d '{
  "usernameOrEmail": "testuser",
  "password": "password123"
}'
```

**Test protected endpoints:**
```bash
# Public endpoint
curl http://localhost:8080/api/test/all

# Protected endpoint (cần JWT token)
curl -H "Authorization: Bearer <JWT_TOKEN>" \
http://localhost:8080/api/test/user
```

## Database Schema

### Entities chính:
- **Users**: Quản lý thông tin người dùng (Guest, Host, Admin)
- **Accommodations**: Thông tin nơi lưu trú (hotel, homestay, apartment, v.v.)
- **Bookings**: Thông tin đặt phòng
- **Payments**: Thông tin thanh toán
- **Reviews**: Đánh giá và bình luận
- **Favorites**: Danh sách yêu thích
- **AccommodationImages**: Hình ảnh nơi lưu trú

### Relationships:
- User (1) -> (N) Accommodation (Host)
- User (1) -> (N) Booking (Guest)
- User (1) -> (N) Review
- User (1) -> (N) Favorite
- Accommodation (1) -> (N) Booking
- Accommodation (1) -> (N) Review
- Accommodation (1) -> (N) Favorite
- Accommodation (1) -> (N) AccommodationImage
- Booking (1) -> (N) Payment

## Các bước tiếp theo

### Backend Features cần implement:
1. **Accommodation Management API**
   - CRUD operations cho accommodations
   - Upload và quản lý hình ảnh
   - Search và filter

2. **Booking Management API**
   - Tạo, cập nhật, hủy booking
   - Kiểm tra availability
   - Tính toán giá

3. **Payment Integration**
   - VNPay integration
   - Payment processing
   - Refund handling

4. **Review System**
   - CRUD operations cho reviews
   - Rating calculations

5. **Search & Filter**
   - Location-based search
   - Price range filtering
   - Amenities filtering

6. **File Upload Service**
   - Cloudinary integration
   - Image optimization

### Frontend Setup (React + TypeScript):
Sau khi hoàn thành backend, chúng ta sẽ thiết lập frontend với:
- React 18 + TypeScript
- TailwindCSS
- React Router
- Axios client
- Zustand/Redux Toolkit
- Leaflet + OpenStreetMap

## Troubleshooting

### Lỗi thường gặp:
1. **Connection refused**: Kiểm tra PostgreSQL đã chạy chưa
2. **Authentication failed**: Kiểm tra username/password database
3. **Port already in use**: Đổi port trong application.properties
4. **JWT secret key**: Đảm bảo secret key đủ dài (>= 512 bits)

### Logs và debugging:
- Check application logs trong terminal
- PostgreSQL logs: `/var/log/postgresql/`
- Enable SQL logging: `spring.jpa.show-sql=true`

---

## License
This project is licensed under the MIT License.