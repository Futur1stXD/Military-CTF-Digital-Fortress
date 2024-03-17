import { Layout } from "antd";

import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";

export default function AppMain({isPhone}) {
  return (
    <Layout>
      <AppHeader isPhone={isPhone} />
      <Layout>
        <AppContent isPhone={isPhone} />
      </Layout>
      <Layout>
        <AppFooter />
      </Layout>
    </Layout>
  );
}