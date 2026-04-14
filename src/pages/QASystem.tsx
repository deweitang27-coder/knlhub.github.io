import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, List, Avatar, Tag, Space, Typography, Badge, Tooltip, Segmented } from 'antd';
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  PaperClipOutlined,
  StarOutlined,
  CopyOutlined,
  LikeOutlined,
  DislikeOutlined,
  HistoryOutlined,
  SettingOutlined,
  ApiOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import './QASystem.css';

const { Text, Title } = Typography;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; content: string; score: number }[];
  timestamp: Date;
  liked?: boolean;
}

const QASystem: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<string>('smart');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '根据知识库检索结果，关于您的问题回答如下：\n\n1. 产品功能介绍：我们的AI知识库支持文档管理、智能问答、数据分析等功能。\n\n2. 使用场景：适用于企业内部知识管理、客服支持、培训辅助等场景。\n\n3. 优势特点：基于大语言模型，提供精准的语义理解和智能回答。',
        sources: [
          { title: '产品功能使用指南 v3.0', content: '产品功能介绍...', score: 0.95 },
          { title: '常见问题解答汇总', content: '使用场景...', score: 0.88 },
          { title: '技术文档 v2.1', content: '优势特点...', score: 0.82 },
        ],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1500);
  };

  const handleFeedback = (id: string, liked: boolean) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, liked } : m));
  };

  return (
    <div className="qa-system">
      <div className="qa-header">
        <div>
          <Title level={4} className="page-title">智能问答</Title>
          <Text type="secondary">基于AI大模型的智能对话系统，理解语义，精准回答</Text>
        </div>
        <Space>
          <Segmented 
            options={[
              { value: 'smart', label: <span><BulbOutlined /> 智能模式</span> },
              { value: 'search', label: <span><ApiOutlined /> 检索模式</span> },
              { value: 'chat', label: <span><RobotOutlined /> 闲聊模式</span> },
            ]} 
            value={mode}
            onChange={(v) => setMode(v as string)}
            className="mode-selector"
          />
        </Space>
      </div>

      <div className="qa-container">
        <Card className="qa-stats-card">
          <div className="qa-stats-header">
            <HistoryOutlined /> 今日问答统计
          </div>
          <div className="qa-stats-grid">
            <div className="qa-stat">
              <div className="qa-stat-value">0</div>
              <div className="qa-stat-label">问答次数</div>
            </div>
            <div className="qa-stat">
              <div className="qa-stat-value">0%</div>
              <div className="qa-stat-label">满意度</div>
            </div>
            <div className="qa-stat">
              <div className="qa-stat-value">0s</div>
              <div className="qa-stat-label">平均响应</div>
            </div>
          </div>
        </Card>

        <Card className="chat-card">
          <div className="chat-messages">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`message ${msg.role}`}
                >
                  <Avatar 
                    icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                    className={`message-avatar ${msg.role}`}
                  />
                  <div className="message-content">
                    <div className="message-bubble">
                      <Text>{msg.content}</Text>
                    </div>
                    {msg.role === 'assistant' && (
                      <div className="message-sources">
                        <div className="sources-header">
                          <ApiOutlined /> 参考来源
                        </div>
                        {msg.sources?.map((source, idx) => (
                          <div key={idx} className="source-item">
                            <Tag color="cyan">{source.title}</Tag>
                            <Tooltip title={source.content}>
                              <Text type="secondary" className="source-score">匹配度 {Math.round(source.score * 100)}%</Text>
                            </Tooltip>
                          </div>
                        ))}
                        <div className="message-actions">
                          <Button type="text" size="small" icon={<CopyOutlined />}>复制</Button>
                          <Button type="text" size="small" icon={<StarOutlined />}>收藏</Button>
                          <Button type="text" size="small" icon={<LikeOutlined />} onClick={() => handleFeedback(msg.id, true)}>有帮助</Button>
                          <Button type="text" size="small" icon={<DislikeOutlined />} onClick={() => handleFeedback(msg.id, false)}>没帮助</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="message assistant"
              >
                <Avatar icon={<RobotOutlined />} className="message-avatar assistant" />
                <div className="message-content">
                  <div className="message-bubble loading">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="input-tools">
              <Tooltip title="上传附件">
                <Button type="text" icon={<PaperClipOutlined />} />
              </Tooltip>
              <Tooltip title="历史记录">
                <Button type="text" icon={<HistoryOutlined />} />
              </Tooltip>
              <Tooltip title="设置">
                <Button type="text" icon={<SettingOutlined />} />
              </Tooltip>
            </div>
            <Input.TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={(e) => !e.shiftKey && handleSend()}
              placeholder="请输入您的问题，AI将根据知识库进行回答..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="chat-input"
            />
            <Button type="primary" icon={<SendOutlined />} onClick={handleSend} className="send-btn" loading={loading}>
              发送
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QASystem;