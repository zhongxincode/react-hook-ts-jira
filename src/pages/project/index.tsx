import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { Kanban } from "../kanban";
import { Epic } from "../epic";

export const Project = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        {/*projects/:projectId/kanban*/}
        <Route path={"/kanban"} element={<Kanban />} />
        {/*projects/:projectId/epic*/}
        <Route path={"/epic"} element={<Epic />} />
        <Navigate to={window.location.pathname + "/kanban"} replace={true} />
      </Routes>
    </div>
  );
};
