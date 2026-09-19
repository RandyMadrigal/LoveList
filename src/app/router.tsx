import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import HomePage from "../pages/Home/HomePage";
import CreatePage from "../pages/Create/CreatePage";
import LovePage from "../pages/Love/LovePage";
import PrivacyPage from "../pages/Privacy/PrivacyPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/create", element: <CreatePage /> },
      { path: "/love/:token", element: <LovePage /> },
      { path: "/privacy", element: <PrivacyPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
