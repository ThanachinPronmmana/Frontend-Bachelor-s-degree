import { Input } from "../ui/input";

const Searchbar = ({ text, onChange, type = "text", ...props }) => {
  return (
    <Input
      type={type}
      placeholder={text}
      className="max-w-md items-center"
      onChange={onChange}
      {...props}
    />
  );
};
export default Searchbar;
