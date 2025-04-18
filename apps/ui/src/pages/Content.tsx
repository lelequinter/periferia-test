import {
  LogoutOutlined,
  PicLeftOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useStore } from "../store";

const activeProps = { style: { fontWeight: "800", color: "white" } };

type MenuItem = Required<MenuProps>["items"][number];

const logout = () => {
  useStore.getState().removeUser();
}

const items: MenuItem[] = [
  {
    label: (
      <Link
        to="/feed"
        className="[&.active]:font-bold"
        activeProps={activeProps}
      >
        Feed
      </Link>
    ),
    key: "feed",
    icon: <PicLeftOutlined />,
  },
  {
    label: (
      <Link
        to="/profile"
        className="[&.active]:font-bold"
        activeProps={activeProps}
      >
        Perfil
      </Link>
    ),
    key: "profile",
    icon: <ProfileOutlined />,
  },
  {
    label: (
      <Link
        to="/login"
        className="[&.active]:font-bold"
        activeProps={activeProps}
        onClick={logout}
      >
        Cerrar Sesion
      </Link>
    ),
    key: "logout",
    icon: <LogoutOutlined />,
  },
];

export const Content = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const currentPath = router.state.location.pathname.replace("/", "");;

  const [current, setCurrent] = useState(currentPath);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const breadcrumbItems = [
    {
      title: 'Home',
    },
    {
      title: currentPath,
    },
  ]

  return (
    <Layout>
      <Header className="flex items-center justify-center">
        <span className="text-white text-2xl font-bold">Periferia Conecta</span>
        <Menu
          onClick={onClick}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["feed"]}
          selectedKeys={[current]}
          items={items}
          style={{ flex: 1, minWidth: 0, justifyContent: "flex-end" }}
        />
      </Header>
      <Layout.Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Layout.Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Leyder Quintero
      </Footer>
    </Layout>
  );
};
