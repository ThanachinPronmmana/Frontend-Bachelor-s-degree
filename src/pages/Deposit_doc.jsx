import { useEffect, useState } from "react";
import { Upload, FileText } from "lucide-react";
import Buttons from "@/components/Buttons";
import { useLocation, useNavigate } from "react-router";
import mockHouses from "@/data/mockHouses";

const Deposit_doc = () => {
  const [file, setFile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const house = location.state?.house;
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white space-y-6">
      <div className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
          alt="pdf-icon"
          className="w-6 h-6 mx-3"
        />
        <a
          href="https://lovethaihome.com/documents/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%88%E0%B8%B0%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%88%E0%B8%B0%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%A7%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%A1%E0%B8%B1%E0%B8%94%E0%B8%88%E0%B8%B3.pdf"
          className="text-black font-bold hover:underline text-2xl"
        >
          สัญญาจะซื้อจะขายหรือสัญญาวางเงินมัดจำ.pdf
        </a>
      </div>

      {file && (
        <div className="flex items-center space-x-2">
          <FileText />
          <a
            href={URL.createObjectURL(file)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline"
          >
            {file.name}
          </a>
        </div>
      )}

      <div className="text-center">
        <p className="text-lg font-medium">อัปโหลดเอกสารการมัดจำ</p>
        <label className="cursor-pointer">
          <div className="flex items-center justify-center bg-gray-300 text-black py-2 px-6 rounded-lg mt-2 hover:bg-gray-400 transition w-50">
            <Upload className="mr-2" />
            อัปโหลด
          </div>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="flex justify-center items-center p-10">
        <Buttons
          text="continue"
          color="bg-blue-500"
          lenghbutton="w-50"
          onClick={() => navigate("/payment", { state: { house, file } })}
        />
      </div>
    </div>
  );
};

export default Deposit_doc;
