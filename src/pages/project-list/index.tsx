import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useUsers } from "../../utils/user";
import { useProjectsSearchParams } from "./util";
import { Row } from "../../components/lib";

// 状态提升

// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

export const ProjectList = (props: {projectButton: JSX.Element}) => {
  const [param, setParam] = useProjectsSearchParams();

  const { isLoading, retry, data: list } = useProjects(useDebounce(param, 200));

  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
        refresh={retry}
        {...props}
      />
    </Container>
  );
};

ProjectList.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
