import React, { useState } from 'react';
import { Card, Table, Tag, Button, Input, Select, Space, Avatar, Switch, Modal, Form, Radio, Row, Col, Typography, Badge } from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  SafetyOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './UserManagement.css';

const { Title, Text } = Typography;

const users: any[] = [];

const roleColors = { admin: 'red', editor: 'blue', viewer: 'default' };
const roleLabels = { admin: '管理员', editor: '编辑者', viewer: '查看者' };

const columns = [
  { 
    title: '用户', 
    key: 'user',
    render: (_: any, record: any) => (
      <div className="user-cell">
        <Avatar style={{ background: record.role === 'admin' ? 'linear-gradient(135deg, #00d4ff, #a855f7)' : 'linear-gradient(135deg, #10b981, #00d4ff)' }}>
          {record.avatar}
        </Avatar>
        <div className="user-info">
          <Text strong className="user-name">{record.name}</Text>
          <Text type="secondary" className="user-email">{record.email}</Text>
        </div>
      </div>
    )
  },
  { title: '手机号', dataIndex: 'phone', key: 'phone', render: (p: string) => <span><PhoneOutlined /> {p}</span> },
  { title: '部门', dataIndex: 'department', key: 'department', render: (d: string) => <Tag icon={<TeamOutlined />}>{d}</Tag> },
  { title: '角色', dataIndex: 'role', key: 'role', render: (r: string) => <Tag color={roleColors[r as keyof typeof roleColors]}>{roleLabels[r as keyof typeof roleLabels]}</Tag> },
  { title: '状态', dataIndex: 'status', key: 'status', render: (s: boolean) => <Switch checked={s} disabled /> },
  { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin' },
  { title: '操作', key: 'action', render: () => <Space><Button type="text" icon={<EditOutlined />} /><Button type="text" danger icon={<DeleteOutlined />} /></Space> },
];

const UserManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleRoleClick = (user: any) => {
    setSelectedUser(user);
    setRoleModal(true);
  };

  return (
    <div className="user-management">
      <div className="um-header">
        <div>
          <Title level={4} className="page-title">用户管理</Title>
          <Text type="secondary">管理系统用户、角色权限和访问控制</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="add-btn" onClick={() => setModalVisible(true)}>
          添加用户
        </Button>
      </div>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(0,212,255,0.15)' }}>
              <UserOutlined style={{ color: '#00d4ff', fontSize: 24 }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">0</div>
              <div className="stat-label">总用户数</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(168,85,247,0.15)' }}>
              <SafetyOutlined style={{ color: '#a855f7', fontSize: 24 }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">0</div>
              <div className="stat-label">管理员</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(16,185,129,0.15)' }}>
              <TeamOutlined style={{ color: '#10b981', fontSize: 24 }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">0</div>
              <div className="stat-label">活跃用户</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(245,158,11,0.15)' }}>
              <SettingOutlined style={{ color: '#f59e0b', fontSize: 24 }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">0</div>
              <div className="stat-label">角色类型</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(168,85,247,0.15)' }}>
              <SafetyOutlined style={{ color: '#a855f7', fontSize: 24 }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">12</div>
              <div className="stat-label">管理员</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(16,185,129,0.15)' }}>
              <TeamOutlined style={{ color: '#10b981', fontSize: 24 }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">85</div>
              <div className="stat-label">活跃用户</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(245,158,11,0.15)' }}>
              <SettingOutlined style={{ color: '#f59e0b', fontSize: 24 }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">3</div>
              <div className="stat-label">角色类型</div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card className="users-card">
        <div className="toolbar">
          <Input prefix={<SearchOutlined />} placeholder="搜索用户..." className="search-input" />
          <Select defaultValue="all" options={[{ value: 'all', label: '全部角色' }, { value: 'admin', label: '管理员' }, { value: 'editor', label: '编辑者' }, { value: 'viewer', label: '查看者' }]} className="role-filter" />
          <Select defaultValue="all" options={[{ value: 'all', label: '全部部门' }, { value: 'product', label: '产品部' }, { value: 'tech', label: '技术部' }, { value: 'operation', label: '运营部' }]} className="dept-filter" />
        </div>
        <Table dataSource={users} columns={columns} pagination={{ pageSize: 5 }} className="users-table" />
      </Card>

      <Modal title={<span><UserOutlined /> 添加用户</span>} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} className="user-modal">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="姓名">
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="手机号">
                <Input placeholder="请输入手机号" prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="邮箱">
            <Input placeholder="请输入邮箱" prefix={<MailOutlined />} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="部门">
                <Select placeholder="选择部门" options={[{ value: 'product', label: '产品部' }, { value: 'tech', label: '技术部' }, { value: 'operation', label: '运营部' }, { value: 'sales', label: '销售部' }]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="角色">
                <Select placeholder="选择角色" options={[{ value: 'admin', label: '管理员' }, { value: 'editor', label: '编辑者' }, { value: 'viewer', label: '查看者' }]} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" block>添加用户</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title={<span><SafetyOutlined /> 角色权限设置</span>} open={roleModal} onCancel={() => setRoleModal(false)} footer={null} className="role-modal">
        <div className="role-user-info">
          <Avatar style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }}>{selectedUser?.avatar}</Avatar>
          <span className="role-user-name">{selectedUser?.name}</span>
          <Tag color={roleColors[selectedUser?.role as keyof typeof roleColors]}>{roleLabels[selectedUser?.role as keyof typeof roleLabels]}</Tag>
        </div>
        <Form layout="vertical">
          <Form.Item label="分配角色">
            <Radio.Group defaultValue={selectedUser?.role}>
              <Radio value="admin">管理员 - 完全控制</Radio>
              <Radio value="editor">编辑者 - 可编辑知识库</Radio>
              <Radio value="viewer">查看者 - 只读访问</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="权限设置">
            <div className="permissions-grid">
              <div className="permission-item"><Switch /> 文档管理</div>
              <div className="permission-item"><Switch defaultChecked /> 智能问答</div>
              <div className="permission-item"><Switch /> 数据统计</div>
              <div className="permission-item"><Switch defaultChecked /> 用户管理</div>
              <div className="permission-item"><Switch /> 系统设置</div>
              <div className="permission-item"><Switch /> API访问</div>
            </div>
          </Form.Item>
          <Button type="primary" block onClick={() => setRoleModal(false)}>保存设置</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;