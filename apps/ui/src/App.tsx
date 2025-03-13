import { CSSProperties } from "react";
import { Layout } from "antd";
import { Outlet } from "@tanstack/react-router";

const layoutConfigStyle: CSSProperties = {
  height: "100%",
  overflow: "auto",
};

function App() {

  return (
    <Layout style={layoutConfigStyle}>
      <Outlet />
    </Layout>
  );
}

export default App;
