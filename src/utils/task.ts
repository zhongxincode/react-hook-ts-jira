import { useQuery } from "react-query";
import { Task } from "../types/task";
import { useHttp } from "./http";

export const useTask = (param?: Partial<Task>) => {
  const client = useHttp();

  // ['projects', param] 里面的内容一旦发生变化，函数就会自动触发
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
