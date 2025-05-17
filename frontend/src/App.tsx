import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminLayout } from "./admin/Layout";
import { Tags } from "./admin/pages/Tags";
import { Categories } from "./admin/pages/Categories";
import { Events } from "./admin/pages/Events";
import { Login } from "./common/pages/Login";
import { Signup } from "./common/pages/Signup";
import { Home } from "./user/pages/Home";
import { Event } from "./user/pages/Event";
import { SuccessPage } from "./user/pages/SucessPage";
import { UserLayout } from "./user/Layout";
import { ProtectRoute } from "./common/providers/ProtectRoute";
import { RoleEnum } from "./common/enums/role.enum";
import { NotFound } from "./common/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectRoute allowedRoles={[RoleEnum.ADMIN]}>
        <AdminLayout />
      </ProtectRoute>
    ),
    children: [
      {
        path: "tags",
        element: <Tags />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "*",
        element: <Events />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectRoute allowedRoles={[RoleEnum.USER]}>
        <UserLayout />
      </ProtectRoute>
    ),
    children: [
      {
        path: "events/:id",
        element: <Event />,
      },
      {
        path: "success",
        element: <SuccessPage />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
