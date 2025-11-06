import React, { useState } from 'react';
import { authService } from '../services/authService';

const RealSignupTest = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'GUEST'
  });
  
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateTestUser = () => {
    const timestamp = Date.now();
    setFormData({
      username: `testuser_${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'GUEST'
    });
  };

  const testRealSignup = async () => {
    setLoading(true);
    setTestResult(null);
    
    try {
      console.log('=== REAL SIGNUP TEST ===');
      console.log('Sending data:', formData);
      
      // Test with real authService
      const result = await authService.register(formData);
      
      console.log('Success result:', result);
      setTestResult({
        success: true,
        message: 'Đăng ký thành công!',
        data: result
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      setTestResult({
        success: false,
        message: 'Đăng ký thất bại',
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
    
    setLoading(false);
  };

  const testDirectSignup = async () => {
    setLoading(true);
    setTestResult(null);
    
    try {
      console.log('=== DIRECT SIGNUP TEST ===');
      console.log('Sending data:', formData);
      
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Direct success:', result);
        setTestResult({
          success: true,
          message: 'Đăng ký trực tiếp thành công!',
          data: result
        });
      } else {
        const errorText = await response.text();
        console.error('Direct error:', response.status, errorText);
        setTestResult({
          success: false,
          message: 'Đăng ký trực tiếp thất bại',
          status: response.status,
          error: errorText
        });
      }
      
    } catch (error) {
      console.error('Direct fetch error:', error);
      setTestResult({
        success: false,
        message: 'Lỗi kết nối',
        error: error.message
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-red-600">
        🔥 Real Signup Test - PostgreSQL Database
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Input */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Registration Form</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                placeholder="Enter email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                placeholder="Enter password"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  placeholder="First name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                  placeholder="Last name"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              >
                <option value="GUEST">GUEST</option>
                <option value="HOST">HOST</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <button
              onClick={generateTestUser}
              className="w-full btn btn-blue"
              disabled={loading}
            >
              🎲 Generate Test User Data
            </button>
            
            <button
              onClick={testRealSignup}
              className="w-full btn btn-red"
              disabled={loading}
            >
              {loading ? '🔄 Testing...' : '🚀 Test Real Signup (AuthService)'}
            </button>
            
            <button
              onClick={testDirectSignup}
              className="w-full btn btn-green"
              disabled={loading}
            >
              {loading ? '🔄 Testing...' : '📡 Test Direct Signup (Fetch)'}
            </button>
          </div>
        </div>
        
        {/* Test Results */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          
          {!testResult && (
            <p className="text-gray-600">No test run yet. Fill the form and click a test button.</p>
          )}
          
          {testResult && (
            <div className={`p-4 rounded border-l-4 ${
              testResult.success 
                ? 'bg-green-50 border-green-500' 
                : 'bg-red-50 border-red-500'
            }`}>
              <div className="mb-2">
                <h3 className="font-semibold">
                  {testResult.success ? '✅ SUCCESS' : '❌ FAILED'}
                </h3>
                <p className="text-sm">{testResult.message}</p>
              </div>
              
              {testResult.status && (
                <p className="text-sm"><strong>Status:</strong> {testResult.status}</p>
              )}
              
              {testResult.data && (
                <div className="mt-2">
                  <strong>Response Data:</strong>
                  <pre className="text-xs bg-white p-2 rounded mt-1 overflow-x-auto">
                    {JSON.stringify(testResult.data, null, 2)}
                  </pre>
                </div>
              )}
              
              {testResult.error && (
                <div className="mt-2">
                  <strong>Error:</strong>
                  <pre className="text-xs bg-white p-2 rounded mt-1 overflow-x-auto">
                    {typeof testResult.error === 'string' ? testResult.error : JSON.stringify(testResult.error, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealSignupTest;