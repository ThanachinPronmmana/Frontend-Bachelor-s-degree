import Cardsim from "@/components/Cardsim";
import Credit from "@/components/Credit";
import { Button } from "@/components/ui/button";
import { AlarmCheck, AlertCircle, Circle, Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { CircleAlert } from 'lucide-react';
import { useEffect, useState } from "react";
import { CircleX } from 'lucide-react';


const Support = () => {

  const [showModal, setshowModal] = useState(false)
  const [showsubmit, setsubmit] = useState(false)
  const [report, setreport] = useState("")

  const buttonlabels = [
    "About the seller",
    "About the account",
    "About the deposit",
    "About the system",
    "About the appointment",
    "About notifications",
  ]
  useEffect(() => {

  })
  const handleButtonClick = (name) => {
    setreport(name)
    setsubmit(true)
  }
  return (
    <div className="min-h-screen ">
      {/* Banner Section */}
      <div className="relative flex flex-col">
        <img
          src="https://www.businesseventsthailand.com/uploads/event_calendar/web/200420-banner-vDsL1lmHL.jpg"
          alt="Support Banner"
          className="w-full h-64 md:h-96 lg:h-120 object-cover"
        />
        <h1 className="absolute text-white text-4xl md:text-6xl pt-32 md:pt-64 lg:pt-80 xl:pt-96 px-8 font-bold lg:pl-80">
          Contact Us
        </h1>
      </div>

      {/* Contact Information */}
      <div className="relative flex-col lg:pl-70 lg:pr-70 sm:p-0  ">
        <div className="flex flex-col gap-4 bg-white  rounded-2xl p-8 mx-5 lg:mx-20 mt-10">
          <h1 className="text-4xl font-bold text-gray-800">Thailand</h1>
          <p className="text-gray-700">
            50 ถนน งามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://www.ku.ac.th/th"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 font-bold hover:underline"
            >
              www.ku.ac.th/th
            </a>
            <a
              href="https://www.kps.ku.ac.th/v8/index.php/th/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 font-bold hover:underline"
            >
              www.kps.ku.ac.th/v8/index.php/th/
            </a>
          </div>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mx-5 lg:mx-20">
          <Cardsim
            icon={<Phone className="mb-1" />}
            text={<span className="block">telephone</span>}
            text2={<span>(+66)932305647</span>}
            className="flex flex-col items-center gap-1"
          />
          <Cardsim
            icon={<Mail className="mb-1" />}
            text={<span>Email</span>}
            text2={<span>thanachin.p@ku.th</span>}
            className="flex flex-col items-center gap-1"
          />
          <Cardsim
            icon={<CircleAlert />}
            text={
              <a>
                Report
              </a>
            }
            text2={<a
              className="text-red-500 font-bold cursor-pointer"
              onClick={() => setshowModal(true)}
            >Select a problem to report</a>
            }
          />
        </div>
      </div>
      {/* Modal list Report*/}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">

            {/* Close Button */}
            <CircleX
              className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"
              onClick={() => setshowModal(false)}
            />

            {/* Title */}
            <h2 className="font-bold text-2xl mb-2 text-center">Report</h2>
            <h2 className="mb-2 font-bold">Select a problem to report</h2>
            {/* Buttons */}
            <div className="w-full flex flex-col">
              {buttonlabels.map((label,index)=>(

                <Button
                key={label}
                className={`bg-gray-100 px-4 py-2 text-black hover:text-white hover:bg-black !rounded justify-start cursor-pointer ${
                  index !== 0 ? "border-t-2 border-gray" : ""
                }`}
                onClick={() => handleButtonClick(label)}
                >
                  {label}
                </Button>
              )) }
            </div>
          </div>
        </div>
      )}

      {/* Modal Submit */}
      {showsubmit && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">

            {/* Selected Text */}
            <div className="mb-4">
              <h1 className="font-bold text-lg mb-1">You selected:</h1>
              <p className="text-black/60 text-base">{report}</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
                onClick={() => setsubmit(false)}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}




      {/* Footer */}
      <div className="mt-10">
        <Credit />
      </div>
    </div>
  );
};

export default Support;
