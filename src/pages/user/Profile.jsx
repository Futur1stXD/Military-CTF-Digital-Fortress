import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons'; // Import Ant Design icons
import AppHeader from "../main/components/layout/AppHeader";
import AppFooter from "../main/components/layout/AppFooter";
import { Button, Flex } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const Profile = ({ authenticated, token }) => {
    const [imageSrc, setImageSrc] = useState("setImageSrc");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [telegramNick, setTelegramNick] = useState("");
    const [success_attempts, setSuccessAttempts] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [isChanged, setIsChanged] = useState(false);

    const getProfile = async () => {
        try {
            const response = await fetch('http://localhost:8080/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }

            const data = await response.json();
            setName(data.firstname);
            setSurname(data.lastname);
            setNickname(data.nickname);
            setEmail(data.email);
            setPhone(data.phoneNumber);
            setTelegramNick(data.telegramNick)
            if (data.attempts === 0) {
                setAttempts(1e-10)
            } else {
                setAttempts(data.attempts)
            }
            if (data.success_attempts) {
                setSuccessAttempts(1e-10)
            } else {
            setSuccessAttempts(data.success_attemtps)
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        const storedImageSrc = localStorage.getItem('imageSrc');
        if (storedImageSrc) {
            setImageSrc(storedImageSrc);
        }
        if (token !== "") {
            getProfile();
        }
    }, []);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                localStorage.setItem('imageSrc', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        console.log("Image submitted");
    };

    const handleDelete = () => {
        setImageSrc("");
        localStorage.removeItem('imageSrc');
    };

    const chartData = {
        labels: ["Success", "Attempts"],
        datasets: [
            {
                label: '',
                data: [success_attempts, attempts],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
            },
        ],
    }
    

    return (
        <section style={{ backgroundColor: "#121927" }}>
            <AppHeader authenticated={authenticated} />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '80%',
                minHeight: "calc(100vh - 80px - 60px)",
                color: "white",
                backgroundColor: "#141D2B",
                margin: "auto",
                border: 'green'
            }}>

                <div style={{ flex: '1', marginRight: '2rem' }}>
                    <div>
                        <div className="">
                            {/* {imageSrc && (
                                <div className="relative mt-6 ml-6 flex justify-center">
                                    <img className="w-24 h-24 rounded-full ml-4 cursor-pointer" src={imageSrc} alt="" onClick={handleDelete} />
                                    <DeleteOutlined className="" onClick={handleDelete} />
                                </div>
                            )}
                            {!imageSrc && (
                                <label htmlFor="file_input" className="cursor-pointer flex justify-center">
                                    <UploadOutlined className="w-24 h-24 rounded-full ml-28  mt-5" />
                                    <input type="file" id="file_input" className="hidden" onChange={handleFileInputChange} />
                                </label>
                            )} */}
                            <div className="relative mt-6 ml-6 flex justify-center gap-4">
                                <UserOutlined />
                            </div>
                    
                                <p className='ml-6 mb-10 flex justify-center'>{nickname}</p>
                                <div className="max-w-3xl sm:px-6 flex flex-wrap ">
                                    <div className="w-full md:w-5/6 p-4 mb-4 md:mb-0">
                                        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profile Tab</h3>
                                            <div className="mb-4 grid grid-rows-2">
                                                <label htmlFor="name">Name:</label>
                                                <input type="text" id="name" className="p-1" defaultValue={name} disabled />
                                            </div>
                                            <div className="mb-4 grid grid-rows-2">
                                                <label htmlFor="name">Surname:</label>
                                                <input type="text" id="name" className="p-1" defaultValue={surname} disabled />
                                            </div>
                                            <div className="mb-4 grid grid-rows-2">
                                                <div className='flex'>
                                                    <label htmlFor="telegram">Telegram:</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 text-gray-800 dark:text-white" viewBox="0 0 48 48">
                                                    </svg>
                                                </div>
                                                <input type="text" id="telegram" className="p-1" defaultValue={telegramNick} disabled />
                                            </div>
                                            <div className="mb-4 grid grid-rows-2">
                                                <label htmlFor="nickname">Nickname:</label>
                                                <input type="text" id="nickname" className="p-1" defaultValue={nickname} disabled />
                                            </div>
                                            <div className="mb-4 grid grid-rows-2">
                                                <div className='flex'>
                                                    <label htmlFor="email">Email:</label>
                                                    <svg class="w-5 h-5 ml-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                                    </svg>
                                                </div>
                                                <input type="email" id="email" className="p-1" defaultValue={email} disabled />
                                            </div>
                                            <div className="mb-4 grid grid-rows-2">
                                                <label htmlFor="phone">Phone:</label>
                                                <input type="tel" id="phone" className="p-1" defaultValue={phone} disabled />
                                            </div>
                                            <Button type={isChanged ? 'primary' : 'dashed'} style={{ opacity: isChanged ? 1 : 0.5 }} disabled={isChanged}>Изменить</Button>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/6 bg-inherit p-4 mb-4 md:mb-0">
                                        <div className='w-full md:w-96 h-96 mb-4 md:mb-0 mt-10 md:ml-20 ml-12'>
                                            <Pie data={chartData} />
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            <AppFooter />
        </section>
    );
};

export default Profile;