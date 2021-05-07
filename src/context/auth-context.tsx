import React, { ReactNode } from "react";
import { useQueryClient } from "react-query";
import * as auth from "../auth-provider";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { User } from "../pages/project-list/search-panel";
import { useMount } from "../utils";
import { http } from "../utils/http";
import { useAsync } from "../utils/use-async";
interface AuthForm {
  username: string;
  password: string;
}

// 初始化user 在页面刷新的时候 保持user的登录状态
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const queryClient = useQueryClient();

  // then(user => setUser(user))
  // point free
  // then(setUser)
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
      // 修复在嵌套路由情况登出后url不改变的状况
      window.location.href = window.location.origin;
    });

  useMount(() => {
    run(bootstrapUser());
  });

  // list页面刷新时整个界面显示loading
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  // list页面刷新时出现error返回一个全屏的error界面
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 自定义的用户认证hook，可以在全局中使用
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
