import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button, Form, Input, notification } from "antd";
import Title from "antd/es/typography/Title";
import { LoginRepository } from "../repositories/loginRepository";
import { extractErrorsFromResponse } from "../utils/extractErrorsFromResponse";
import { useStore } from "../store";
import { NotificationErrorList } from "../components/NotificationErrorList";

const loginRepo = new LoginRepository();

export const Login = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values: any) => {
    loginUser(values.email, values.password);
  };

  const openErrorNotification = (error: any) => {
    const errorMessages = extractErrorsFromResponse(error);

    api['error']({
      message: 'Error al iniciar sesión',
      description: <NotificationErrorList errorList={errorMessages} /> ,
    });
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await loginRepo.login(email, password);
      useStore.getState().setUser(response.user);
      localStorage.setItem("token", response.user.token);
      navigate({ to: "/feed" });
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
        initialValues={{ email: '', password: '' }}
        className="w-full max-w-[400px]"
        onFinish={onFinish}
      >
        <Title level={3}>Iniciar sesión</Title>
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
            Inicar Sesión
          </Button>
          or <Link to="/register">Registrate ahora!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
