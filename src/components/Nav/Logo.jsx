import { useNavigate } from "react-router";
import logo from "@/assets/Yuuyen.jpg";
import { useAuth } from "@/context/AuthContext";

const Logo = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth(); // เอา user จาก context

  const handleClick = () => {
    if (authUser?.userType === "Buyer") {
      navigate("/buyer");
    } else if (authUser?.userType === "Seller") {
      navigate("/seller");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition duration-200"
    >
      <img
        src={logo}
        alt="YUUYEN Logo"
        className="w-12 h-12 rounded-full object-cover border shadow-sm"
      />
    </div>
  );
};

export default Logo;
