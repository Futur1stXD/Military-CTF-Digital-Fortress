import { Card, Typography, Flex, Button } from 'antd'
import { FilePdfOutlined } from '@ant-design/icons';


export default function TaskExamples({isPhone}) {
    let cards = [
        {
            title: "Reverse Engineering",
            imgUrl: "src/img/reverse.png",
            description: "Анализ программных решений с целью выявления уязвимостей.",
            url: "./public/reverse.pdf"
        },
        {
            title: "Web Exploitation",
            imgUrl: "./src/img/web.jpg",
            description: "Использование уязвимостей в веб-приложениях для проникновения в систему.",
            url: "./public/web.pdf"
        },
        {
            title: "OSINT",
            imgUrl: "./src/img/OSINT.jpg",
            description: "Сбор и анализ данных из общедоступных источников для решения задачи.",
            url: "./public/OSINT.pdf"
        },
    ];

    return (
        <div>
            <Typography.Title level={2} style={{ color: 'white', display: 'flex', margin: 'auto', justifyContent: 'center', paddingTop: 10 }}>Примеры задач CTF</Typography.Title>
            {isPhone ? (
                <Flex vertical gap={20} style={{ alignItems: 'center', justifyContent: 'center', margin: 'auto', paddingTop: 20 }}>
                    {cards.map(card => (
                        <Card title={card.title} bordered={false} key={card.title} style={{ width: '80%' }} extra={<a href={card.url} target='_blank'><Button type='primary' style={{ width: 110 }}>Открыть<FilePdfOutlined /></Button> </a>}>
                            <Flex vertical align='flex-end' gap={25}>
                                <Flex justify='space-evenly' gap={10}>
                                    <img src={card.imgUrl} alt={card.title} style={{ width: '20%'}} />
                                    <Typography.Text>{card.description}</Typography.Text>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            ) : (
                <Flex gap={'2.5%'} style={{ justifyContent: 'center', margin: 'auto', paddingTop: 20 }}>
                    {cards.map(card => (
                        <Card title={card.title} key={card.title} style={{ width: '25%' }} extra={<a href={card.url} target='_blank'><Button type='primary' style={{ width: 110 }}>Открыть<FilePdfOutlined /></Button></a>}>
                            <Flex vertical align='flex-end'>
                                <Flex gap={10}>
                                    <img src={card.imgUrl} alt={card.title} style={{ width: '25%' }} />
                                    <Typography.Text>{card.description}</Typography.Text>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            )}
        </div >
    );
}