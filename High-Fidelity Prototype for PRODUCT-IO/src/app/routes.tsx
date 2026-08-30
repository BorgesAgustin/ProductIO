import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import ProductionNew from "./pages/ProductionNew";
import ProductionClose from "./pages/ProductionClose";
import Supplies from "./pages/Supplies";
import Costing from "./pages/Costing";
import Traceability from "./pages/Traceability";
import TraceabilityDetail from "./pages/TraceabilityDetail";
import Quality from "./pages/Quality";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "production",
        Component: Production,
      },
      {
        path: "production/new",
        Component: ProductionNew,
      },
      {
        path: "production/close/:id",
        Component: ProductionClose,
      },
      {
        path: "supplies",
        Component: Supplies,
      },
      {
        path: "costing",
        Component: Costing,
      },
      {
        path: "traceability",
        Component: Traceability,
      },
      {
        path: "traceability/:id",
        Component: TraceabilityDetail,
      },
      {
        path: "quality",
        Component: Quality,
      },
      {
        path: "maintenance",
        Component: Maintenance,
      },
      {
        path: "reports",
        Component: Reports,
      },
      {
        path: "admin",
        Component: Admin,
      },
    ],
  },
]);
