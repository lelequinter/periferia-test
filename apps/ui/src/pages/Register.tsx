import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export const Register = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen" >
      <Form
        name="login"
        initialValues={{ remember: true }}
        className="w-full max-w-[400px]"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Por favor ingresa tu nombre de usuario!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="nombre de usuario" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Por favor ingresa tu correo!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="correo" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor ingresa tu contraseña!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="contraseña"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="/login">Ya tengo cuenta!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
