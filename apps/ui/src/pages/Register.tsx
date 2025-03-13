import { IdcardOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Button, Form, Input, notification } from "antd";
import Title from "antd/es/typography/Title";
import { RegisterRepository, RegisterResponseI } from "../repositories/registerRepository";
import { extractErrorsFromResponse } from "../utils/extractErrorsFromResponse";
import { NotificationErrorList } from "../components/NotificationErrorList";
const registerRepo = new RegisterRepository();

export const Register = () => {

  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    registerUser(values.name, values.email, values.password);
  };

  const openSuccesssNotification = (response: RegisterResponseI) => {

    api['success']({
      message: 'Cuenta creada!',
      description: response.message ,
    });
  };

  const openErrorNotification = (error: any) => {
    const errorMessages = extractErrorsFromResponse(error);

    api['error']({
      message: 'Error al iniciar sesión',
      description: <NotificationErrorList errorList={errorMessages} /> ,
    });
  };

  const registerUser = async (name: string, email: string, password: string) => {
      try {
        const response = await registerRepo.register(name, email, password);
        openSuccesssNotification(response);
      } catch (e) {
        const error = e as Error;
        openErrorNotification(error)
        throw error;
      }
    };

  return (
    <div className="flex justify-center items-center w-full h-screen" >
      {contextHolder}
      <Form
        name="login"
        initialValues={{ name: '', email: '', password: '' }}
        className="w-full max-w-[400px]"
        onFinish={onFinish}
      >
        <Title level={3}>Registarme</Title>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Por favor ingresa tu nombre de usuario!" }]}
        >
          <Input prefix={<IdcardOutlined />} placeholder="nombre de usuario" />
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
            Registrarme
          </Button>
          or <Link to="/login"> Ya tengo cuenta!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
