import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  // ['projects', param] 里面的内容一旦发生变化，函数就会自动触发
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
