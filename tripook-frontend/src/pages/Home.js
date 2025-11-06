import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Award, Shield, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-booking-primary to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tìm kiếm chỗ ở hoàn hảo
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Từ khách sạn sang trọng đến homestay ấm cúng - Tripook có tất cả cho chuyến đi của bạn
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-booking-text mb-4">
              Tại sao chọn Tripook?
            </h2>
            <p className="text-lg text-gray-600">
              Chúng tôi cam kết mang đến trải nghiệm đặt phòng tốt nhất cho bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-booking-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-booking-text mb-2">
                Tìm kiếm dễ dàng
              </h3>
              <p className="text-gray-600">
                Hệ thống tìm kiếm thông minh giúp bạn tìm được chỗ ở phù hợp nhất
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-primary-red rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-booking-text mb-2">
                Thanh toán an toàn
              </h3>
              <p className="text-gray-600">
                Tích hợp VNPay và Momo để thanh toán nhanh chóng và bảo mật
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-booking-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-booking-text mb-2">
                Đánh giá chất lượng
              </h3>
              <p className="text-gray-600">
                Hệ thống đánh giá từ khách hàng thật giúp bạn chọn lựa tốt nhất
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="bg-primary-red rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-booking-text mb-2">
                Hỗ trợ 24/7
              </h3>
              <p className="text-gray-600">
                Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ bạn mọi lúc mọi nơi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-booking-text mb-4">
              Điểm đến phổ biến
            </h2>
            <p className="text-lg text-gray-600">
              Khám phá những địa điểm du lịch được yêu thích nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Destination 1 */}
            <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
              <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold mb-1">Hà Nội</h3>
                <p className="text-blue-100">1,234 chỗ ở</p>
              </div>
            </div>

            {/* Destination 2 */}
            <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
              <div className="h-64 bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold mb-1">TP. Hồ Chí Minh</h3>
                <p className="text-green-100">2,567 chỗ ở</p>
              </div>
            </div>

            {/* Destination 3 */}
            <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
              <div className="h-64 bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold mb-1">Đà Nẵng</h3>
                <p className="text-purple-100">892 chỗ ở</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-booking-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Chỗ ở</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Khách hàng hài lòng</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Thành phố</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div className="text-blue-100">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-booking-text mb-4">
            Bạn có chỗ ở muốn cho thuê?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Tham gia Tripook và bắt đầu kinh doanh với hàng nghìn khách du lịch mỗi ngày
          </p>
          <Link
            to="/become-provider"
            className="inline-flex items-center space-x-2 bg-primary-red text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <Award size={24} />
            <span>Trở thành đối tác</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;