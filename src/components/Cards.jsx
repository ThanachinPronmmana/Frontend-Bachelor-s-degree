import { Link } from "react-router-dom";  // แก้ไขตรงนี้

const Cards = ({ data, onImageClick }) => {
  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 item">
      {data.map((item) => (
        <Link to={`/Deposit/${item.id}`} key={item.id}> {/* เพิ่ม / หน้า Deposit */}
          <div
            className="overflow-hidden cursor-pointer relative rounded-xl"
            onClick={() => onImageClick(item.id)}
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-50 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center ">
              <p className="text-black text-lg font-semibold">{item.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
