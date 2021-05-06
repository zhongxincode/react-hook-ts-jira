import { useMemo } from "react";
import { useUrlQueryParam } from "../../utils/url";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  // 可以重命名，适合三个以下参数
  // return [projectCreate === "true", open, close] as const;

  // 不能命名
  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
