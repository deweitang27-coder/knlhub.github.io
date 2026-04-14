import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import './MainLayout.css';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className="main-layout">
      <Sidebar />
      <Layout>
        <Header />
        <Content className="main-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;