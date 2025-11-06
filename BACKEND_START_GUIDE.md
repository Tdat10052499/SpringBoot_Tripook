# Hướng dẫn khởi động Backend

## Cách 1: Sử dụng IDE (KHUYẾN NGHỊ)
1. Mở **IntelliJ IDEA** hoặc **Eclipse**
2. Import project từ folder: `C:\Users\tdat1\SpringBoot_Tripook\Tripook`
3. Chạy file: `src/main/java/com/AccomodationWebApp/Tripook/TripookApplication.java`
4. Click nút Run/Debug

## Cách 2: Command Prompt (không phải PowerShell)
1. Mở **Command Prompt** (cmd.exe) - KHÔNG PHẢI PowerShell
2. Chạy lệnh:
```cmd
cd C:\Users\tdat1\SpringBoot_Tripook\Tripook
mvnw.cmd spring-boot:run
```

## Cách 3: Nếu có Maven global
```cmd
cd C:\Users\tdat1\SpringBoot_Tripook\Tripook  
mvn spring-boot:run
```

## Kiểm tra Backend chạy thành công:
- Truy cập: http://localhost:8080/api/health
- Thấy JSON response = thành công

## Sau khi Backend chạy:
1. Mở frontend: http://localhost:3000/test-api
2. Test các API endpoints
3. Báo cáo kết quả để fix lỗi real-time