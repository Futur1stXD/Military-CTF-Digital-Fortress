import { Layout, Divider } from "antd";
import ContentTimer from '../ContentTimer'
import KeyEvents from "../KeyEvents";
import TaskExamples from "../TaskExamples";
import Prizes from "../Prizes";
import OrgCarousel from "../OrgCarousel";
import EventInfo from "../EventInfo";

const contentStyle = {
  minHeight: "calc(100vh - 60px - 60px)",
  color: "white",
  backgroundColor: "#141D2B",
  textColor: "white",
};

export default function AppContent({isPhone}) {
  return (
    <Layout.Content style={contentStyle}>
      <div className="content-flag-container">
        <img src="src/img/ctf-flag.gif" alt="CTF Flag" className="content-img" />
        <ContentTimer isPhone={isPhone} />
      </div>
      <Divider style={{ backgroundColor: 'white', minWidth: '80%', width: '80%', display: 'flex', justifyContent: 'center', marginLeft: '10%' }} />
      <EventInfo isPhone={isPhone} />
      <KeyEvents />
      <TaskExamples isPhone={isPhone} />
      <Prizes />
      <OrgCarousel />
    </Layout.Content>
  );
}
