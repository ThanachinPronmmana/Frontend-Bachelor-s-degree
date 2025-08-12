import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "@/assets/Yuuyen.jpg";

const Logo = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserType(user.userType);
    }
  }, []);

  const handleClick = () => {
    if (userType === "Buyer") {
      navigate("/buyer");
    } else if (userType === "Seller") {
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
