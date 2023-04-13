import { useRoutes } from "react-router-dom";
// import ErrorBoundary from "../components/RouteErrorBoundary";
import ErrorBoundary from "../components/ErrorBoundary";

import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Platforms from "../pages/Platforms";
import Products from "../pages/Products";
import Users from "../pages/Users";
import ProtectedRoute from "./ProtectedRoute";
export function Router() {
  const router = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Main />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },

        {
          path: "/users",
          element: <Users />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/products",
          element: <Products />,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/platforms",
          element: <Platforms />,
          errorElement: <ErrorBoundary />,
        },

        {
          errorElement: <ErrorBoundary />,

          path: "/categories",
          element: <Categories />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return router;
}
