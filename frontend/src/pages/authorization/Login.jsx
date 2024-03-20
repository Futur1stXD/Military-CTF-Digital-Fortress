import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha'

export default function Login({authenticated}) {
    if (authenticated) {
        window.location.href = "http://localhost:5173/";
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [capcha, setCapcha] = useState(false);

    const errorMessage = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: values.email, password: values.password })
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                setLoading(false);
            }

            const data = await response.json();
            if (data === null) {
                errorMessage("Ошибка при авторизации");
                setLoading(false);
                throw new Error("Ошибка при авторизации");
            }
            localStorage.setItem('token', data.token);
            setLoading(false);
            window.location.href = "http://localhost:5173/";
        } catch (error) {
            setLoading(false);
            throw new Error(error.message);
        }
    };


    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center">
            {contextHolder}
            <Form
                name="login"
                onFinish={onFinish}
                className="max-w-sm mx-auto bg-inherit rounded-lg p-8"
            >
                <div className="flex justify-center items-center">
                    <a href='/'>
                        <img src="src/img/logo.png" alt="" className="w-16 h-16 mt-8 mb-5" />
                    </a>
                </div>
                <p className="text-white text-3xl text-center mb-10">Войдите в свою учетную запись</p>
                <p className='text-white'>Адрес электронной почты</p>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста введите электронную почту!' }, {
                        pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                        , message: "Правильно введите почту!"
                    }]}
                >
                    <Input
                        type="email"
                        placeholder="Ваш email"
                        className="rounded-lg mb-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                <p className='text-white'>Пароль от аккаунта</p>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                >
                    <Input.Password
                        placeholder="Ваш пароль"
                        className="rounded-lg mb-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <ReCAPTCHA
                            sitekey="6Ld3WJ8pAAAAAB6gN8y795q2Izr_CHkZB-pSPiF_"
                            className='mt-4 ml-2'
                            onChange={() => setCapcha(true)}
                            rules={[{ required: true, message: 'Пожалуйста пройдите capthca!' }]}/>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full ring-lime bg-inherit"
                        loading={isLoading}
                        disabled={!capcha}
                    >
                        Войти
                    </Button>
                    <p className='text-white text-sm text-wrap pt-4' style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>У вас нет учетной записи?<a href="/register" className='ml-2 hover:underline'>Регистрация</a></p>
                </Form.Item>
            </Form>
        </div>
    );
}
