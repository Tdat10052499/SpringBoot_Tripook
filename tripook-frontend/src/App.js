import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ApiTestComponent from './components/ApiTestComponent';
import RealSignupTest from './components/RealSignupTest';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to home if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes - No Layout */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            
            {/* Routes with Layout */}
            <Route 
              path="/" 
              element={
                <Layout>
                  <Home />
                </Layout>
              } 
            />
            
            {/* API Test Route */}
            <Route 
              path="/test-api" 
              element={
                <Layout>
                  <ApiTestComponent />
                </Layout>
              } 
            />
            
            {/* Real Signup Test Route */}
            <Route 
              path="/real-signup-test" 
              element={
                <Layout>
                  <RealSignupTest />
                </Layout>
              } 
            />
            
            {/* Placeholder routes - will be implemented later */}
            <Route 
              path="/accommodations" 
              element={
                <Layout>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-booking-text mb-4">
                        Danh sách khách sạn
                      </h1>
                      <p className="text-gray-600">
                        Trang này sẽ được phát triển trong phần tiếp theo
                      </p>
                    </div>
                  </div>
                </Layout>
              } 
            />
            
            <Route 
              path="/bookings" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-3xl font-bold text-booking-text mb-4">
                          Đặt phòng của tôi
                        </h1>
                        <p className="text-gray-600">
                          Trang này sẽ được phát triển trong phần tiếp theo
                        </p>
                      </div>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-3xl font-bold text-booking-text mb-4">
                          Dashboard quản lý
                        </h1>
                        <p className="text-gray-600">
                          Trang này sẽ được phát triển trong phần tiếp theo
                        </p>
                      </div>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/become-provider" 
              element={
                <Layout>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-booking-text mb-4">
                        Trở thành Provider
                      </h1>
                      <p className="text-gray-600">
                        Trang này sẽ được phát triển trong phần tiếp theo
                      </p>
                    </div>
                  </div>
                </Layout>
              } 
            />
            
            {/* 404 Route */}
            <Route 
              path="*" 
              element={
                <Layout>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-booking-text mb-4">
                        404 - Không tìm thấy trang
                      </h1>
                      <p className="text-gray-600">
                        Trang bạn tìm kiếm không tồn tại.
                      </p>
                    </div>
                  </div>
                </Layout>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
