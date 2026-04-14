import React, { useState } from 'react';
import { Card, Row, Col, Table, Tag, Button, Input, Select, Space, Upload, Modal, Form, Tabs, Progress, Typography, Tooltip } from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  SearchOutlined,
  FolderOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  TagOutlined,
  CalendarOutlined,
  DownloadOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import './KnowledgeBase.css';

const { Text, Title } = Typography;
const { Search } = Input;

const categoryOptions = [
  { value: 'all', label: '全部分类' },
  { value: 'product', label: '产品文档' },
  { value: 'tech', label: '技术文档' },
  { value: 'faq', label: 'FAQ' },
  { value: 'manual', label: '使用手册' },
];

const documents: any[] = [];

const categoryColors: Record<string, string> = {
  product: 'cyan',
  tech: 'purple',
  faq: 'green',
  manual: 'orange',
};

const columns = [
  { 
    title: '文档名称', 
    dataIndex: 'title', 
    key: 'title',
    render: (text: string, record: any) => (
      <div className="doc-title-cell">
        <FileTextOutlined className="doc-icon" style={{ color: record.category === 'product' ? '#00d4ff' : record.category === 'tech' ? '#a855f7' : '#10b981' }} />
        <div>
          <Text strong className="doc-title">{text}</Text>
          <Text type="secondary" className="doc-format">{record.format} • {record.size}</Text>
        </div>
      </div>
    )
  },
  { title: '分类', dataIndex: 'category', key: 'category', render: (cat: string) => <Tag color={categoryColors[cat]}>{cat === 'product' ? '产品文档' : cat === 'tech' ? '技术文档' : cat === 'faq' ? 'FAQ' : '使用手册'}</Tag> },
  { title: '作者', dataIndex: 'author', key: 'author' },
  { title: '更新时间', dataIndex: 'date', key: 'date', render: (d: string) => <span><CalendarOutlined /> {d}</span> },
  { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === 'published' ? 'success' : s === 'draft' ? 'default' : 'warning'}>{s === 'published' ? '已发布' : s === 'draft' ? '草稿' : '审核中'}</Tag> },
  { title: '统计', key: 'stats', render: (_: any, r: any) => <Space size="small"><Tooltip title="浏览"><EyeOutlined /> {r.views}</Tooltip><Tooltip title="收藏"><span style={{color:'#f59e0b'}}>★ {r.stars}</span></Tooltip></Space> },
  { title: '操作', key: 'action', render: () => <Space><Button type="text" icon={<EyeOutlined />} /><Button type="text" icon={<EditOutlined />} /><Button type="text" danger icon={<DeleteOutlined />} /></Space> },
];

const KnowledgeBase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [uploadModal, setUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <div className="knowledge-base">
      <div className="kb-header">
        <div>
          <Title level={4} className="page-title">知识库管理</Title>
          <Text type="secondary">管理企业知识文档，支持多格式上传和智能分类</Text>
        </div>
        <Button type="primary" icon={<UploadOutlined />} className="upload-btn" onClick={() => setUploadModal(true)}>
          上传文档
        </Button>
      </div>

      <Card className="kb-stats-card">
        <Row gutter={24}>
          <Col span={6}>
            <div className="kb-stat-item">
              <div className="kb-stat-icon" style={{ background: 'rgba(0,212,255,0.15)', color: '#00d4ff' }}>
                <FolderOutlined />
              </div>
              <div className="kb-stat-info">
                <div className="kb-stat-value">0</div>
                <div className="kb-stat-label">文档总数</div>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="kb-stat-item">
              <div className="kb-stat-icon" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>
                <FileTextOutlined />
              </div>
              <div className="kb-stat-info">
                <div className="kb-stat-value">0</div>
                <div className="kb-stat-label">文档分类</div>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="kb-stat-item">
              <div className="kb-stat-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                <CloudUploadOutlined />
              </div>
              <div className="kb-stat-info">
                <div className="kb-stat-value">0 GB</div>
                <div className="kb-stat-label">存储空间</div>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="kb-stat-item">
              <div className="kb-stat-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
                <TagOutlined />
              </div>
              <div className="kb-stat-info">
                <div className="kb-stat-value">0</div>
                <div className="kb-stat-label">标签数量</div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="kb-content-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={[
          { key: 'all', label: '全部文档' },
          { key: 'product', label: '产品文档' },
          { key: 'tech', label: '技术文档' },
          { key: 'faq', label: 'FAQ' },
        ]} />
        
        <div className="kb-toolbar">
          <Search placeholder="搜索文档..." prefix={<SearchOutlined />} className="kb-search" />
          <Select defaultValue="all" options={categoryOptions} className="kb-filter" />
          <Select defaultValue="latest" options={[{ value: 'latest', label: '最近更新' }, { value: 'views', label: '最多浏览' }, { value: 'stars', label: '最多收藏' }]} className="kb-sort" />
        </div>

        <Table dataSource={documents} columns={columns} pagination={{ pageSize: 5 }} className="kb-table" />
      </Card>

      <Modal title={<span><CloudUploadOutlined /> 上传文档</span>} open={uploadModal} onCancel={() => setUploadModal(false)} footer={null} className="upload-modal">
        <Form layout="vertical">
          <Form.Item label="文档名称">
            <Input placeholder="请输入文档名称" />
          </Form.Item>
          <Form.Item label="选择分类">
            <Select placeholder="选择文档分类" options={[{ value: 'product', label: '产品文档' }, { value: 'tech', label: '技术文档' }, { value: 'faq', label: 'FAQ' }, { value: 'manual', label: '使用手册' }]} />
          </Form.Item>
          <Form.Item label="上传文件">
            <Upload.Dragger>
              <p className="ant-upload-drag-icon"><CloudUploadOutlined style={{ fontSize: 48, color: '#00d4ff' }} /></p>
              <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
              <p className="ant-upload-hint">支持 PDF、Word、Excel、Markdown 等格式</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item label="标签">
            <Select mode="tags" placeholder="添加标签" />
          </Form.Item>
          <Button type="primary" block loading={uploading} onClick={handleUpload}>
            {uploading ? '上传中...' : '开始上传'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default KnowledgeBase;