import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Menu,
  X
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('hotel');
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mainServices = [
    { id: 'hotel', label: 'Hotel' },
    { id: 'homestay', label: 'Homestay' },
    { id: 'villa', label: 'Villa' }
  ];

  // Don't show header on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-booking-primary">
                Tripook
              </div>
            </Link>

            {/* Top Right Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-3 text-base">
                <img 
                  src="https://flagcdn.com/16x12/vn.png" 
                  alt="Vietnam"
                  className="w-5 h-4"
                />
                <span className="text-gray-600">VND | VI</span>
              </div>
              
              <div className="flex items-center space-x-3 text-base">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-sm text-white font-medium">%</span>
                </div>
                <span className="text-gray-600">Khuyến mãi</span>
              </div>
              
              <button className="text-base text-gray-600 hover:text-gray-800 py-2">
                Hỗ trợ
              </button>
              
              <button className="text-base text-gray-600 hover:text-gray-800 py-2">
                Hợp tác với chúng tôi
              </button>
              
              <button className="text-base text-gray-600 hover:text-gray-800 py-2">
                Đặt chỗ của tôi
              </button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <User size={20} className="text-gray-600" />
                    <span className="text-base text-gray-700 font-medium">{user?.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-base text-center text-gray-600 hover:text-red-600 transition-colors py-2 px-6 min-w-24 w-24 font-medium"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login" 
                    className="text-base text-center text-gray-700 hover:text-booking-primary transition-colors border border-gray-300 px-6 py-2 rounded-md font-medium min-w-24 w-24"
                  >
                    Đăng Nhập
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-base text-center bg-booking-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium min-w-24 w-24"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="hidden md:flex items-center space-x-10 h-16">
          {mainServices.map((service) => {
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`nav-button nav-item relative py-5 px-8 min-w-32 text-center text-lg font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === service.id
                    ? 'text-booking-primary'
                    : 'text-gray-700 hover:text-booking-primary'
                }`}
              >
                {service.label}
                {/* Hover underline effect - only show when not active */}
                {activeTab !== service.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-booking-primary rounded-t-md scale-x-0 hover-underline"></div>
                )}
                {/* Active indicator */}
                {activeTab === service.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-booking-primary rounded-t-md"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>





      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-6 space-y-6">
            {/* Navigation Links */}
            <div className="space-y-4">
              {mainServices.map((service) => {
                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      setActiveTab(service.id);
                      setIsMenuOpen(false);
                    }}
                    className={`nav-button block w-full text-left py-3 text-lg font-medium transition-colors ${
                      activeTab === service.id
                        ? 'text-booking-primary'
                        : 'text-gray-700 hover:text-booking-primary'
                    }`}
                  >
                    {service.label}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Auth Actions */}
            <div className="space-y-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 py-2">
                    <div className="w-10 h-10 bg-booking-primary rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user?.username}</div>
                      <div className="text-sm text-gray-500">Thành viên</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left py-3 text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="block w-full py-3 text-gray-700 hover:text-booking-primary font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng ký
                  </Link>
                  <Link
                    to="/login"
                    className="block w-full bg-booking-primary text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium text-center transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;