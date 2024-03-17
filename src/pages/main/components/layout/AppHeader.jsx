import { Layout, Space, Flex, Dropdown, Typography } from "antd";
import { UserOutlined, TeamOutlined, SettingOutlined, MenuOutlined, KeyOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const headerStyle = {
  height: 60,
  backgroundColor: "#121927",
  alignItems: "center",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
};

export default function AppHeader({ isPhone, authorized }) {

  const headerList = [
    { id: '1', title: "Ключевые события", destination: "" },
    { id: '2', title: "Организаторы", destination: "" },
    { id: '3', title: "FAQ", destination: "" },
  ];

  const dropDownItems = [
    { label: "Аккаунт", key: "1", icon: <UserOutlined /> },
    { label: "Команда", key: "2", icon: <TeamOutlined /> },
    { label: "Наcтройки", key: "3", icon: <SettingOutlined /> },
  ];

  const dropDownItemsMobile = [
    { label: "Ключевые события", key: "1", icon: <KeyOutlined />},
    { label: "Организаторы", key: "2", icon: <TeamOutlined />},
    { label: "FAQ", key: "3", icon: <QuestionCircleOutlined />},
    { label: "Войти", key: "4", icon: <UserOutlined />},
  ];

  const dropDownItemsMobileAuth = [
    { label: "Ключевые события", key: "1", icon: <KeyOutlined />},
    { label: "Организаторы", key: "2", icon: <TeamOutlined />},
    { label: "FAQ", key: "3", icon: <QuestionCircleOutlined />},
    { label: "Профиль", key: "4", icon: <UserOutlined />},
    { label: "Команда", key: "5", icon: <TeamOutlined /> },
    { label: "Наcтройки", key: "6", icon: <SettingOutlined />},
  ];

  const onClick = ({ key }) => {
    console.log(key);
  };

  return (
    <Layout.Header style={headerStyle}>
      <div className="header-title">
      <img src="src/img/logo.png" alt="logo" />
        Military
      </div>
      {isPhone ? (<div>
        <Flex gap={'large'} style={{ alignItems: "center" }}>
          <Dropdown menu={{ items: authorized ? dropDownItemsMobileAuth : dropDownItemsMobile, onClick }}>
              <MenuOutlined style={{ color: 'white' }} />
          </Dropdown>
        </Flex>
      </div>) : (<div>
        <Flex gap="large" style={{ alignItems: "center" }}>
          {headerList.map((item) => (
            <Typography.Text className="header-list" key={item.id}>{item.title}</Typography.Text>
          ))}
          {authorized ? <Dropdown menu={{ items: dropDownItems, onClick }}>
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
      </div>)}
    </Layout.Header >
  );
}
