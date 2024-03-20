import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Modal, Result, Flex, message, Divider } from 'antd';
import AppHeader from './layout/AppHeader';
import AppFooter from './layout/AppFooter';
import { TeamOutlined, MinusCircleOutlined, ShrinkOutlined, UsergroupAddOutlined } from '@ant-design/icons';

export default function Team({ isPhone, authenticated, token }) {
    if (token === "" && !authenticated) {
        window.location.href = "http://localhost:5173/";
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isTeamExist, setTeamExist] = useState(false);
    const [members, setMembers] = useState([]);
    const [team_title, setTitle] = useState("");
    const [invite, setInvite] = useState("");
    const [loadingInvite, setLoadingInvite] = useState("");

    const [messageApi, contextHolder] = message.useMessage()

    const errorMessage = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const [isLoading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/team/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: values.team_title
                })
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                setLoading(false);
                return;
            }

            await getTeam();

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Произошла ошибка:", error);
            throw new Error(error.message);
        }
    };

    const getTeam = async () => {
        try {
            setLoading(true);
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
                setLoading(false);
                return;
            }

            if (response.ok && response.text == "Создайте команду!") {
                return;
            }

            const data = await response.json();
            setTitle(data.title);
            setMembers(data.members);
            setInvite(data.invite);
            setLoading(false);
            setTeamExist(true);
        } catch (error) {
            setLoading(false);
            console.error("Произошла ошибка:", error);
            throw new Error(error.message);
        }
    }

    const openModel = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (authenticated && token !== "") {
            getTeam();
        }
    }, [authenticated, token]);

    const deleteUser = async (member) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/team/deleteMember', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: member
                })
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                setLoading(false);
                return;
            }

            await getTeam();

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Произошла ошибка:", error);
            throw new Error(error.message);
        }
    }

    const deleteTeam = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/team/deleteTeam', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log(response)

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                setLoading(false);
                return;
            }

            setTeamExist(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Произошла ошибка:", error);
            throw new Error(error.message);
        }
    }

    const leaveTeam = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/team/leave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                setLoading(false);
                return;
            }

            setTeamExist(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Произошла ошибка:", error);
            throw new Error(error.message);
        }
    }

    const addMember = async (values) => {
        try {
            setLoadingInvite(true);
            const response = await fetch('http://localhost:8080/team/addMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    invite: values.invite_hash
                })
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                setLoadingInvite(false);
                return;
            }

            await getTeam();
            setLoadingInvite(false);
        } catch (error) {
            setLoadingInvite(false);
            console.error("Произошла ошибка:", error);
            errorMessage(error.message);
            throw new Error(error.message);
        }
    };

    return (
        <div>
            {contextHolder}
            <div style={{
                backgroundColor: "#121927",
                minHeight: "calc(100vh - 80px)",
                margin: 'auto',
            }}>
                <AppHeader authenticated={authenticated} isPhone={isPhone} />
                {isTeamExist ?
                    <Form
                        name="team"
                        className=" md:min-h-52 rounded-lg p-1 ml-3 md:justify-center flex"
                        onFinish={onFinish}
                    >
                        <Card className={isPhone ? "bg-card border-none w-5/6" : "bg-card border-none w-3/6"}>
                            <h1 className="text-white tracking-wide"><TeamOutlined style={{ paddingRight: 10 }} />{team_title}</h1>
                            <h4 className="text-white tracking-wide"><ShrinkOutlined style={{ paddingRight: 10 }} />Для приглашения: {invite}</h4>
                            <ul className='text-white pt-4 text-lg pb-4'>
                                {members.map((member) => (
                                    <Flex className='no-wrap' key={member}>
                                        <li className='ml-4 mr-2'>{member}</li>
                                        <Button type="primary" danger ghost size='small' onClick={() => deleteUser(member)}>
                                            <MinusCircleOutlined />
                                        </Button>
                                    </Flex>
                                ))}
                            </ul>
                            <Flex vertical gap={30}>
                                <Button type="primary" ghost size='large' onClick={leaveTeam}>Покинуть команду</Button>
                                <Button type="primary" danger ghost size='large' onClick={deleteTeam}>Удалить команду</Button>
                            </Flex>
                        </Card>
                    </Form> :
                    <div className=" md:min-h-52 rounded-lg p-1 ml-3 md:justify-center flex">
                        <Card className={isPhone ? "bg-card border-none w-5/6" : "bg-card border-none w-3/6"}>
                            <Form
                                name="team"
                                onFinish={onFinish}
                            >

                                <h1 className="text-white tracking-wide"><TeamOutlined style={{paddingRight: 10}} />Создать команду</h1>
                                <p className="text-white tracking-wide mb-3">Только лидер может редактировать команду</p>
                                <p className="text-white tracking-wide mb-3">Название команды</p>
                                <Form.Item
                                    name="team_title"
                                    rules={[{ required: true, message: 'Введите e-mail!' }]}
                                    className="w-3/6"
                                >
                                    <Input type="text" className="rounded-lg mb-1" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={isLoading}>
                                        Создать
                                    </Button>
                                </Form.Item>
                                <Divider style={{ background: 'white' }} />
                            </Form>
                            <Form onFinish={addMember}>
                                <h1 className="text-white tracking-wide"><UsergroupAddOutlined style={{paddingRight: 10}} />Войти в команду</h1>
                                <p className="text-white tracking-wide mb-3">Инвайт-хеш</p>
                                <Form.Item
                                    name="invite_hash"
                                    rules={[{ required: true, message: 'Введите e-mail!' }]}
                                    className="w-3/6"
                                >
                                    <Input type="text" className="rounded-lg mb-1" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="dashed" htmlType="submit" loading={loadingInvite}>
                                        Войти
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>}
            </div>
            <AppFooter isPhone={isPhone} />
        </div >
    );
};
