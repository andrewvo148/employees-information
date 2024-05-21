'use client';

import React, { useEffect, useState } from 'react';
import { FileTextOutlined, HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation'

import theme from "../themeConfig";

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = [
    
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
    icon: <HomeOutlined style={{ color: '#605E5C' }} />, // Icon for Home
  },
  {
    key: '/tasks/profile',
    label: 'Hồ sơ',
    icon: <UserOutlined style={{ color: '#605E5C' }}/>, // Icon for User
  },
  {
    key: '/tasks/contract',
    label: 'Hợp đồng',
    icon: <FileTextOutlined style={{ color: '#605E5C' }} />, // Icon for Settings
  },

  {
    key: '/tasks/settings',
    label: 'Thiết lập',
    icon: <SettingOutlined style={{ color: '#605E5C' }} />, // Icon for Settings,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
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
    if ("/tasks/profile/create" === pathname) {
      setDefaultSelectedKey2("/tasks/profile") 
    } else {
      setDefaultSelectedKey2(pathname);
    }
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
                        selectedKeys={[defaultSelectedKey2]}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                        mode="vertical" 
                        onClick={({key}) => router.push(key)}
                        />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                   
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