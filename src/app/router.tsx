import { createBrowserRouter } from "react-router-dom";

import CenteredLayout from "../layouts/CenteredLayout";
import PageLayout from "../layouts/PageLayout";

import HomePage from "../pages/Home/HomePage";
import CreatePage from "../pages/Create/CreatePage";
import LovePage from "../pages/Love/LovePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <CenteredLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
    ],
  },
  {
    element: <PageLayout />,
    children: [
      {
        path: "/love/:slug",
        element: <LovePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
