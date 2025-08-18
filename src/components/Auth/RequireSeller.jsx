import { Navigate, Outlet, replace } from "react-router"
const RequireSeller = () => {
    const id = localStorage.getItem("id")
    const usertype = localStorage.getItem("usertype")
    if (!id) {
        return <Navigate to="/login" replace />
    }
    if (usertype === "Buyer") {
        return <Navigate to="/buyer" replace />
    }
    if (usertype !== "Seller") {
        return <Navigate to="/login" replace />
    }
    return <Outlet />

}
export default RequireSeller
