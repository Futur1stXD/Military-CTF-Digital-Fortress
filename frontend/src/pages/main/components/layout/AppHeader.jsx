import { Layout, Space, Flex, Dropdown, Typography } from "antd";
import { UserOutlined, TeamOutlined, MenuOutlined, QuestionCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const headerStyle = {
  height: 60,
  backgroundColor: "#121927",
  alignItems: "center",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
};

export default function AppHeader({ isPhone, authenticated }) {
  const signOut = () => {
    localStorage.removeItem('token');
    window.location.href = "http://localhost:5173/";
  }

  const headerList = [
    { id: '1', title: "Регистрация на CTF", destination: "", linkUrl: "/ctf" },
    { id: '2', title: "Команда", destination: "", linkUrl: "/team" },
    { id: '3', title: "Правила", destination: "", linkUrl: '/rules' },
  ];

  const dropDownItemsMobile = [
    { label: (<a href="/ctf">Регистрация на CTF</a>), key: "1", icon: <CheckCircleOutlined />},
    { label: (<a href="/team">Команда</a>), key: "2", icon: <TeamOutlined />},
    { label: (<a href="/rules">Правила</a>), key: "3", icon: <QuestionCircleOutlined /> },
    { label: (<a href="/login">Войти</a>), key: "4", icon: <UserOutlined /> },
  ];

  const dropDownItemsMobileAuth = [
    { label: (<a href="/ctf">Регистрация на CTF</a>), key: "1", icon: <CheckCircleOutlined />},
    { label: (<a href="/team">Команда</a>), key: "2", icon: <TeamOutlined /> },
    { label: (<a href="/rules">Правила</a>), key: "3", icon: <QuestionCircleOutlined /> },
    { label: (<a href="/profile">Профиль</a>), key: "4", icon: <UserOutlined /> },
    { label: (<a onClick={signOut}>Выйти</a>), key: '5' },
  ];

  return (
    <Layout.Header style={headerStyle}>
      <a href="/">
        <div className="header-title">
          <img src="src/img/logo.png" alt="logo" />
          Military
        </div>
      </a>
      {isPhone ? (<div>
        <Flex gap={'large'} style={{ alignItems: "center" }}>
          <Dropdown menu={{ items: authenticated ? dropDownItemsMobileAuth : dropDownItemsMobile }}>
            <MenuOutlined style={{ color: 'white' }} />
          </Dropdown>
        </Flex>
      </div>) : (<div>
        <Flex gap="large" style={{ alignItems: "center" }}>
          {headerList.map((item) => (
            <a href={item.linkUrl} key={item.id}>
              <Typography.Text className="header-list" key={item.id}>{item.title}</Typography.Text>
            </a>
          ))}
          {authenticated ?
            <Dropdown menu={{ items: [{ "key": '1', label: (<a onClick={signOut}>Выйти</a>) }] }}>
              <a href="/profile">
                <div className="header-button">
                  <Space>
                    <UserOutlined />
                    Профиль
                  </Space>
                </div>
              </a>
            </Dropdown>
            : <div className="header-button">
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
