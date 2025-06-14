import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Iconselect from "@/components/Iconselect";
import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import Buttons from "@/components/Buttons";
import Cards from "@/components/Cards";
import { Link } from "react-router-dom";
import Credit from "@/components/Credit";
import { FaBalanceScale, FaMoneyBillWave } from "react-icons/fa";
import LoanCalculator from "@/components/LoanCalculator";

const Home = () => {
  const [showLoanPopup, setShowLoanPopup] = useState(false);

  const [imagedata, setImage] = useState([
    {
      id: "1",
      name: "บ้านแฝดสี่แยกหยีเต้ง",
      src: "https://i.pinimg.com/736x/ad/c1/05/adc1053a8f53b7101041aff38a57d771.jpg",
    },
    {
      id: "2",
      name: "ติดทะเลแหลมพรหมเทพ",
      src: "https://i.pinimg.com/736x/9d/a7/f7/9da7f72034e52e4cbd185b062162bb86.jpg",
    },
    {
      id: "3",
      name: "โครงการใหม่ ถนนเจ้าฟ้า",
      src: "https://i.pinimg.com/736x/bd/a5/6e/bda56e412149db260399fce56f84abf4.jpg",
    },
    {
      id: "4",
      name: "บ้านใจกลางเมือง",
      src: "https://i.pinimg.com/736x/80/18/39/801839e4d8e1f0ee61d2ae17606da29b.jpg",
    },
    {
      id: "5",
      name: "รีโนเวททั้งหลังถนนดีบุก",
      src: "https://i.pinimg.com/736x/83/8b/99/838b99a234249130d238a7e8d3e3a574.jpg",
    },
    {
      id: "6",
      name: "คอนโด ราคานักศึกษา",
      src: "https://i.pinimg.com/736x/a3/6a/d0/a36ad0b449d9f97b3029a7126e5b3880.jpg",
    },
    {
      id: "7",
      name: "คอนโด ติดแม่นํ้า",
      src: "https://i.pinimg.com/736x/63/dd/b1/63ddb1c1102d88eed5527e733fb3678d.jpg",
    },
    {
      id: "8",
      name: "คอนโด ตกแต่งภายใน",
      src: "https://i.pinimg.com/736x/13/81/2c/13812c2012d17b4a377e8714c013cca9.jpg",
    },
    {
      id: "9",
      name: "ที่ดิน ติดถนน",
      src: "https://i.pinimg.com/736x/19/e8/1d/19e81d4002bc4aebe1424672fa1ff46e.jpg",
    },
    {
      id: "10",
      name: "ที่ดิน",
      src: "https://i.pinimg.com/736x/2a/1a/88/2a1a8829545a6ab1c0789c3b78be1ae9.jpg",
    },
  ]);

  const handleImage = () => {
    const newData = imagedata.filter((c) => c.id);
    setImage(newData);
  };

  return (
    <div className="relative">
      {/* หน้า Home */}
      <div className="relative flex items-center justify-center h-150">
        <div className="relative bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg w-full max-w-155">
          <div className="flex pl-3 pb-3 space-x-3">
            <Iconselect />
            <div className="flex justify-end w-full h-full">
            <Buttons text="Ai Search" color="bg-blue-600" />
            </div>
          </div>

          <div className="flex space-x-4">
            <Searchbar />
            <Buttons text="Search" color="bg-black" lenghbutton="p-7.5" />
          </div>
        </div>
      </div>

      <div className="p-20 ml-50 mr-50">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-red-500 text-3xl">Hot</h1>
          <h1 className="text-blue-800 text-sm pt-5">Other</h1>
        </div>
        <Cards data={imagedata} onImageClick={handleImage} />
      </div>

      <Credit />

      {/* ปุ่มกดเปิด Loan Calculator */}
      <button
        onClick={() => setShowLoanPopup((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-white border shadow-lg rounded-full p-4 hover:bg-blue-50 transition z-40"
      >
        <FaMoneyBillWave size={24} className="text-green-600" />
      </button>

      {/* Popup LoanCalculator + Animation */}
      <AnimatePresence>
        {showLoanPopup && (
          <motion.div
            key="loan-popup"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 z-50 bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-xl"
          >
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-4xl"
              onClick={() => setShowLoanPopup(false)}
            >
              ×
            </button>
            <LoanCalculator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
