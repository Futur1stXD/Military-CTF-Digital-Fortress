import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'

export default function Register({ authenticated }) {
    if (authenticated) {
        window.location.href = "https://10.1.14.162/";
    }

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickName] = useState('');
    const [telegramnick, setTelegramNick] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    const [capcha, setCapcha] = useState(false);


    const [isLoading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const errorMessage = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await fetch('https://10.1.14.162/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    firstName: values.firstname,
                    lastName: values.lastname,
                    password: values.password,
                    nickname: values.nickname,
                    telegramNick: values.telegramnick,
                    phoneNumber: values.phonenumber
                })
            });

            if (!response.ok) {
                const errorMessageText = await response.text();
                errorMessage(errorMessageText);
                setLoading(false);
            }

            if (!response.ok) {
                if (response.status > 200) {
                    const errorMessageText = await response.text();
                    errorMessage(errorMessageText);
                }
                setLoading(false);
            } else {
                setLoading(false);
                window.location.href = "https://10.1.14.162/login";
            }
        } catch (error) {
            setLoading(false);
            console.error("Произошла ошибка:", error);
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
                <p className="text-white text-3xl text-center mb-10">Регистрация</p>
                <p className='text-white'>ФИО</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <Form.Item
                        name="firstname"
                        hasFeedback
                        rules={[{ required: true, message: 'Пожалуйста введите имя!' }, {
                            pattern: /^[a-zA-Zа-яА-ЯёЁ]+(?:[\s-][a-zA-Zа-яА-ЯёЁ]+)*$/
                            , message: "Введите правильно свое имя!"
                        }]}
                    >
                        <Input
                            type="first_name"
                            placeholder=" Имя"
                            className="rounded-lg mb-1"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        hasFeedback
                        rules={[{ required: true, message: 'Пожалуйста введите фамилию!' }, {
                            pattern: /^[a-zA-Zа-яА-ЯёЁ]+(?:[\s-][a-zA-Zа-яА-ЯёЁ]+)*$/
                            , message: "Введите правильно свою фамилию!"
                        }]}
                    >
                        <Input
                            type="lastname"
                            placeholder=" Фамилия"
                            className="rounded-lg mb-1"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Item>
                </div>
                <p className='text-white'>Номер телефона </p>
                <Form.Item
                    name="phonenumber"
                    hasFeedback
                    rules={[{ required: true, message: 'Пожалуйста введите номер!' }, {
                        pattern: /^(?:[0-9] ?){6,14}[0-9]$/
                        , message: "Правильно введите номер телефона!"
                    }]}
                >
                    <Input
                        placeholder="Номер телефона"
                        className="rounded-lg mb-1"
                        value={phonenumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Item>
                <p className='text-white'>Телеграмм</p>
                <Form.Item
                    name="telegramnick"
                    rules={[{ required: true, message: 'Пожалуйста введите телеграмм!' }]}
                    hasFeedback
                >
                    <Input
                        placeholder="@template"
                        className="rounded-lg mb-1"
                        value={telegramnick}
                        onChange={(e) => setTelegramNick(e.target.value)}
                    />
                </Form.Item>
                <p className='text-white'>Nickname </p>
                <Form.Item
                    name="nickname"
                    rules={[{ required: true, message: 'Пожалуйста введите nickname!' }]}
                    hasFeedback
                >
                    <Input
                        placeholder="nickname"
                        className="rounded-lg mb-1"
                        value={nickname}
                        onChange={(e) => setNickName(e.target.value)}
                    />
                </Form.Item>
                <p className='text-white'>email </p>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста введите email!' }, {
                        pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                        , message: "Правильно введите почту!"
                    }]}
                    hasFeedback
                >
                    <Input
                        placeholder="email"
                        className="rounded-lg mb-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </Form.Item>
                <p className='text-white'>Введите пароль </p>
                <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                        { required: true, message: 'Пожалуйста, введите пароль!' },
                        { min: 8, message: 'Пароль должен содержать не менее 8 символов!' },
                        { pattern: /^(?=.*[0-9]).+$/, message: 'Пароль должен содержать хотя бы одну цифру!' },
                    ]}

                >
                    <Input.Password
                        placeholder="Пароль"
                        className="rounded-lg mb-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <p className='text-white'>Подтвердить пароль </p>
                <Form.Item
                    name="password checker"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Пожалуйста, введите пароль!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        }),
                    ]}

                >
                    <Input.Password
                        placeholder="Пароль"
                        className="rounded-lg mb-1"
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
                    <p className='text-white text-sm text-wrap pt-4' style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>Уже есть учетная запись?<a href='/login' className='ml-2 hover:underline'>Авторизоваться</a></p>
                </Form.Item>
            </Form>
        </div>
    );
}