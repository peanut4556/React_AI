import { createBrowserRouter } from "react-router-dom";
import WorkflowBuilder from "../views/Workflow/WorkflowBuilder.jsx"; // ✅ 路径按你实际文件夹改

// 单独的路由配置文件
const router = createBrowserRouter([
  {
    path: "/",
    element: <WorkflowBuilder />,
  },
]);

export default router;
