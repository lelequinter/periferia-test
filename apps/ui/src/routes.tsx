import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Loading } from "./components/Loading";
import { Login } from "./pages/Login";
import App from "./App";
import { Register } from "./pages/Register";
import { Content } from "./pages/Content";
import { Feed } from "./pages/Feed";
import { Profile } from "./pages/Profile";
import { authGuard } from "./guards/authGuard";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundPage/>,
});

const appRoute = createRoute({
  beforeLoad: ({ location }) => {
    authGuard(location.pathname);
  },
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

const registerRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/register",
  component: Register,
});

const contentRoute = createRoute({
  getParentRoute: () => appRoute,
  id: "app",
  component: () => <Content />,
  pendingComponent: Loading,
  notFoundComponent: () => <NotFoundPage />
});

const feedRoute = createRoute({
  getParentRoute: () => contentRoute,
  path: "/feed",
  component: () => <Feed />,
});

const profileRoute = createRoute({
  getParentRoute: () => contentRoute,
  path: "/profile",
  component: () => <Profile />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: "/feed",
      replace: true,
    });
  },
});

const routeTree = rootRoute.addChildren([
  appRoute,
  loginRoute,
  registerRoute,
  contentRoute,
  feedRoute,
  profileRoute,
  indexRoute
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