import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

export const ProjectList = () => {
  // 状态提升
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 200);

  const client = useHttp();
  // 当输入框改变，setParam就设置新的param值，
  // param 一旦发生变化，useEffect就重新执行，请求list数据

  /**
   * `${apiUrl}/projects?name=${param.name}&personId=${param.personId}`
   * 当搜索框为空时，url会出现歧义：http://localhost:3001/projects?name=&personId=
   * 所以要创建一个清理对象空值的函数
   */

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
