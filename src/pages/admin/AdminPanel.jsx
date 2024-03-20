import { useState, useEffect } from "react";
import { message } from "antd";

export default function AdminPanel({authenticated, token}) {
    if (token === "" && !authenticated) {
        window.location.href = "http://localhost:5173/";
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
        fetchUsers();
        if (authenticated && token !== "") {
            fetchTeams();
            fetchUsers();
            fetctCTFTeams();
        }
    }, []);


    const fetchTeams = async () => {
        try {
            const response = await fetch('http://localhost:8080/org/admin/getTeams', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTeams(data.teams);

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
            const response = await fetch('http://localhost:8080/org/admin/getUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                
                setUsers(data.users);

            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при получении команд");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при получении команд");
        }
    };

    const fetctCTFTeams = async () => {
        try {
            const response = await fetch('http://localhost:8080/org/admin/getCTFTeams', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        

            if (response.ok) {
                const data = await response.json();
                setCTF_teams(data.ctf_teams);

            } else {
                console.error('Error fetching authentication status:', response.statusText);
                errorMessage("Ошибка при получении команд");
            }
        } catch (error) {
            console.error('Error fetching authentication status:', error.message);
            errorMessage("Ошибка при получении команд");
        }
    };

    return (
        <div>
            {contextHolder}
            <div>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}