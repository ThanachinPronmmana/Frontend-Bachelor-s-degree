import { Input } from "./ui/input"

const Searchbar = ({text,onChange}) => {
  return (
    <Input
    type="text"
    placeholder={text}
    className="max-w-md items-center"
    onChange = {onChange}
    />
  )
}
export default Searchbar