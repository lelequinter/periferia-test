import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Button, Form, Input } from "antd";
import api from "../utils/httpClient";
import Title from "antd/es/typography/Title";

const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/users/login", { email, password });
    localStorage.setItem("token", response.data.token); // Guardar el token
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const Login = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    loginUser(values.email, values.password);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen" >
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
