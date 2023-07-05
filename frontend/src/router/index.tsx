import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/index";
import Remember from "@/pages/remember";

const router = createBrowserRouter([
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
