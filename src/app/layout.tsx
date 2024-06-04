"use client";

import React, { useEffect, useState } from "react";
import {
  FileTextOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ConfigProvider, MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";

import theme from "./themeConfig";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import viVN from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';

const { Header, Content, Sider } = Layout;

const headerItems: MenuProps["items"] = [
  {
    key: "3",
    label: "Cài đặt",
    icon: <SettingOutlined style={{ color: "#ffffff" }} />,
  },
];

const siderItems: MenuProps["items"] = [
  {
    key: "/overview",
    label: "Tổng quan",
    icon: <HomeOutlined style={{ color: "#869ab8" }} />,
  },
  {
    key: "/employee",
    label: "Hồ sơ",
    icon: <UserOutlined style={{ color: "#869ab8" }} />,
  },
  {
    key: "/contract",
    label: "Hợp đồng",
    icon: <FileTextOutlined style={{ color: "#869ab8" }} />,
  },

  {
    key: "settings",
    label: "Thiết lập",
    icon: <SettingOutlined style={{ color: "#869ab8" }} />, // Icon for Settings,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      { key: "11", label: "Option 11" },
      { key: "12", label: "Option 12" },
    ],
  },
];

function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [defaultSelectedKey2, setDefaultSelectedKey2] = useState("");

  useEffect(() => {
    console.log("Current Pathname:", pathname);
    // Logic to set the default selected key based on the current pathname
    console.log("Selected Key:", pathname);
    if ("/tasks/profile/create" === pathname) {
      setDefaultSelectedKey2("/tasks/profile");
    } else {
      setDefaultSelectedKey2(pathname);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme} locale={viVN}>
            <Layout style={{ height: "100vh" }}>
              <Header
                style={{
                  position: "sticky",
                  display: "flex",
                  alignItems: "center",
                }}
                className="pr-0"
              >
                <div className="demo-logo" />
                <Menu
                  theme="dark"
                  className="justify-end flex-row items-center"
                  mode="horizontal"
                  defaultSelectedKeys={[""]}
                  items={headerItems}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    background: "#FFFFFF",
                  }}
                />
              </Header>
              <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                width={200} style={{ paddingTop: "12px" }}>
                  
                  <Menu
                    selectedKeys={[defaultSelectedKey2]}
                    style={{ 
                      height: "100%", 
                      borderRight: 0,
                      background: '#031434',
                      margin: "0 10px",
                      fontWeight: 500,
                   }}
                    items={siderItems}
                    mode="vertical"
                    onClick={({ key }) => router.push(key)}
                  />
                </Sider>
                <Layout style={{ padding: "0 24px 24px" }}>
                  <Content
                    style={{
                      padding: 24,
                      margin: 0,
                      // minHeight: 280,
                     // background: "colorPrimary",
                      // borderRadius: borderRadiusLG
                    }}
                  >
                    {children}
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
