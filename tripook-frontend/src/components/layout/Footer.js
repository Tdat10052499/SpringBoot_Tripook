import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-booking-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white text-booking-primary px-3 py-2 rounded-lg font-bold text-xl">
                Tripook
              </div>
            </div>
            <p className="text-blue-100 mb-4">
              Nền tảng đặt phòng khách sạn và homestay hàng đầu Việt Nam. 
              Tìm kiếm và đặt chỗ ở lý tưởng cho chuyến du lịch của bạn.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/accommodations" className="text-blue-100 hover:text-white transition-colors">
                  Danh sách khách sạn
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-blue-100 hover:text-white transition-colors">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-100 hover:text-white transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-blue-100 hover:text-white transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/become-provider" className="text-blue-100 hover:text-white transition-colors">
                  Trở thành đối tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} />
                <span className="text-blue-100">
                  123 Đường ABC, Quận 1, TP.HCM
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} />
                <span className="text-blue-100">
                  +84 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <span className="text-blue-100">
                  support@tripook.com
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Đăng ký nhận tin</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
                <button className="bg-primary-red px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm">
            © 2024 Tripook. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-blue-100 hover:text-white text-sm transition-colors">
              Điều khoản
            </Link>
            <Link to="/privacy" className="text-blue-100 hover:text-white text-sm transition-colors">
              Bảo mật
            </Link>
            <Link to="/sitemap" className="text-blue-100 hover:text-white text-sm transition-colors">
              Sơ đồ trang
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;