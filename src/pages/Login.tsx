import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      // 模拟登录验证
      if (values.username === 'admin' && values.password === '123456') {
        // 存储登录状态到本地存储
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', values.username);
        message.success('登录成功');
        // 跳转到首页
        navigate('/');
      } else {
        message.error('用户名或密码错误');
      }
    } catch (error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#00d4ff"/>
            <path d="M2 17L12 22L22 17" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>khub</h1>
        </div>
        <h2>登录管理后台</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;