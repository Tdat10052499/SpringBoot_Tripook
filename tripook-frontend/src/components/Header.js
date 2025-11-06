import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  LogOut,
  Menu,
  X,
  Hotel,
  Home,
  Building
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

  const services = [
    { id: 'hotel', label: 'Hotel', icon: Hotel, color: 'bg-blue-600' },
    { id: 'homestay', label: 'HomeStay', icon: Home, color: 'bg-green-600' },
    { id: 'villa', label: 'Villa', color: 'bg-purple-600', icon: Building }
  ];

  // Don't show header on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="bg-booking-primary text-white">
      {/* Top Navigation */}
      <div className="border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-white text-booking-primary px-3 py-1 rounded font-bold text-xl">
                Tripook
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <span className="text-sm">VND</span>
                <div className="flex items-center space-x-1">
                  <img 
                    src="https://flagcdn.com/16x12/vn.png" 
                    alt="Vietnam"
                    className="w-4 h-3"
                  />
                </div>
                <button className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm">
                  Đăng ký chỗ nghỉ của bạn
                </button>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <User size={20} />
                      <span className="text-sm">{user?.username}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1 hover:text-blue-200"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link 
                      to="/register" 
                      className="text-sm hover:text-blue-200"
                    >
                      Đăng ký
                    </Link>
                    <Link 
                      to="/login" 
                      className="bg-white text-booking-primary px-4 py-2 rounded hover:bg-gray-100 text-sm font-medium"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Tabs */}
      <div className="bg-booking-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-colors ${
                    activeTab === service.id
                      ? 'bg-white text-booking-primary'
                      : 'text-white hover:bg-blue-700'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{service.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>



      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-white">
                  Xin chào, {user?.username}
                </div>
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 text-white hover:bg-blue-600 w-full text-left"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-white hover:bg-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng ký
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-white hover:bg-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              </>
            )}
            <button className="block px-3 py-2 text-white hover:bg-blue-600 w-full text-left">
              Đăng ký chỗ nghỉ của bạn
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;