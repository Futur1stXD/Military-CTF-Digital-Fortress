import { Layout, Space, Flex, Dropdown, Typography } from "antd";
import { UserOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";
import { useState } from 'react'

const headerStyle = {
  height: 60,
  backgroundColor: "#121927",
  alignItems: "center",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
};

export default function AppHeader() {
  const [authorized, setAuthorized] = useState(false);

  const headerList = [
    { id: '1', title: "Ключевые события", destination: "" },
    { id: '2', title: "Организаторы", destination: "" },
    { id: '3', title: "FAQ", destination: "" },
  ];

  const items = [
    { label: "Аккаунт", key: "1", icon: <UserOutlined /> },
    { label: "Команда", key: "2", icon: <TeamOutlined /> },
    { label: "Наcтройки", key: "3", icon: <SettingOutlined /> },
  ];

  const onClick = ({ key }) => {
    console.log(key);
  };

  return (
    <Layout.Header style={headerStyle}>
      <div className="header-title">
        Military CTF
      </div>
      <Flex gap="large" style={{ alignItems: "center" }}>
        {headerList.map((item) => (
          <Typography.Text className="header-list" key={item.id}>{item.title}</Typography.Text>
        ))}
        {authorized ? <Dropdown menu={{ items, onClick }}>
          <div className="header-button">
            <Space>
              <UserOutlined />
              Профиль
            </Space>
          </div>
        </Dropdown> : <div className="header-button">
          <Space>
            <a href="/login" style={{ color: 'white' }}>
              <UserOutlined style={{ paddingRight: 5 }} />
              Войти
            </a>
          </Space>
        </div>
        }
      </Flex>
    </Layout.Header >
  );
}
