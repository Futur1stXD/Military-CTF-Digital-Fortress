import { useState, useEffect } from 'react';
import { Typography, Steps } from 'antd'
import { LoadingOutlined, FlagOutlined, SketchOutlined, ClockCircleOutlined, FormOutlined } from '@ant-design/icons';

export default function KeyEvents() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            const nextStepIndex = items.findIndex(item => {
                const itemDate = new Date(item.timer);
                return itemDate < currentDate;
            });
            if (nextStepIndex !== -1) {
                setCurrentStep(nextStepIndex);
            }
        }, 5000);
        return () => clearInterval(interval)
    })

    const items = [
        {
            id: '0',
            title: 'Объявление CTF',
            description: "",
            timer: 'March 15, 2024'
        },
        {
            id: '1',
            title: 'Регистрация команд',
            icon: <FormOutlined />,
            description: "28 Марта, 2024",
            timer: 'March 29, 2024'
        },
        {
            id: '2',
            title: 'Check-In',
            description: "5 Апреля, 10:00-11:00",
            icon: <ClockCircleOutlined />,
            timer: 'April 5, 2024, 10:00'
        },
        {
            id: '3',
            title: 'Начало CTF',
            description: "5 Апреля, 11:00-16:00",
            icon: <FlagOutlined />,
            timer: 'March 29, 2024, 11:01'
        },
        {
            id: '4',
            title: 'Награждение',
            description: "5 Апреля, 16:00-17:00",
            icon: <SketchOutlined />,
            timer: 'March 29, 2024, 16:00'
        },
    ];

    return (
        <div>
            <Typography.Title level={2} style={{ color: 'white', marginLeft: '10%' }}>Ключевые события</Typography.Title>
            <Steps current={currentStep} items={items.map((item, index) => ({
                ...item,
                icon: index === currentStep + 1 ? <LoadingOutlined /> : item.icon
            }))} className='content-key-events' />
        </div>
    );
}