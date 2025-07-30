import { Navigate, Outlet } from "react-router"
const RequireSeller = () => {
    const id = localStorage.getItem("id")
    if (!id) {
        return <Navigate to="/login" replace />
    }
    else {
        return <Outlet />
    }
}
export default RequireSeller