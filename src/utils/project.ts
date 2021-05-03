import { useEffect } from "react";
import { Project } from "../pages/project-list/list";
import { cleanObject } from ".";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

/**
 * 将projects的数据请求用 useHttp 和 useAsync 合并
 * @param param 
 * @returns 
 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
