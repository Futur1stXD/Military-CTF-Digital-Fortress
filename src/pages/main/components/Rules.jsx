import { Card, Flex, Typography } from "antd";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter"
import RulesCarousel from "./RulesCarousel";


export default function Rules({ isPhone, authorized }) {

    return (
        <div style={{
            backgroundColor: "#121927",
        }}>
            <AppHeader isPhone={isPhone} authorized={authorized} />
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
                    <Typography.Text className=" text-white tracking-wide">1. Team Size: up to 3 team members allowed, but every player must have an account (No Account Sharing).</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">2. Flag Format: Use aitumilitaryctf{} unless specified otherwise.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">3. Fair Play: Adhere to all rules and maintain sportsmanship.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">4. Respectful Behavior: Maintain respect and courtesy towards all.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">5. No Sharing: Do not share flags, solutions, or post them online.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">6. Dynamic Scoring: Sharing flags reduces points; score board is dynamic.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">7. Pre-requisite Challenges: Some questions have a one or more follow up questions which only get unlocked on solving the preceeding challenges.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">8. Disqualification Rights: Organizers may disqualify for rule violations.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">9. No Cheating: Cheating or gaining unfair advantage leads to disqualification.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">10. No Malicious Activity: Do not harm competition infrastructure or other systems.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">11. Account Ownership: Each team member is required to have an individual account. Sharing accounts is forbidden.</Typography.Text>
                    <Typography.Text className=" text-white tracking-wide">12. Communication Etiquette: Use Telegram bot <a href="http://t.me/AITUMilitaryCTF_Bot">AITU Military CTF Bot</a> for communication with organizers, avoid unsocilited DMs/pings.</Typography.Text>

                </Flex>
                <RulesCarousel isPhone={isPhone} authorized={authorized} />
                </Card>

            <AppFooter isPhone={isPhone} />
        </div>
    );
}