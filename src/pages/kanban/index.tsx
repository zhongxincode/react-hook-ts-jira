import styled from "@emotion/styled";
import { Spin } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";
import { ScreenContainer } from "../../components/lib";
import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import { useTasks } from "../../utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";

export const Kanban = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
            <ColumnContainer>
              {kanbans?.map((kanban, index) => (
                <Drag
                  key={kanban.id}
                  draggableId={"kanban" + kanban.id}
                  index={index}
                >
                  <KanbanColumn kanban={kanban} key={kanban.id} />
                </Drag>
              ))}
              <CreateKanban />
            </ColumnContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const ColumnContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  flex: 1;

  /* 最下面的滚动条 */
  ::-webkit-scrollbar {
    /* width: 0; Remove scrollbar space */
    display: none;
    //Optional: just make scrollbar invisible
    /* background: transparent; */
  }
`;
