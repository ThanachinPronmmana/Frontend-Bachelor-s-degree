import { Breadcrumb, BreadcrumbLink } from "../ui/breadcrumb"
import { Link } from "react-router"
import { HeartPlus } from 'lucide-react'
const Support_Buyer = () => {
  return (

    <BreadcrumbLink href="/buyer/support">
      <div className="flex justify-center items-center space-x-2">
        <HeartPlus />
        <p className="text-gray-500 hover:text-black opacity-100">Support</p>
      </div>

    </BreadcrumbLink>
  )
}
export default Support_Buyer