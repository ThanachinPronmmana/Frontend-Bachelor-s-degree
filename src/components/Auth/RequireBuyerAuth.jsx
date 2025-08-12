import { Navigate, Outlet } from "react-router";

const RequireBuyerAuth = () => {
  const id = localStorage.getItem("id");

  if (!id) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};
export default RequireBuyerAuth;
