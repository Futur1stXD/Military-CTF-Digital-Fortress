import { Card, Flex, Typography } from "antd";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter"
import RulesCarousel from "./RulesCarousel";


export default function Rules({ isPhone, authenticated }) {

    return (
        <div style={{
            backgroundColor: "#121927",
        }}>
            <AppHeader isPhone={isPhone} authenticated={authenticated} />
            <Card style={{
                width: '70%',
                minHeight: "calc(100vh - 60px - 60px)",
                color: "white",
                backgroundColor: "#141D2B",
                margin: 'auto',
                border: 'green'
            }}>
                <Typography.Title style={{ paddingTop: 10, color: 'white', fontSize: '2rem' }}>Rules</Typography.Title>
                <Flex vertical gap={5} style={{ paddingTop: 10 }}>
                    <Typography.Text className=" text-white tracking-wide">1. Количество участников команды: допускается до 3 участников, но у каждого игрока должна быть учетная запись (совместное использование учетных записей запрещено).</Typography.Text>
                    <Typography.Text className="text-white tracking-wide">2. Формат флага: aitumilitaryctf{'{}'}.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">3. Честная игра: Придерживайтесь всех правил.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">4. Уважительное поведение: Поддерживайте уважение и вежливость по отношению ко всем.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">5. Не делиться: Не делитесь флагами, решениями и не размещайте их в Интернете.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">6. Динамический подсчет очков: Совместное использование флагов уменьшает количество очков; табло является динамичным.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">7. Предварительные задания: В некоторых вопросах есть один или несколько дополнительных вопросов, которые открываются только при решении предыдущих заданий.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">8. Права на дисквалификацию: Организаторы могут дисквалифицировать за нарушения правил.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">9. Никакого мошенничества: Мошенничество или получение несправедливого преимущества приводит к дисквалификации.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">10. Отсутствие вредоносных действий: Не наносите вреда инфраструктуре конкуренции или другим системам.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">11. Владение учетной записью: Каждый член команды должен иметь индивидуальную учетную запись. Совместное использование учетных записей запрещено.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">12. Коммуникативный этикет: Используйте Telegram-бота <a href="http://t.me/AITUMilitaryCTF_Bot">AITU Military CTF Bot</a> для связи с организаторами избегайте сообщений DMS/ping.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">13. С денежных призов будет взиматься 10% налога согласно законодательству РК.</Typography.Text>
                </Flex>
                </Card>

            <AppFooter isPhone={isPhone} />
        </div>
    );
}