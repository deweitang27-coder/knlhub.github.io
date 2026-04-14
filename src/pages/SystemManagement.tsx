import React from 'react';
import {
  UserOutlined,
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
import './SystemManagement.css';

const SystemManagement: React.FC = () => {
  const managementItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      title: '个人资料',
      description: '管理个人信息和账户设置'
    },
    {
      key: 'model',
      icon: <DatabaseOutlined />,
      title: '模型管理',
      description: '管理AI模型和配置'
    },
    {
      key: 'token',
      icon: <CreditCardOutlined />,
      title: 'Token使用',
      description: '管理API token和使用情况'
    },
    {
      key: 'team',
      icon: <TeamOutlined />,
      title: '团队管理',
      description: '管理团队成员和权限'
    },
    {
      key: 'account',
      icon: <UserOutlined />,
      title: '账号设置',
      description: '管理账号安全和设置'
    },
    {
      key: 'enterprise',
      icon: <ApartmentOutlined />,
      title: '企业设置',
      description: '管理企业信息和配置'
    },
    {
      key: 'domain',
      icon: <GlobalOutlined />,
      title: '自定义域名',
      description: '设置和管理自定义域名'
    },
    {
      key: 'version',
      icon: <OrderedListOutlined />,
      title: '版本信息',
      description: '查看系统版本和更新记录'
    },
    {
      key: 'client',
      icon: <DownloadOutlined />,
      title: '客户端下载',
      description: '下载客户端应用程序'
    },
    {
      key: 'sensitive',
      icon: <SafetyOutlined />,
      title: '敏感词管理',
      description: '管理敏感词和过滤规则'
    },
    {
      key: 'prompt',
      icon: <FormOutlined />,
      title: '提示词模板库',
      description: '管理提示词模板和预设'
    },
    {
      key: 'log',
      icon: <FileTextOutlined />,
      title: '日志信息',
      description: '查看系统日志和操作记录'
    },
    {
      key: 'wechat',
      icon: <MessageOutlined />,
      title: '公众号管理',
      description: '管理微信公众号集成'
    },
    {
      key: 'chatclaw',
      icon: <LinkOutlined />,
      title: '绑定ChatClaw',
      description: '绑定和管理ChatClaw账号'
    }
  ];

  const handleItemClick = (key: string) => {
    // 这里可以添加导航逻辑
    console.log('点击了:', key);
  };

  return (
    <div className="system-management">
      <div className="system-management-header">
        <h1>系统管理</h1>
      </div>
      <div className="system-management-grid">
        {managementItems.map((item) => (
          <div
            key={item.key}
            className="system-management-card"
            onClick={() => handleItemClick(item.key)}
          >
            <div className="card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemManagement;