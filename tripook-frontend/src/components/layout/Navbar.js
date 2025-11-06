import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  LogOut, 
  Home, 
  Building, 
  Calendar,
  Settings,
  UserPlus
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isProvider = user?.roles?.includes('provider');
  const isUser = user?.roles?.includes('user');

  return (
    <nav className="bg-white shadow-lg border-b border-booking-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-booking-primary text-white px-3 py-2 rounded-lg font-bold text-xl">
              Tripook
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-booking-text hover:text-booking-primary transition-colors"
            >
              <Home size={18} />
              <span>Trang chủ</span>
            </Link>
            
            <Link 
              to="/accommodations" 
              className="flex items-center space-x-1 text-booking-text hover:text-booking-primary transition-colors"
            >
              <Building size={18} />
              <span>Khách sạn</span>
            </Link>

            <Link 
              to="/test-api" 
              className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
            >
              <Settings size={18} />
              <span>Test API</span>
            </Link>

            <Link 
              to="/real-signup-test" 
              className="flex items-center space-x-1 text-green-600 hover:text-green-800 transition-colors"
            >
              <UserPlus size={18} />
              <span>Real Signup Test</span>
            </Link>

            {isAuthenticated && isUser && (
              <Link 
                to="/bookings" 
                className="flex items-center space-x-1 text-booking-text hover:text-booking-primary transition-colors"
              >
                <Calendar size={18} />
                <span>Đặt phòng của tôi</span>
              </Link>
            )}

            {isAuthenticated && isProvider && (
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-1 text-booking-text hover:text-booking-primary transition-colors"
              >
                <Settings size={18} />
                <span>Quản lý</span>
              </Link>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Become Provider Button - Only show for regular users */}
                {isUser && !isProvider && (
                  <Link
                    to="/become-provider"
                    className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-1"
                  >
                    <UserPlus size={16} />
                    <span>Trở thành Provider</span>
                  </Link>
                )}

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-booking-text hover:text-booking-primary transition-colors">
                    <User size={18} />
                    <span className="hidden md:block">{user?.username}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-booking-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-booking-text hover:bg-booking-accent"
                      >
                        Thông tin cá nhân
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-booking-text hover:bg-booking-accent"
                      >
                        <LogOut size={14} />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-booking-primary border border-booking-primary px-4 py-2 rounded-md hover:bg-booking-primary hover:text-white transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-booking-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-booking-border">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="flex items-center space-x-2 px-3 py-2 text-booking-text hover:text-booking-primary"
          >
            <Home size={18} />
            <span>Trang chủ</span>
          </Link>
          <Link 
            to="/accommodations" 
            className="flex items-center space-x-2 px-3 py-2 text-booking-text hover:text-booking-primary"
          >
            <Building size={18} />
            <span>Khách sạn</span>
          </Link>
          {isAuthenticated && isUser && (
            <Link 
              to="/bookings" 
              className="flex items-center space-x-2 px-3 py-2 text-booking-text hover:text-booking-primary"
            >
              <Calendar size={18} />
              <span>Đặt phòng của tôi</span>
            </Link>
          )}
          {isAuthenticated && isProvider && (
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 px-3 py-2 text-booking-text hover:text-booking-primary"
            >
              <Settings size={18} />
              <span>Quản lý</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;