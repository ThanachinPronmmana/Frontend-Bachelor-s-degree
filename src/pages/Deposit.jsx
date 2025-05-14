import { useParams } from "react-router"

const Deposit = () => {
const {id} = useParams()
  return (
    <div>
        <h1>Discription:{id}</h1>
    </div>
  )
}
export default Deposit