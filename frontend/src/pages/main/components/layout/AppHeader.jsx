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
    { label: (<a href="https://t.me/+ZPEIUT8A5140NzYy">Telegram</a>), key: "1", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4  h-4" viewBox="0 0 48 48">
    <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"></path><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"></path><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"></path>
    </svg>},
    { label: (<a href="/ctf">Регистрация на CTF</a>), key: "2", icon: <CheckCircleOutlined /> },
    { label: (<a href="/team">Команда</a>), key: "3", icon: <TeamOutlined /> },
    { label: (<a href="/rules">Правила</a>), key: "4", icon: <QuestionCircleOutlined /> },
    { label: (<a href="/login">Войти</a>), key: "5", icon: <UserOutlined /> },
  ];

  const dropDownItemsMobileAuth = [
    { label: (<a href="https://t.me/+ZPEIUT8A5140NzYy">Telegram</a>), key: "1", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4  h-4" viewBox="0 0 48 48">
    <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"></path><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"></path><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"></path>
    </svg>},
    { label: (<a href="/ctf">Регистрация на CTF</a>), key: "2", icon: <CheckCircleOutlined /> },
    { label: (<a href="/team">Команда</a>), key: "3", icon: <TeamOutlined /> },
    { label: (<a href="/rules">Правила</a>), key: "4", icon: <QuestionCircleOutlined /> },
    { label: (<a href="/profile">Профиль</a>), key: "5", icon: <UserOutlined /> },
    { label: (<a onClick={signOut}>Выйти</a>), key: '6' },
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
          <div className="flex justify-inline">
          
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8  h-8 mt-4" href='https://t.me/+ZPEIUT8A5140NzYy' viewBox="0 0 48 48">
              <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"></path><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"></path><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"></path>
            </svg>
            <a href="https://t.me/+ZPEIUT8A5140NzYy" className="header-list" style={{ color: 'white' }}>Telegram</a>
          </div>
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
