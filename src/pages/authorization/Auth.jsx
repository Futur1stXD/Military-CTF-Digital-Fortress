import { Layout, Card, Flex } from 'antd'
import { useState } from 'react';
import Login from './Login';

const headerStyle = {
    height: 60,
    backgroundColor: "#121927",
    alignItems: "center",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
};

const contentStyle = {
    minHeight: "calc(100vh - 60px)",
    color: "white",
    backgroundColor: "#141D2B",
    textColor: "white",
};

const tabList = [
    {
        key: 'tab1',
        tab: 'tab1',
    },
    {
        key: 'tab2',
        tab: 'tab2',
    },
];

const contentList = {
    tab1: <Login />,
    tab2: <p>content2</p>,
};

export default function Authorization() {
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const [activeTabKey2, setActiveTabKey2] = useState('app');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
    const onTab2Change = (key) => {
        setActiveTabKey2(key);
    };
    return (
        <Layout>
            <Layout.Header style={headerStyle}>
                <div className="header-title"><a href='/' style={{ color: 'white' }}>Military CTF</a></div>
            </Layout.Header>
            <Layout.Content style={contentStyle}>
                <Flex justify='center' align='center'>
                    <Card
                        style={{
                            width: '40%'
                        }}
                        title="Card title"
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                    >
                        {contentList[activeTabKey1]}

                    </Card>
                </Flex>
            </Layout.Content>
        </Layout>
    );
}

