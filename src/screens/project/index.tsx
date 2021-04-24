import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectsScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        {/*projects/:projectId/kanban*/}
        <Route path={"/kanban"} element={<KanbanScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path={"/epic"} element={<EpicScreen />} />
        <Navigate to={window.location.pathname + "/kanban"} replace={true} />
      </Routes>
    </div>
  );
};
