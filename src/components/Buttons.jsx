import { Button } from "./ui/button"

const Buttons = ({text,color,lenghbutton}) => {
  return (
    <Button className={`${lenghbutton} py-2 shadow-md text-white ${color}`}>{text}</Button>
  )
}
export default Buttons