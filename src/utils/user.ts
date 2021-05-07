import { useEffect } from "react";
import { cleanObject } from ".";
import { User } from "../types/user";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

/**
 * 将users的数据请求用 useHttp 和 useAsync 合并
 * @param param 
 * @returns 
 */
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
}