import { Form, Input, Button } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function Login() {
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
                <p className="text-white text-3xl text-center mb-10">Войдите в свою учетную запись</p>
                <p className='text-white'>Адрес электронной почты</p>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста введите электронную почту!' }]}
                >
                    <Input
                        type="email"
                        placeholder="Ваш email"
                        className="rounded-lg mb-1"
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
                    <p className='text-white text-sm text-wrap pt-4' style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>У вас нет учетной записи?<a href="/register" className='ml-2 hover:underline'>Регистрация</a></p>
                </Form.Item>
            </Form>
        </div>
    );
}