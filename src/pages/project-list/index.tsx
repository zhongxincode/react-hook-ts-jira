import styled from "@emotion/styled";
import { useState } from "react";
import { useProjects } from "../../utils/project";
import { useDebounce } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useUsers } from "../../utils/user";

export const ProjectList = () => {
  // 状态提升
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 200);

  const { isLoading, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
