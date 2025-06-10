import { useLocation } from "react-router";

const Payment = () => {
  const location = useLocation();
  const house = location.state?.house;

  return (
    <div className="min-h-screen bg-white-50 text-black">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Payment Form: Card list + Credit card form (แนวตั้ง) */}
        <div className="col-span-2 flex flex-col space-y-10">
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Payment method</h2>
            <div className="flex space-x-4 mb-4 border-b pb-2">
              <span className="text-green-600 font-semibold border-b-2 border-green-600">
                Credit Card
              </span>
              <span className="text-gray-400">Qr</span>
            </div>

            {/* Card list */}
            <div className="flex flex-col space-y-4 mb-6">
              <img src="/card1.png" alt="Card 1" className="w-64 rounded shadow" />
              <img src="/card2.png" alt="Card 2" className="w-64 rounded shadow" />
              <div className="w-64 h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer">
                <span className="text-xl font-bold">Add new +</span>
              </div>
            </div>
          </div>

          {/* Credit card form */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex space-x-2 items-center">
              <img src="/amex.png" className="w-8" alt="Amex" />
              <img src="/visa.png" className="w-8" alt="Visa" />
              <img src="/mastercard.png" className="w-8" alt="MasterCard" />
              <span className="text-sm text-gray-600">Pay using credit cards</span>
            </div>
            <input
              type="text"
              placeholder="Credit card"
              className="input border border-gray-300 px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Name"
              className="input border border-gray-300 px-4 py-2 rounded w-full"
            />
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Expiration"
                className="input border border-gray-300 px-4 py-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="CVV"
                className="input border border-gray-300 px-4 py-2 rounded w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <label className="text-sm">Save card</label>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded w-full">Pay</button>
          </div>
        </div>

        {/* House summary */}
        <div className="bg-white shadow p-4 rounded">
          <img
            src={house?.images?.[0] || "/house.png"}
            alt="House"
            className="rounded mb-4 w-full h-48 object-cover"
          />
          <h3 className="text-sm text-gray-500">{house?.name || "บ้านเดี่ยวแต่งหรูพร้อมเข้าอยู่"}</h3>
          <div className="text-2xl font-bold text-black">
            {house?.price ? `$${house.price.toLocaleString()}` : "N/A"}
          </div>
          <div className="text-sm text-gray-500 mt-2">Time: 11, Jan 2025, 10.00 am</div>
          <div className="text-sm">Commission: -</div>
          <div className="text-sm">Invoice: 000-1234-HOUSE-003</div>
          <div className="text-sm">Discount: -</div>
          <div className="text-sm">
            Subtotal: {house?.price ? `$${house.price.toLocaleString()}` : "N/A"}
          </div>
          <div className="text-lg font-semibold text-green-600 mt-2">
            Total: {house?.price ? `$${house.price.toLocaleString()}` : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
