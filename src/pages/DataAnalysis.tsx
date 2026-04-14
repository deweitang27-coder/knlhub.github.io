import React from 'react';
import { Card, Row, Col, Select, DatePicker, Table, Tag, Typography } from 'antd';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import './DataAnalysis.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const trendData: any[] = [];

const sourceData: any[] = [];

const categoryData: any[] = [];

const topQueries: any[] = [];

const columns = [
  { title: '搜索关键词', dataIndex: 'query', key: 'query', render: (t: string) => <Text strong style={{ color: '#fff' }}>{t}</Text> },
  { title: '搜索次数', dataIndex: 'count', key: 'count', render: (c: number) => <span style={{ color: '#00d4ff' }}>{c.toLocaleString()}</span> },
  { title: '所属分类', dataIndex: 'category', key: 'category', render: (cat: string) => <Tag color={cat === '技术问题' ? 'purple' : cat === '产品问题' ? 'cyan' : 'green'}>{cat}</Tag> },
];

const DataAnalysis: React.FC = () => {
  return (
    <div className="data-analysis">
      <div className="da-header">
        <div>
          <Title level={4} className="page-title">数据分析</Title>
          <Text type="secondary">全面的知识库运营数据分析和可视化</Text>
        </div>
        <div className="da-filters">
          <RangePicker className="date-picker" />
          <Select defaultValue="all" options={[{ value: 'all', label: '全部数据' }, { value: '7d', label: '近7天' }, { value: '30d', label: '近30天' }]} style={{ width: 120 }} />
        </div>
      </div>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-header">
              <EyeOutlined className="stat-icon" style={{ color: '#00d4ff' }} />
              <span className="stat-trend up"><ArrowUpOutlined /> 12.5%</span>
            </div>
            <div className="stat-value">0</div>
            <div className="stat-label">总访问量</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-header">
              <MessageOutlined className="stat-icon" style={{ color: '#a855f7' }} />
              <span className="stat-trend up"><ArrowUpOutlined /> 0%</span>
            </div>
            <div className="stat-value">0</div>
            <div className="stat-label">问答总数</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-header">
              <ClockCircleOutlined className="stat-icon" style={{ color: '#10b981' }} />
              <span className="stat-trend down"><ArrowDownOutlined /> 0%</span>
            </div>
            <div className="stat-value">0s</div>
            <div className="stat-label">平均响应时间</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <div className="stat-header">
              <CheckCircleOutlined className="stat-icon" style={{ color: '#f59e0b' }} />
              <span className="stat-trend up"><ArrowUpOutlined /> 0%</span>
            </div>
            <div className="stat-value">0%</div>
            <div className="stat-label">问题解决率</div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={16}>
          <Card className="chart-card" title="访问趋势分析">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={trendData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ background: '#1a2235', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 8 }} labelStyle={{ color: '#fff' }} />
                <Legend />
                <Line type="monotone" name="访问量" dataKey="visits" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff' }} />
                <Line type="monotone" name="提问数" dataKey="questions" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
                <Line type="monotone" name="已回答" dataKey="answered" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="chart-card" title="访问来源分布">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {sourceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1a2235', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {sourceData.map((item, index) => (
                <div key={index} className="legend-item">
                  <span className="legend-dot" style={{ background: item.color }}></span>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={12}>
          <Card className="chart-card" title="问题分类统计">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                <YAxis dataKey="category" type="category" stroke="rgba(255,255,255,0.5)" width={80} />
                <Tooltip contentStyle={{ background: '#1a2235', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 8 }} />
                <Bar dataKey="count" fill="#00d4ff" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="chart-card" title="热门搜索词">
            <Table dataSource={topQueries} columns={columns} pagination={false} size="small" className="top-queries-table" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataAnalysis;