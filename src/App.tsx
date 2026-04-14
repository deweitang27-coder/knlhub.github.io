import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import QASystem from './pages/QASystem';
import DataAnalysis from './pages/DataAnalysis';
import UserManagement from './pages/UserManagement';
import SystemManagement from './pages/SystemManagement';
import './App.css';

// 路由保护组件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#00d4ff',
    colorBgBase: '#0a0e17',
    colorBgContainer: '#111827',
    colorBgElevated: '#1a2235',
    borderRadius: 12,
  },
  components: {
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: 'rgba(0, 212, 255, 0.15)',
      darkItemHoverBg: 'rgba(0, 212, 255, 0.1)',
    },
    Card: {
      colorBgContainer: '#111827',
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="knowledge" element={<KnowledgeBase />} />
            <Route path="qa" element={<QASystem />} />
            <Route path="analysis" element={<DataAnalysis />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="system" element={<SystemManagement />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;