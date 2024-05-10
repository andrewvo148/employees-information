'use client';

import React, { useState } from 'react';
import { Segmented, Table, Tabs } from 'antd';
import type { TableColumnsType, TableProps, TabsProps } from 'antd';
import { Col, Divider, Row } from 'antd';

import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    { key: '1', label: 'Tab 1', children: 'Content of Tab Pane 1' },
    { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2' },
    { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' },
];

type Align = 'start' | 'center' | 'end';



function ProfileCreatePage() {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    return (
        <>
            <Divider orientation="left">Percentage columns</Divider>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                <Row>
                    <Col flex="auto">
                        <Card title="Card title" bordered={false}>
                            <Checkbox
                                checked={componentDisabled}
                                onChange={(e) => setComponentDisabled(e.target.checked)}
                            >
                                Form disabled
                            </Checkbox>
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                disabled={componentDisabled}
                                style={{ maxWidth: 600 }}
                            >
                                <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
                                    <Checkbox>Checkbox</Checkbox>
                                </Form.Item>
                                <Form.Item label="Radio">
                                    <Radio.Group>
                                        <Radio value="apple"> Apple </Radio>
                                        <Radio value="pear"> Pear </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label="Input">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Select">
                                    <Select>
                                        <Select.Option value="demo">Demo</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="TreeSelect">
                                    <TreeSelect
                                        treeData={[
                                            { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label="Cascader">
                                    <Cascader
                                        options={[
                                            {
                                                value: 'zhejiang',
                                                label: 'Zhejiang',
                                                children: [
                                                    {
                                                        value: 'hangzhou',
                                                        label: 'Hangzhou',
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label="DatePicker">
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item label="RangePicker">
                                    <RangePicker />
                                </Form.Item>
                                <Form.Item label="InputNumber">
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item label="TextArea">
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Form.Item label="Switch" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                                    <Upload action="/upload.do" listType="picture-card">
                                        <button style={{ border: 0, background: 'none' }} type="button">
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="Button">
                                    <Button>Button</Button>
                                </Form.Item>
                                <Form.Item label="Slider">
                                    <Slider />
                                </Form.Item>
                                <Form.Item label="ColorPicker">
                                    <ColorPicker />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col flex="auto">

                        <Card>
                            <Segmented
                                defaultValue="center"
                                style={{ marginBottom: 8 }}
                                options={['start', 'center', 'end']}
                            />
                        </Card>



                    </Col>
                </Row>
            </div>


        </>
    )
};

export default ProfileCreatePage;