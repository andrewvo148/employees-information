'use client';

import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined , HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation'

import theme from "../themeConfig";
import Link from 'next/link';

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

const items2: MenuProps['items'] = [
  {
    key: '/tasks',
    label: 'Tổng quan',
    icon: <HomeOutlined style={{ color: '#ffffff' }} />, // Icon for Home
  },
  {
    key: '/tasks/profile',
    label: 'Hồ sơ',
    icon: <UserOutlined style={{ color: '#ffffff' }}/>, // Icon for User
  },
  {
    key: '/tasks/contract',
    label: 'Hợp đồng',
    icon: <SettingOutlined style={{ color: '#ffffff' }} />, // Icon for Settings
  },
];

function TasksLayout({
    children,
}: {
    children: React.ReactNode;
}) {

  const router = useRouter()
  const pathname = usePathname()

  const [defaultSelectedKey2, setDefaultSelectedKey2] = useState('')

  useEffect(() => {
    console.log("Current Pathname:", pathname);
    // Logic to set the default selected key based on the current pathname
    console.log("Selected Key:", pathname);
    setDefaultSelectedKey2(pathname);
  }, [pathname]);

 


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
                    defaultSelectedKeys={['']}

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
                        selectedKeys={[defaultSelectedKey2]}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2} 
                        onClick={({key}) => router.push(key)}
                        />
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