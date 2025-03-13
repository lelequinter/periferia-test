import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Loading } from "./components/Loading";
import { Login } from "./pages/Login";
import App from "./App";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundPage/>,
});

const appRoute = createRoute({
  // beforeLoad: async ({ location }) => {
  //   await authGuard(location.pathname);
  // },
  getParentRoute: () => rootRoute,
  id: "app",
  component: () => <App />,
  pendingComponent: Loading,
});

const loginRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/login",
  component: Login,
});

const routeTree = rootRoute.addChildren([
  appRoute,
  loginRoute
]);

//* Router principal de la aplicacion se provee en al RouterProvider en main.tsx
export const router = createRouter({
  routeTree,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}