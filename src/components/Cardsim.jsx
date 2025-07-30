import { Card } from "./ui/card";
const Cardsim = ({ text, icon, text2 }) => {
  return (
    <div>
      <Card className="flex lg:px-10 lg:py-3 bg-[#F3F3F3] shadow-accent">
        {icon}
        {text}
        {text2}
      </Card>
    </div>
  );
};
export default Cardsim;
