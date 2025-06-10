import Buttons from "@/components/Buttons";
import Credit from "@/components/Credit";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";
import { useLocation } from "react-router";

const Payment = () => {
  const location = useLocation();
  const house = location.state?.house;
  const [method, setMethod] = useState("credit");

  return (
    <div className="min-h-screen bg-white-50 text-black pt-10 lg:px-70 py-10 flex justify-center items-center">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Select Payment method</h2>
            <div className="flex space-x-4">
              <span
                onClick={() => setMethod("credit")}
                className={`cursor-pointer px-2 pb-1 ${method === "credit"
                  ? "text-green-600 font-semibold border-b-2 border-green-600"
                  : "text-gray-400"
                  }`}
              >
                Credit Card
              </span>
              <span
                onClick={() => setMethod("qr")}
                className={`cursor-pointer px-2 pb-1 ${method === "qr"
                  ? "text-green-600 font-semibold border-b-2 border-green-600"
                  : "text-gray-400"
                  }`}
              >
                QR
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="flex flex-col space-y-4 mb-6">
          {method === "credit" ? (
            <>
              <div className="space-y-4">
                <img
                  className="w-[243px] object-cover rounded-2xl"
                  src="https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-gold-card-498x280.png"
                />
                <img
                  className="lg:w-[243px] object-cover rounded-2xl"
                  src="https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-gold-card-498x280.png"
                />
              </div>
              <div className="bg-gray-200 w-[220px] h-[140px] rounded-md flex items-center justify-center ml-3 cursor-pointer">
                <span>Add new +</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
              <h1 className="text-md text-gray-500">Scan QR Code to Pay</h1>
              <div className="col-span-2">
                <img
                  src="https://apiportal.kasikornbank.com/bucket/SiteCollectionDocuments/assets/page/apiproducts/qrpayment/introduction/img/ci-qrpayment-img-08.png"
                  alt="QR Code"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Form + Pay Button */}
        
          {method === "credit" && (
            <>
            <div className="flex flex-col items-start space-y-7">
              <div className="flex justify-start">
                <h1 className="text-md text-gray-500">Pay using credit cards</h1>
              </div>
              <div className="flex w-full space-x-4">
                <img
                  className="w-full h-[50px] object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
                />
                <img
                  className="w-full h-[50px] object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpZfXKfdqS4fomnL88oMzGUUZBg3BZUtqcUg&s"
                />
                <img
                  className="w-full h-[50px] object-cover"
                  src="https://www.mastercard.com/content/dam/public/mastercardcom/th/th/logos/mastercard-og-image.png"
                />
              </div>
              <div className="flex h-auto w-auto space-x-4">
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-col">
                    <label className="text-gray-500">Credit card</label>
                    <Searchbar text="credit card" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-500">Name</label>
                    <Searchbar text="name" />
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col">
                  <label className="text-gray-500">Expiration</label>
                  <Searchbar text="expiration" />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500">CVV</label>
                  <Searchbar text="cvv" />
                </div>
              </div>
            
          <div className="flex justify-between w-full">
            <div></div>
            <Buttons text="Pay" />
          </div>
          </div>
          </>
          )}
        

        {/* Summary */}
        <div className="flex">
          <div className="bg-gray-100 w-[300px] h-[460px] rounded-2xl">
            <div className="flex max-w-[300px] p-5">
              <img
                src={house.images[0]}
                className="object-cover h-[150px] w-full rounded-2xl shadow-xl"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-semibold text-xs text-black opacity-80">
                {house.name}
              </h1>
              <h1 className="font-bold text-xl text-black">{house.price}</h1>
            </div>

            <div className="flex justify-between w-full p-3 text-sm">
              <div className="flex flex-col space-y-2">
                <p className="text-black opacity-50">Time</p>
                <p className="text-black opacity-50">Commission</p>
                <p className="text-black opacity-50">Invoice</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p>11, Jan 2025, 10.00 am</p>
                <p>5%</p>
                <p>000-1234-HOUSE-003</p>
              </div>
            </div>

            <div className="border-t-1 m-1 border-black-50"></div>

            <div className="flex justify-between w-full p-3 text-sm">
              <div className="flex flex-col space-y-2">
                <p className="text-black opacity-50">Discount</p>
                <p className="text-black opacity-50">Subtotal</p>
              </div>
              <div className="flex flex-col space-y-2 items-end">
                <p>-</p>
                <p>{house.price}</p>
              </div>
            </div>

            <div className="flex flex-col border-t-1 m-1 border-black-50"></div>

            <div className="flex justify-between text-sm pl-3 pr-3">
              <div>
                <p className="text-black opacity-50">Total</p>
              </div>
              <div>
                <p>{house.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
