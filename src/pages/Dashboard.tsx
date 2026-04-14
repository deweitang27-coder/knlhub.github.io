import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tag, Space, Typography } from 'antd';
import {
  BookOutlined,
  MessageOutlined,
  UserOutlined,
  RiseOutlined,
  EyeOutlined,
  StarOutlined,
  CloudOutlined,
  RobotOutlined,
} from '@ant-design/icons';
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
} from 'recharts';
import './Dashboard.css';

const { Text } = Typography;

const visitData: any[] = [];

const categoryData: any[] = [];

const hotDocuments: any[] = [];

const columns = [
  { title: '文档标题', dataIndex: 'title', key: 'title', render: (text: string) => <Text strong style={{ color: '#fff' }}>{text}</Text> },
  { title: '分类', dataIndex: 'category', key: 'category', render: (cat: string) => <Tag color={cat === '产品文档' ? 'cyan' : cat === '技术文档' ? 'purple' : 'green'}>{cat}</Tag> },
  { title: '浏览量', dataIndex: 'views', key: 'views', render: (v: number) => <span style={{ color: '#00d4ff' }}>{v.toLocaleString()}</span> },
  { title: '收藏', dataIndex: 'stars', key: 'stars', render: (s: number) => <span style={{ color: '#f59e0b' }}>★ {s}</span> },
  { title: '更新时间', dataIndex: 'date', key: 'date' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">控制台</h1>
        <p className="page-subtitle">欢迎回来，AI知识库运行正常</p>
      </div>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card stat-card-1">
            <div className="stat-icon">
              <BookOutlined />
            </div>
            <Statistic
              title="知识库文档"
              value={0}
              valueStyle={{ color: '#00d4ff' }}
              suffix={<span className="stat-trend"><RiseOutlined /> 0%</span>}
            />
            <Progress percent={0} showInfo={false} strokeColor="#00d4ff" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card stat-card-2">
            <div className="stat-icon">
              <MessageOutlined />
            </div>
            <Statistic
              title="智能问答次数"
              value={0}
              valueStyle={{ color: '#a855f7' }}
              suffix={<span className="stat-trend"><RiseOutlined /> 0%</span>}
            />
            <Progress percent={0} showInfo={false} strokeColor="#a855f7" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card stat-card-3">
            <div className="stat-icon">
              <UserOutlined />
            </div>
            <Statistic
              title="活跃用户"
              value={0}
              valueStyle={{ color: '#10b981' }}
              suffix={<span className="stat-trend"><RiseOutlined /> 0%</span>}
            />
            <Progress percent={0} showInfo={false} strokeColor="#10b981" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card stat-card-4">
            <div className="stat-icon">
              <CloudOutlined />
            </div>
            <Statistic
              title="API调用量"
              value={0}
              valueStyle={{ color: '#f59e0b' }}
              suffix={<span className="stat-trend"><RiseOutlined /> 0%</span>}
            />
            <Progress percent={0} showInfo={false} strokeColor="#f59e0b" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={16}>
          <Card className="chart-card" title="访问趋势">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={visitData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorQuestions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ background: '#1a2235', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 8 }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="visits" stroke="#00d4ff" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                <Area type="monotone" dataKey="questions" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorQuestions)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="chart-card" title="文档分类占比">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1a2235', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {categoryData.map((item, index) => (
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
          <Card className="chart-card" title="AI模型使用分布">
            <div className="model-stats">
              <div className="model-item">
                <div className="model-icon"><RobotOutlined /></div>
                <div className="model-info">
                  <div className="model-name">GPT-4</div>
                  <div className="model-desc">主模型 - 智能问答</div>
                </div>
                <div className="model-bar">
                  <Progress percent={65} strokeColor="#00d4ff" />
                </div>
              </div>
              <div className="model-item">
                <div className="model-icon"><RobotOutlined /></div>
                <div className="model-info">
                  <div className="model-name">Claude-3</div>
                  <div className="model-desc">辅助模型 - 长文本</div>
                </div>
                <div className="model-bar">
                  <Progress percent={25} strokeColor="#a855f7" />
                </div>
              </div>
              <div className="model-item">
                <div className="model-icon"><RobotOutlined /></div>
                <div className="model-info">
                  <div className="model-name">Embedding</div>
                  <div className="model-desc">向量化 - 语义搜索</div>
                </div>
                <div className="model-bar">
                  <Progress percent={10} strokeColor="#10b981" />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="chart-card" title="热门文档">
            <Table
              dataSource={hotDocuments}
              columns={columns}
              pagination={false}
              size="small"
              className="hot-docs-table"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;