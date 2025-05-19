import Cardsim from "@/components/Cardsim";
import Credit from "@/components/Credit";
import { Circle, Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { CircleAlert } from 'lucide-react';
const Support = () => {
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
          Contact
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
            text2={<a href=''>Select a problem to report</a>}
          />
        </div>

      </div>
      {/* Footer */}
      <div className="mt-10">
        <Credit />
      </div>
    </div>
  );
};

export default Support;
