import { useStore } from "../store";
import { redirect } from "@tanstack/react-router";

export function authGuard(pathname: string) {
  const user = useStore.getState().user;

  if (user && pathname.includes("login")) {
    throw redirect({
      to: "/",
    });
  }

  if ((!user && pathname.includes("login")) || (!user && pathname.includes("register"))) {
    return;
  }

  if (!user) {
    throw redirect({
      to: "/login",
    });
  }
}
