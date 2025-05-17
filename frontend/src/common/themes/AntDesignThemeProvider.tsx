import { ConfigProvider } from "antd";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#00b96b",
        borderRadius: 2,
        fontSize: 16,
        colorBgContainer: "#f6ffed",
      },
    }}
  >
    {children}
  </ConfigProvider>
);
