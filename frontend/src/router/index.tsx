import { createHashRouter } from "react-router-dom";
import Home from "../pages/home/index";
import Remember from "@/pages/remember";

const router = createHashRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/remember",
    element: <Remember></Remember>,
  },
]);

export default router;
