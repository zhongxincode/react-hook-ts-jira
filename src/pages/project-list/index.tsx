import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { Row, ButtonNoPadding, ErrorBox } from "../../components/lib";
import { Profiler } from "../../components/profiler";

// 状态提升

// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

export const ProjectList = () => {
  const [param, setParam] = useProjectsSearchParams();

  const { isLoading, data: list, error } = useProjects(useDebounce(param, 200));

  const { data: users } = useUsers();

  const { open } = useProjectModal();

  useDocumentTitle("项目列表", false);

  return (
    <Profiler id={"项目列表"}>
      <Container>
        <Row between={true}>
          <h1>项目列表</h1>
          <ButtonNoPadding type={"link"} onClick={open}>
            创建项目
          </ButtonNoPadding>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List users={users || []} dataSource={list || []} loading={isLoading} />
      </Container>
    </Profiler>
  );
};

ProjectList.whyDidYouRender = false;

const Container = styled.div`
  width: 100%;
  padding: 3.2rem;
`;
