import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

// 全局的Provider App里面的组件都能使用context
// AuthProvider 存储全局用户信息
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>
    {children}
  </AuthProvider>
};
