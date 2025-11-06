import React, { useState } from 'react';
import { authService } from '../services/authService';

const ApiTestComponent = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, result, success) => {
    setTestResults(prev => [...prev, { test, result, success, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testPublicEndpoint = async () => {
    setLoading(true);
    try {
      const result = await authService.testPublic();
      addResult('Public Endpoint Test', JSON.stringify(result, null, 2), true);
    } catch (error) {
      addResult('Public Endpoint Test', `ERROR: ${error.message}\nStatus: ${error.response?.status}\nData: ${JSON.stringify(error.response?.data, null, 2)}`, false);
    }
    setLoading(false);
  };

  const testRegisterEndpoint = async () => {
    setLoading(true);
    try {
      const testUser = {
        username: `testuser_${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'GUEST' // Default role for new users
      };
      
      console.log('Sending user data:', testUser);
      
      // Try direct fetch first for debugging
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUser)
      });
      
      if (response.ok) {
        const result = await response.json();
        addResult('Register Test (Direct)', JSON.stringify(result, null, 2), true);
      } else {
        const errorText = await response.text();
        addResult('Register Test (Direct)', `HTTP ${response.status}: ${errorText}`, false);
      }
    } catch (error) {
      addResult('Register Test (Direct)', `ERROR: ${error.message}`, false);
    }
    setLoading(false);
  };

  const testRegisterViaService = async () => {
    setLoading(true);
    try {
      const testUser = {
        username: `testuser_service_${Date.now()}`,
        email: `testservice${Date.now()}@example.com`,
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'GUEST'
      };
      
      const result = await authService.register(testUser);
      addResult('Register Test (Service)', JSON.stringify(result, null, 2), true);
    } catch (error) {
      addResult('Register Test (Service)', `ERROR: ${error.message}\nStatus: ${error.response?.status}\nData: ${JSON.stringify(error.response?.data, null, 2)}`, false);
    }
    setLoading(false);
  };

  const testDirectAPI = async () => {
    setLoading(true);
    try {
      // Test direct API call
      const response = await fetch('http://localhost:8080/public/test');
      if (response.ok) {
        const data = await response.json();
        addResult('Direct API Test', JSON.stringify(data, null, 2), true);
      } else {
        const errorData = await response.text();
        addResult('Direct API Test', `HTTP ${response.status}: ${errorData}`, false);
      }
    } catch (error) {
      addResult('Direct API Test', `Network Error: ${error.message}`, false);
    }
    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-red-600">API Test Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button 
          onClick={testPublicEndpoint}
          disabled={loading}
          className="btn btn-blue"
        >
          Test Public Endpoint
        </button>
        
        <button 
          onClick={testRegisterEndpoint}
          disabled={loading}
          className="btn btn-red"
        >
          Test Register (Direct)
        </button>
        
        <button 
          onClick={testRegisterViaService}
          disabled={loading}
          className="btn btn-yellow"
        >
          Test Register (Service)
        </button>
        
        <button 
          onClick={testDirectAPI}
          disabled={loading}
          className="btn btn-green"
        >
          Test Direct API
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={clearResults}
          className="btn-secondary"
        >
          Clear Results
        </button>
        
        {loading && <div className="text-blue-600">Testing...</div>}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
        
        {testResults.length === 0 ? (
          <p className="text-gray-600">No tests run yet. Click a button above to start testing.</p>
        ) : (
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div 
                key={index} 
                className={`p-4 rounded border-l-4 ${
                  result.success 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{result.test}</h3>
                  <span className="text-sm text-gray-500">{result.timestamp}</span>
                </div>
                <pre className="text-sm bg-white p-2 rounded overflow-x-auto">
                  {result.result}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTestComponent;