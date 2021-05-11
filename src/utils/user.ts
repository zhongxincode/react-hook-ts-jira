import { useQuery } from "react-query";
import { User } from "../types/user";
import { useHttp } from "./http";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  // ['projects', param] 里面的内容一旦发生变化，函数就会自动触发
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};