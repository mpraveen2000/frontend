import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import "./style.css";
import { Link, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const LayoutDesign: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout-alignment">
      <Header style={{ background: "#fff", padding: 0 }}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/skill">Skill</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/tag">Tag</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: "#fff",
          minHeight: 280,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutDesign;
