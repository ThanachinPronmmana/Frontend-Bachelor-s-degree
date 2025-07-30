import { Button } from "./ui/button";

const Buttons = ({ text, color, lenghbutton, onClick }) => {
  return (
    <Button
      className={`${lenghbutton} py-2 shadow-md text-white ${color} cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
export default Buttons;
