import { Form, Input, Button } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function Register() {
    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center">
            <Form
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                        name="email"
                        rules={[{ required: true, message: 'Пожалуйста введите имя!' }]}
                    >
                        <Input
                            type="firstname"
                            placeholder=" Имя"
                            className="rounded-lg mb-1"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Пожалуйста введите фамилию!' }]}
                    >
                        <Input
                            type="lastname"
                            placeholder=" Фамилия"
                            className="rounded-lg mb-1"
                        />
                    </Form.Item>
                </div>
                <p className='text-white'>Номер телефона </p>
                <Form.Item
                    name="phone number"
                    rules={[{ required: true, message: 'Пожалуйста введите номер!' }]}
                >
                    <Input
                        placeholder="Номер телефона"
                        className="rounded-lg mb-1"
                    />
                </Form.Item>
                <p className='text-white'>Телеграмм</p>
                <Form.Item
                    name="telegram"
                    rules={[{ required: true, message: 'Пожалуйста введите телеграмм!' }]}
                >
                    <Input
                        placeholder="@template"
                        className="rounded-lg mb-1"
                    />
                </Form.Item>
                <p className='text-white'>Nickname </p>
                <Form.Item
                    name="nickname"
                    rules={[{ required: true, message: 'Пожалуйста введите nickname!' }]}
                >
                    <Input
                        placeholder="nickname"
                        className="rounded-lg mb-1"
                    />
                </Form.Item>
                <p className='text-white'>email </p>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста введите email!' }]}
                >
                    <Input
                        placeholder="email"
                        className="rounded-lg mb-1"
                    />
                </Form.Item>
                <p className='text-white'>Введите пароль </p>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                >
                    <Input
                        placeholder="Пароль"
                        className="rounded-lg mb-1"
                    />
                </Form.Item>
                <p className='text-white'>Подтвердить пароль </p>
                <Form.Item
                    name="password checker"
                    rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                >
                    <Input
                        placeholder="Пароль"
                        className="rounded-lg mb-1"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full ring-lime bg-inherit"
                    >
                        Войти
                    </Button>
                    <p className='text-white text-sm text-wrap pt-4' style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>Уже есть учетная запись?<a href='/login' className='ml-2 hover:underline'>Авторизоваться</a></p>
                </Form.Item>
            </Form>
        </div>
    );
}