import Buttons from "@/components/Buttons"
import Credit from "@/components/Credit"
import { Button } from "@/components/ui/button"
import mockHouses from "@/data/mockHouses"
import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { BedSingle, Bath, Grid2x2 } from 'lucide-react';

const Deposit = () => {
  const { id } = useParams()
  const [house, setHouse] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const foundHouse = mockHouses.find((h) => h.id === id)
    setHouse(foundHouse)
    console.log("FOUND HOUSE:", foundHouse);
  }, [id])

  if (!house) return <div>Loading...</div>

  return (

    <div className="flex-row">
      <div className="pt-10 lg:px-70 py-30">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* รูปใหญ่ */}
          <div className="flex w-full ">
            {
              house.images?.[0] && (
                <img
                  src={house.images[0]}
                  alt="main-house"
                  className="rounded-3xl w-300 h-[500px] object-cover"
                />
              )}
          </div>

          {/* รูปเล็ก (ขนาดใหญ่ขึ้น) */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-[700px]">
            {house.images?.slice(1, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`sub-house-${index}`}
                className="rounded-3xl h-[243px] w-full object-cover"
              />
            ))}
          </div>
        </div>

        {/* ข้อมูลบ้าน */}
        <div className="flex flex-row flex-wrap items-center gap-2 mt-6 border-b border-gray-300 pb-4 w-[700px] space-x-5">
          <h1 className="text-2sm font-bold lg:text-2xl">{house.agent.name}</h1>
          <h1 className="text-2sm font-semibold lg:text-xl">{house.name}</h1>
          <label
            className="text-sm text-blue-400 cursor-pointer"
            onClick={() => navigate("/profile/seller")}
          >
            รายละเอียดเพิ่มเติมผู้ขาย
          </label>

          {/* ย้ายขึ้นมาไว้ใน border-b */}
          <div className="flex space-x-2 mt-2">
            <p>{house.discription}</p>
            <label className="text-blue-400 cursor-pointer text-sm m-0.5">
              สำรวจแผนที่
            </label>
          </div>

        </div>
        <div className="flex">
          <div className="flex flex-col mt-6 gap-2 border-r border-gray-300 w-[400px] h-[130px] ">
            <p className="text-xs font-bold ">เริ่มต้น</p>
            <h1 className="text-3xl font-bold">${house.price}</h1>
            <p className="text-xs font-bold mt-2">สินเชื่อที่อยู่อาศัย</p>
            <p className="text-xl">{house.agent.loan}</p>
            <div className="w-full flex justify-center mt-2">
              <Link to="/Deposit_doc" state={{house}}>
                <Buttons
                  text="มัดจำ"
                  color="bg-blue-500"
                  lenghbutton="w-50"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col">

            <div className="lg:absolute lg:mx-130 shadow-xl rounded-3xl flex-col ">
              <div className=" bg-white-500 h-50 w-100 rounded-3xl ">
                <div className="bg-[#3D4C63] h-15 w-100 rounded-t-3xl flex justify-center items-center">
                  <label className="text-white font-bold text-xl cursor-pointer" onClick={() => navigate("/profile/seller")}>{house.agent.name}</label>
                </div>
            
              </div>
            </div>
            <div className="flex flex-col items-center pl-10 h-[130px] space-x-10 gap-4 lg:flex-row">
              <div className="flex flex-col items-center">
                <BedSingle />
                <p>{house.badroom} ห้อง</p>
              </div>
              <div className="flex flex-col items-center">
                <Bath />
                <p>{house.bathroom} ห้อง</p>
              </div>
              <div className="flex flex-col items-center">
                <Grid2x2 />
                <p>{house.size} ตร. ม.</p>
              </div>
            </div>
            <div className="flex mx-10 ">
              <label className="text-xs text-blue-400 cursor-pointer lg:text-sm">ดูประเภทของแต่ละพื้นที่และราคา</label>
            </div>

          </div>
        </div>


      </div>
      <Credit />

    </div>


  );

}
export default Deposit