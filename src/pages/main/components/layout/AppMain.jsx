import { Layout } from "antd";

import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";

export default function AppMain() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppContent />
      </Layout>
      <Layout>
        <AppFooter />
      </Layout>
    </Layout>
  );
}