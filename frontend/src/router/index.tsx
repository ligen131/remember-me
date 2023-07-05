import { createHashRouter } from "react-router-dom";
import Home from "../pages/home/index";
import Remember from "@/pages/remember";

const router = createHashRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Remember></Remember>,
      },
    ],
  },
  {
    path: "/chat",
    element: <Home></Home>,
  },
]);

export default router;
