import React from 'react';
import { Layout, Input, Badge, Avatar, Dropdown, Space, message } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  DatabaseOutlined,
  CreditCardOutlined,
  TeamOutlined,
  ApartmentOutlined,
  GlobalOutlined,
  OrderedListOutlined,
  DownloadOutlined,
  SafetyOutlined,
  FormOutlined,
  FileTextOutlined,
  MessageOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 清除登录状态
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    message.success('已退出登录');
    // 跳转到登录页面
    navigate('/login');
  };

  const handleMenuClick = (key: string) => {
    if (key === 'system') {
      navigate('/system');
    }
  };

  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: '个人资料' },
    { key: 'system', icon: <SettingOutlined />, label: '系统管理', onClick: () => handleMenuClick('system') },
    { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true, onClick: handleLogout },
  ];

  return (
    <AntHeader className="header">
      <div className="header-left">
        <Input
          prefix={<SearchOutlined />}
          placeholder="搜索知识库、文档、问答..."
          className="search-input"
        />
      </div>
      <div className="header-right">
        <Badge count={5} className="notification-badge">
          <BellOutlined className="header-icon" />
        </Badge>
        <SettingOutlined className="header-icon" />
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space className="user-info">
            <Avatar size={36} icon={<UserOutlined />} className="user-avatar" />
            <span className="user-name">管理员</span>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;