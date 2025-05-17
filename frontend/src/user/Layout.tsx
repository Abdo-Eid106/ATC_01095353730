import React from "react";
import { Layout, theme } from "antd";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const styles = {
  layout: {
    height: "100%",
    minHeight: "100vh",
  },
  header: {
    position: "sticky" as const,
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  content: (bgColor: string) => ({
    padding: "40px 100px",
    margin: 20,
    background: bgColor,
  }),
};

export const UserLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={styles.layout}>
      <Header />
      <Content style={styles.content(colorBgContainer)}>
        <Outlet />
      </Content>
    </Layout>
  );
};
