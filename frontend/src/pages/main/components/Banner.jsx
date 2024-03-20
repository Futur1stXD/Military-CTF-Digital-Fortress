import React, { useEffect, useState } from 'react';
import { Table, Tag, Mentions, message, Button, Modal, Form, Input } from 'antd';
import AppHeader from './layout/AppHeader';
import AppFooter from './layout/AppFooter';
import ReCAPTCHA from 'react-google-recaptcha'
const { Option } = Mentions;

const Banner = ({ isPhone, authenticated, token }) => {

    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [isMyTeamCreated, setMyTeamCreated] = useState(false);
    const [isMyTeamJoined, setMyTeamJoined] = useState(false);


    const [capcha, setCapcha] = useState(false);
    const errorMessage = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
    
            await fetchTeams(); 
    
            if (authenticated && token !== "") {
                await getTeam();
                await getIsTeamJoined();
            }
    
            setIsLoading(false);
        }
    
        fetchData();
    }, [authenticated, token]); 

    const fetchTeams = async () => {
        try {
            const response = await fetch('http://localhost:8080/team/getCTFTeams', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setData(data.teams.map((item, index) => ({
                    ...item,
                    key: String(index)
                })));

            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при получении команд");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при получении команд");
        }
    };

    const getIsTeamJoined = async() => {
        try {
            const response = await fetch('http://localhost:8080/team/getCTF_Team_isJoined', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                return;
            }

            const data = await response.json();
            setMyTeamJoined(data.joined);
        } catch (error) {
            console.error("Произошла ошибка:", error);
            throw new Error(error.message);
        }
    }

    const getTeam = async () => {
        try {
            const response = await fetch('http://localhost:8080/team/getTeam', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                return;
            }

            if (response.ok && response.text == "Создайте команду!") {
                return;
            }
            const data = await response.json();
            setTitle(data.title);
            console.log(data.title)
            setMyTeamCreated(true);
        } catch (error) {
            console.error("Произошла ошибка:", error);
            throw new Error(error.message);
        }
    }

    const onFinish = async (values) => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/team/join_ctf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    description: values.description
                })
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                setIsLoading(false);
                return;
            }

            await fetchTeams();
            setCapcha(false);
            setMyTeamJoined(true);
            setIsLoading(false);
            setIsModalOpen(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Произошла ошибка:", error);
            throw new Error(error.message);
        }
    }

    const unJoin = async() => {
        try {
            const response = await fetch('http://localhost:8080/team/unJoin_CTF_team', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                return;
            }

            setMyTeamJoined(false);
            await fetchTeams();
        } catch (error) {
            console.error("Произошла ошибка:", error);
            throw new Error(error.message);
        }
    }

    const getColor = (status) => {
        if (status === 'PROCESS') {
            return 'yellow';
        } else if (status === 'ACCEPTED') {
            return 'green';
        } else if (status === 'ADOPTED') {
            return 'red';
        } else {
            return 'blue';
        }
    };

    const columns = [
        {
            title: 'Команды',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Статус',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    <Tag color={getColor(status)} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                </>
            ),
        },
    ];

    return (
        <div style={{
            backgroundColor: "#121927",
            minHeight: "calc(100vh - 80px - 60px)",
        }}>
            {contextHolder}
            <AppHeader authenticated={authenticated} isPhone={isPhone} />
            <div style={{
                minHeight: "calc(100vh - 80px - 60px)",
                color: "white",
                backgroundColor: "#141D2B",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }} >
                <img src="src/img/ctf-digital.png" alt="" className="md:w-1/4 md:h-1/4 w-5/6 h-/6 md:pt-12 py-5" />
                {(!authenticated && !isMyTeamCreated) && <h5 style={{color: 'red'}}>Для регистрации вам нужно авторизоваться и создать команду!</h5>}
                {(authenticated && isMyTeamCreated) && <div>{isMyTeamJoined ? <div><ReCAPTCHA
                            sitekey="6Ld3WJ8pAAAAAB6gN8y795q2Izr_CHkZB-pSPiF_"
                            className='mt-4 ml-2'
                            onChange={() => setCapcha(true)}
                            rules={[{ required: true, message: 'Пожалуйста пройдите capthca!' }]}/><Button danger ghost size='large' disabled={!capcha} style={{color: 'red'}} onClick={unJoin}>Отменить регистрацию {title}</Button></div> : <Button type='primary' size='large' onClick={() => setIsModalOpen(true)}>Зарегистрировать свою команд: {title}</Button> }
                    <Modal title="Регистрация команды" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                        <h4>Вы регистрируете команду: {title}</h4>
                        <Form name="team" onFinish={onFinish}>
                            <Form.Item name="description" style={{ paddingTop: 10, margin: 0 }}>
                                <Input type="text" />
                            </Form.Item>
                            <p style={{ color: 'orange' }}>Рассказав о вашем опыте в CTF, вы повысите шансы на отбор.</p>
                            <ReCAPTCHA
                            sitekey="6Ld3WJ8pAAAAAB6gN8y795q2Izr_CHkZB-pSPiF_"
                            className='mt-4 ml-2'
                            onChange={() => setCapcha(true)}
                            rules={[{ required: true, message: 'Пожалуйста пройдите capthca!' }]}/>
                            <Button type="primary" htmlType="submit" loading={isLoading} disabled={!capcha} style={{ marginTop: 10 }}>
                                Подать заявку
                            </Button>
                        </Form>
                    </Modal>
                </div>}
                <Table columns={columns} dataSource={data} className='w-5/6 md:w-2/4 md:rounded-lg md:py-5' />
            </div>
            <AppFooter isPhone={isPhone} />
        </div>
    );
};

export default Banner;