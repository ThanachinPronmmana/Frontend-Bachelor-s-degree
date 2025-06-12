import { Link } from "react-router-dom"
import { BreadcrumbLink } from "../ui/breadcrumb"
import { StickyNote } from 'lucide-react';
const Post_for_sale = () => {
  return (
    <BreadcrumbLink href="/post-for-sale/title">
      <StickyNote/>
    </BreadcrumbLink>
  )
}
export default Post_for_sale