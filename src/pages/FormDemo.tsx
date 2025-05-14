import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { generateAndOpenPdf } from '../utils/pdfUtils';

const FormDemo: React.FC = () => {
    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);

    const onFinish = (values: any) => {
        setSubmitted(true);
        generateAndOpenPdf(values);
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto' }}>
            <h2>Demo Form</h2>
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{
                name: 'John Doe',
                email: 'john.doe@example.com',
                message: 'This is a test message.'
            }}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}> 
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}> 
                    <Input />
                </Form.Item>
                <Form.Item label="Message" name="message"> 
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            {submitted && <div style={{ color: 'green', marginTop: 16 }}>Form submitted! PDF generated.</div>}
        </div>
    );
};

export default FormDemo; 