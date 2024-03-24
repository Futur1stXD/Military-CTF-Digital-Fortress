import { useState, useEffect } from "react";
import { Button, Flex, message } from "antd";

export default function AdminPanel({ authenticated, token }) {
    if (token === "" && !authenticated) {
        window.location.href = "https://ctf.astanait.edu.kz/";
    }

    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [ctf_teams, setCTF_teams] = useState([]);

    const errorMessage = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        fetchTeams();
        fetchUsers();
        fetctCTFTeams();
    }, []);


    const fetchTeams = async () => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/getTeams', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTeams(data.teams);
                console.log(data.teams)
            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при получении команд");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при получении команд");
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/getUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();

                setUsers(data.users);

            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при получении юзеров");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при получении юзеров");
        }
    };

    const fetctCTFTeams = async () => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/getCTFTeams', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCTF_teams(data.ctf_teams);

            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при получении CTF-команд");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при получении CTF-команд");
        }
    };

    const setAdmin = async (id) => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/setAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id, role: "ADMIN" })
            });
            if (response.ok) {
                await fetchUsers();
            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при изменении роли");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при изменении роли");
        }
    };

    const setUser = async (id) => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/setAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id, role: "USER" })
            });
            if (response.ok) {
                await fetchUsers();
            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при изменении роли");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при изменении роли");
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/deleteUser/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            
            if (response.ok) {
                await fetchUsers();
            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при удалении пользователя");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при удалении пользователя");
        }
    };

    const deleteTeam = async(id) => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/deleteTeam/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id })
            });
            
            if (response.ok) {
                await fetchTeams();
            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при удалении команды");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при удалении команды");
        }
    }

    const deleteCTFTeam = async(id) => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/deleteCTFTeam/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id })
            });
            
            if (response.ok) {
                await fetctCTFTeams();
            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при удалении ctf-команды");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при удалении ctf-команды");
        }
    }

    const setAccepted = async (id) => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/setCTFTeam_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id, status: "ACCEPTED" })
            });
            if (response.ok) {
                await fetctCTFTeams();
            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при изменении статуса");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при изменении статуса");
        }
    };

    const setProcess = async (id) => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/setCTFTeam_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id, status: "PROCESS" })
            });
            if (response.ok) {
                await fetctCTFTeams();
            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при изменении статуса");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при изменении статуса");
        }
    };

    const setAdopted = async (id) => {
        try {
            const response = await fetch('https://ctf.astanait.edu.kz/api/org/admin/setCTFTeam_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id, status: "ADOPTED" })
            });
            if (response.ok) {
                await fetctCTFTeams();
            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при изменении статуса");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при изменении статуса");
        }
    };

    return (
        <div>
            {contextHolder}
            <div className="table-wrapper">
                <h2>Таблица пользователей</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Никнейм</th>
                            <th>Номер телефона</th>
                            <th>Telegram ник</th>
                            <th>Команда</th>
                            <th>Успешные попытки</th>
                            <th>Попытки</th>
                            <th>Роль</th>
                            <th>Статус</th>
                            <th>Команды админа</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.nickname}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.telegram_nick}</td>
                                <td>{user.teamId}</td>
                                <td>{user.success_attempts}</td>
                                <td>{user.attempts}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <Flex gap={20}>
                                    <Button type="primary" size="small" onClick={() => setAdmin(user.id)}>Сделать Админом</Button>
                                    <Button type="primary" size="small" onClick={() => setUser(user.id)}>Сделать Юзером</Button>
                                    <Button danger size="small" onClick={() => deleteUser(user.id)}>Удалить юзера</Button>
                                </Flex>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="table-wrapper">
                <h2>Таблица Команд</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Лидер</th>
                            <th>2-ой</th>
                            <th>3-ий</th>
                            <th>Инвайт</th>
                            <th>Команды админа</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team => (
                            <tr key={team.id}>
                                <td>{team.id}</td>
                                <td>{team.title}</td>
                                <td>{team.leader}</td>
                                <td>{team.secondPerson !== null ? team.secondPerson : "нету"}</td>
                                <td>{team.thirdPerson !== null ? team.thirdPerson : "нету"}</td>
                                <td>{team.invite}</td>
                                <td><Button danger size="small" onClick={() => deleteTeam(team.id)}>Удалить команду</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="table-wrapper">
                <h2>Таблица CTF Команд</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название Команды</th>
                            <th>Лидер</th>
                            <th>2 участник</th>
                            <th>3 участник</th>
                            <th>Дескрипшн</th>
                            <th>Статус</th>
                            <th>Команды Админа</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ctf_teams.map(ctf_team => (
                            <tr key={ctf_team.id}>
                                <td>{ctf_team.id}</td>
                                <td>{ctf_team.team}</td>
                                <td>{ctf_team.users[0] !== null ? ctf_team.users[0] : "нету"}</td>
                                <td>{ctf_team.users[1] !== null ? ctf_team.users[1] : "нету"}</td>
                                <td>{ctf_team.users[2] !== null ? ctf_team.users[2] : "нету"}</td>
                                <td>{ctf_team.description !== null ? ctf_team.description : "нету"}</td>
                                <td>{ctf_team.status}</td>
                                <td>
                                <Flex gap={20}>
                                    <Button danger size="small" onClick={() => deleteCTFTeam(ctf_team.id)}>Удалить команду</Button>
                                    <Button style={{color: 'green'}} size="small" onClick={() => setAccepted(ctf_team.id)}>ACCEPTED</Button>
                                    <Button style={{color: 'orange'}}  size="small" onClick={() => setProcess(ctf_team.id)}>PROCESS</Button>
                                    <Button style={{color: 'red'}}  size="small" onClick={() => setAdopted(ctf_team.id)}>ADOPTED</Button>
                                </Flex>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
