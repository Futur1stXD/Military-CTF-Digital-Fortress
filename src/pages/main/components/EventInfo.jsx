import { Card, Flex, Typography, Carousel } from 'antd';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { FlagOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from "@uidotdev/usehooks";

export default function EventInfo({ isPhone }) {
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 801px) and (max-width : 1300px)"
    );

    const isLargeDevice = useMediaQuery(
        "only screen and (min-width : 1301px) and (max-width: 1500px)"
    );

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBeCKp1lWZ5rWDNyYDyPeMT1wOXMh9J4l8',
    });

    const contentStyle = {
        height: isMediumDevice ? 200 : isPhone ? 200 : 300,
        width: '100%',
        borderRadius: 10,
    };

    const center = {
        lat: 51.092836,
        lng: 71.421642,
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    if (isMediumDevice) {
        return (
            <Card style={{ width: '80%', display: 'flex', margin: 'auto', height: 650, marginBottom: 20 }}>
                <Flex gap={20}>
                    <GoogleMap
                        mapContainerStyle={{ width: 350, height: 600, borderRadius: 10 }}
                        zoom={16}
                        center={center}
                        mapTypeId='hybrid'
                    >
                    </GoogleMap>
                    <Flex vertical gap={10} style={{ width: '80%' }}>
                        <Flex>
                            <Typography.Title level={3} style={{ margin: 0, padding: 0 }}>Military CTF: Digital Fortress</Typography.Title>
                        </Flex>
                        <Card style={{ width: '85%' }}>
                            <Typography.Text><FlagOutlined style={{ color: 'red' }} /> CTF (Capture The Flag) - это соревнование в области кибербезопасности, в котором участники должны использовать свои навыки в хакинге, программировании, криптографии и анализе уязвимостей для решения различных задач с целью захвата флагов (флагов).</Typography.Text>
                            <Carousel autoplay style={{ width: 300, justifyContent: 'center', margin: 'auto', paddingTop: 20 }}>
                                <div>
                                    <img src='src/img/carousel1.jpg' style={contentStyle} />
                                </div>
                                <div>
                                    <img src='src/img/carousel2.jpg' style={contentStyle} />
                                </div>
                                <div>
                                    <img src='src/img/carousel3.jpg' style={contentStyle} />
                                </div>
                            </Carousel>
                            <Typography.Title level={4} style={{ margin: 'auto', display: 'flex', justifyContent: 'center', paddingTop: 10 }}>Место проведения CTF</Typography.Title>
                            <Flex vertical gap={5} align='flex-end' style={{ paddingTop: 10 }}>
                                <Typography.Text>Адрес: г. Астана, Проспект Мангилик Ел, 53/1</Typography.Text>
                                <Typography.Text style={{ color: 'gray' }}>(EXPO Международный выставочный центр)</Typography.Text>
                                <Typography.Text>Время проведения: 10:00 - 17:00</Typography.Text>
                                <Typography.Text strong><a href="#"><ExclamationCircleOutlined style={{ paddingRight: 5 }} />Правила</a></Typography.Text>
                            </Flex>
                        </Card>
                    </Flex>
                </Flex>

            </Card>);
    }

    if (isLargeDevice) {
        return (
            <Card style={{ width: '80%', display: 'flex', margin: 'auto', height: 730, marginBottom: 20 }}>
                <Flex gap={40}>
                    <GoogleMap
                        mapContainerStyle={{ width: 500, height: 680, borderRadius: 10 }}
                        zoom={16}
                        center={center}
                        mapTypeId='hybrid'
                    >
                    </GoogleMap>
                    <Flex vertical gap={10} style={{ width: '80%' }}>
                        <Flex>
                            <Typography.Title level={3} style={{ margin: 0, padding: 0 }}>Military CTF: Digital Fortress</Typography.Title>
                        </Flex>
                        <Card style={{ width: '85%' }}>
                            <Typography.Text><FlagOutlined style={{ color: 'red' }} /> CTF (Capture The Flag) - это соревнование в области кибербезопасности, в котором участники должны использовать свои навыки в хакинге, программировании, криптографии и анализе уязвимостей для решения различных задач с целью захвата флагов (флагов).</Typography.Text>
                            <Carousel autoplay style={{ width: 500, justifyContent: 'center', margin: 'auto', paddingTop: 20 }}>
                                <div>
                                    <img src='src/img/carousel1.jpg' style={contentStyle} />
                                </div>
                                <div>
                                    <img src='src/img/carousel2.jpg' style={contentStyle} />
                                </div>
                                <div>
                                    <img src='src/img/carousel3.jpg' style={contentStyle} />
                                </div>
                            </Carousel>
                            <Typography.Title level={4} style={{ margin: 'auto', display: 'flex', justifyContent: 'center', paddingTop: 10 }}>Место проведения CTF</Typography.Title>
                            <Flex vertical gap={5} align='flex-end' style={{ paddingTop: 10 }}>
                                <Typography.Text>Адрес: г. Астана, Проспект Мангилик Ел, 53/1</Typography.Text>
                                <Typography.Text style={{ color: 'gray' }}>(EXPO Международный выставочный центр)</Typography.Text>
                                <Typography.Text>Время проведения: 10:00 - 17:00</Typography.Text>
                                <Typography.Text strong><a href="#"><ExclamationCircleOutlined style={{ paddingRight: 5 }} />Правила</a></Typography.Text>
                            </Flex>
                        </Card>
                    </Flex>
                </Flex>

            </Card>);

    }

    return (
        <div>
            {!isPhone ?
                (<Card style={{ width: '80%', display: 'flex', margin: 'auto', height: 670, marginBottom: 20 }}>
                    <Flex gap={40}>
                        <GoogleMap
                            mapContainerStyle={{ width: 500, height: 620, borderRadius: 10 }}
                            zoom={16}
                            center={center}
                            mapTypeId='hybrid'
                        >
                        </GoogleMap>
                        <Flex vertical gap={10} style={{ width: '80%' }}>
                            <Flex>
                                <Typography.Title level={3} style={{ margin: 0, padding: 0 }}>Military CTF: Digital Fortress</Typography.Title>
                            </Flex>
                            <Card style={{ width: '95%' }}>
                                <Typography.Text><FlagOutlined style={{ color: 'red' }} /> CTF (Capture The Flag) - это соревнование в области кибербезопасности, в котором участники должны использовать свои навыки в хакинге, программировании, криптографии и анализе уязвимостей для решения различных задач с целью захвата флагов (флагов).</Typography.Text>
                                <Carousel autoplay style={{ width: 'calc(100vh * 0.7)', justifyContent: 'center', margin: 'auto', paddingTop: 20 }}>
                                    <div>
                                        <img src='src/img/carousel1.jpg' style={contentStyle} />
                                    </div>
                                    <div>
                                        <img src='src/img/carousel2.jpg' style={contentStyle} />
                                    </div>
                                    <div>
                                        <img src='src/img/carousel3.jpg' style={contentStyle} />
                                    </div>
                                </Carousel>
                                <Typography.Title level={4} style={{ margin: 'auto', display: 'flex', justifyContent: 'center', paddingTop: 10 }}>Место проведения CTF</Typography.Title>
                                <Flex vertical gap={5} align='flex-end' style={{ paddingTop: 10 }}>
                                    <Typography.Text>Адрес: г. Астана, Проспект Мангилик Ел, 53/1</Typography.Text>
                                    <Typography.Text style={{ color: 'gray' }}>(EXPO Международный выставочный центр)</Typography.Text>
                                    <Typography.Text>Время проведения: 10:00 - 17:00</Typography.Text>
                                    <Typography.Text strong><a href="#"><ExclamationCircleOutlined style={{ paddingRight: 5 }} />Правила</a></Typography.Text>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                </Card>) : (<Card style={{ width: '80%', display: 'flex', margin: 'auto', height: 1070, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Flex vertical gap={20}>
                        <Flex>
                            <Typography.Title level={4} style={{ margin: 0, padding: 0 }}>Military CTF: Digital Fortress</Typography.Title>
                        </Flex>
                        <GoogleMap
                            mapContainerStyle={{ width: 265, height: 265, borderRadius: 10, margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            zoom={16}
                            center={center}
                            mapTypeId='hybrid'
                        >
                        </GoogleMap>
                        <Card style={{ width: 265, height: 265 }}>
                            <Typography.Text><FlagOutlined style={{ color: 'red' }} /> CTF (Capture The Flag) - это соревнование в области кибербезопасности, в котором участники должны использовать свои навыки в хакинге, программировании, криптографии и анализе уязвимостей для решения различных задач с целью захвата флагов (флагов).</Typography.Text>
                        </Card>
                        <Carousel autoplay style={{ width: 250, justifyContent: 'center', margin: 'auto', paddingTop: 5 }}>
                            <div>
                                <img src='src/img/carousel1.jpg' style={contentStyle} />
                            </div>
                            <div>
                                <img src='src/img/carousel2.jpg' style={contentStyle} />
                            </div>
                            <div>
                                <img src='src/img/carousel3.jpg' style={contentStyle} />
                            </div>
                        </Carousel>
                        <Flex vertical gap={5} align='center'>
                            <Typography.Title level={4}>Место проведения CTF</Typography.Title>
                            <Typography.Text>Адрес: г. Астана, Проспект Мангилик Ел, 53/1</Typography.Text>
                            <Typography.Text style={{ color: 'gray' }}>(EXPO Международный выставочный центр)</Typography.Text>
                            <Typography.Text>Время проведения: 10:00 - 17:00</Typography.Text>
                            <Typography.Text strong><a href="#"><ExclamationCircleOutlined style={{ paddingRight: 5 }} />Правила</a></Typography.Text>
                        </Flex>
                    </Flex>
                </Card>)
            }
        </div>

        // <Card style={{ width: '80%', display: 'flex', margin: 'auto', height: 600, marginBottom: 20 }}>
        // </Card>
    );
};