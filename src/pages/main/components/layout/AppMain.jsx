import { Layout } from "antd";

import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";

export default function AppMain({isPhone, authorized}) {
  return (
    <Layout>
      <AppHeader isPhone={isPhone} authorized={authorized} />
      <Layout>
        <AppContent isPhone={isPhone} />
      </Layout>
      <Layout>
        <AppFooter />
      </Layout>
    </Layout>
  );
}