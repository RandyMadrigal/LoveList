// This module builds the router (not a component module), so fast-refresh's export rule does not apply
/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import HomePage from "../pages/Home/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

// Everything except the landing page loads on demand, so opening a love link
// does not download the create form (and vice versa).
const CreatePage = lazy(() => import("../pages/Create/CreatePage"));
const LovePage = lazy(() => import("../pages/Love/LovePage"));
const PrivacyPage = lazy(() => import("../pages/Privacy/PrivacyPage"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/create",
        element: (
          <Suspense fallback={null}>
            <CreatePage />
          </Suspense>
        ),
      },
      {
        path: "/love/:token",
        element: (
          <Suspense fallback={null}>
            <LovePage />
          </Suspense>
        ),
      },
      {
        path: "/privacy",
        element: (
          <Suspense fallback={null}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
