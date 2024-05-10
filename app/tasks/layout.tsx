'use client';

import React from 'react';
import { LaptopOutlined, NotificationOutlined , HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';

import theme from "../themeConfig";

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = [
  {
    key: '1',
    label: 'Home',
    icon: <HomeOutlined style={{ color: '#ffffff' }} />, // Icon for Home
  },
  {
    key: '2',
    label: 'User',
    icon: <UserOutlined style={{ color: '#ffffff' }}/>, // Icon for User
  },
  {
    key: '3',
    label: 'Settings',
    icon: <SettingOutlined style={{ color: '#ffffff' }} />, // Icon for Settings
  },
];

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

function TasksLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <ConfigProvider theme={theme}>
               <Layout style={{ height: '100vh' }}>
            <Header style={{ 
                position: 'sticky',
                display: 'flex', 
                alignItems: 'center',
                 
                 }}
                 className="pr-0">
                <div className="demo-logo" />
                <Menu
                    theme='dark'
                    className='justify-end flex-row items-cent'
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ 
                        flex: 1, 
                        minWidth: 0,
                        background: '#2564CF'
                    }} />

                 
                    
            </Header>
            <Layout>
                <Sider width={200} style={{ background: 'colorPrimary' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2} />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                           // minHeight: 280,
                            background: 'colorPrimary',
                           // borderRadius: borderRadiusLG
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        </ConfigProvider>
     
    );
}

export default TasksLayout;