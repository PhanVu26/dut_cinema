import AdminPage from "../pages/admin/AdminPage";

const routes = [
  {
    path: "/admin",
    exact: false,
    main: () => <AdminPage />,
  }
]
export default routes