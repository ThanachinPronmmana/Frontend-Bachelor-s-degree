import { Breadcrumb, BreadcrumbLink } from "../ui/breadcrumb"
import { Link } from "react-router"
import { UserPen } from 'lucide-react';
const Profile = () => {
  return (
    <BreadcrumbLink href="/ProfileTypeSelector"><UserPen/></BreadcrumbLink>
  )
}
export default Profile