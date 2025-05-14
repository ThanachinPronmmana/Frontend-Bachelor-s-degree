import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BreadcrumbLink } from "./ui/breadcrumb";
import { Link } from "react-router";
const Cards = ({ data, onImageClick }) => {
  return (

    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 item">
      
      {data.map((item) => (
        <Link to={`Deposit/${item.name}`} key={item.id}>
        <Card
          key={item.id}
          className="overflow-hidden cursor-pointer relative rounded-xl"
          onClick={() => onImageClick(item.id)}
        >
            <img src={item.src} alt={item.name} className="w-full h-50 object-cover" />
            
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center ">
            <p className="text-black text-lg font-semibold">{item.name}</p>
          </div>
        </Card>
        </Link>
      ))}
    </div>
    
  );
};

export default Cards;
