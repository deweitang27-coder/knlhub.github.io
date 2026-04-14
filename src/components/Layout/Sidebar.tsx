import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  MessageOutlined,
  BarChartOutlined,
  TeamOutlined,
  RobotOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: '控制台' },
  { key: '/knowledge', icon: <BookOutlined />, label: '知识库' },
  { key: '/qa', icon: <RobotOutlined />, label: '智能问答' },
  { key: '/analysis', icon: <BarChartOutlined />, label: '数据分析' },
  { key: '/users', icon: <TeamOutlined />, label: '用户管理' },
  { key: '/system', icon: <SettingOutlined />, label: '系统管理' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sider 
      width={240} 
      className="sidebar"
      theme="dark"
    >
      <div className="logo">
        <MessageOutlined className="logo-icon" />
        <span className="logo-text">AI Knowledge</span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="sidebar-menu"
      />
      <div className="sidebar-glow"></div>
    </Sider>
  );
};

export default Sidebar;