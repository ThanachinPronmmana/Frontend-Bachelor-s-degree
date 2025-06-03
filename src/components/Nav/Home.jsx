import { Breadcrumb } from "../ui/breadcrumb"
import { Link } from "react-router"
const Home = () => {
  return (
    <Breadcrumb >
        <Link to="/">Home</Link>
    </Breadcrumb>
  )
}
export default Home