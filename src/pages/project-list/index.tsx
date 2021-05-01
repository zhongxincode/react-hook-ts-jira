import qs from "qs";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectList = () => {
  // 状态提升
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 200);

  // 当输入框改变，setParam就设置新的param值，
  // param 一旦发生变化，useEffect就重新执行，请求list数据

  /**
   * `${apiUrl}/projects?name=${param.name}&personId=${param.personId}`
   * 当搜索框为空时，url会出现歧义：http://localhost:3001/projects?name=&personId=
   * 所以要创建一个清理对象空值的函数
   */

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
