import React from "react";

const mockPosts = [
  {
    title: "ขายบ้านเดี่ยว 2 ชั้น ย่านรามอินทรา",
    propertyType: "บ้านเดี่ยว",
    province: "กรุงเทพมหานคร",
    price: "3500000",
    housePhotos: [
      "https://source.unsplash.com/featured/?house,modern1",
    ],
  },
  {
    title: "คอนโดใกล้ BTS อ่อนนุช",
    propertyType: "คอนโดมิเนียม",
    province: "กรุงเทพมหานคร",
    price: "2500000",
    housePhotos: [
      "https://source.unsplash.com/featured/?condo,city",
    ],
  },
  {
    title: "ที่ดินเปล่าแปลงใหญ่ จังหวัดเชียงใหม่",
    propertyType: "ที่ดิน",
    province: "เชียงใหม่",
    price: "5000000",
    housePhotos: [
      "https://source.unsplash.com/featured/?land,nature",
    ],
  },
  {
    title: "ขายบ้านพร้อมที่ดิน จังหวัดขอนแก่น",
    propertyType: "บ้านพร้อมที่ดิน",
    province: "ขอนแก่น",
    price: "4200000",
    housePhotos: [
      "https://source.unsplash.com/featured/?house,village",
    ],
  },
  {
    title: "ทาวน์เฮาส์ 2 ชั้น ทำเลดีนนทบุรี",
    propertyType: "ทาวน์เฮาส์",
    province: "นนทบุรี",
    price: "1900000",
    housePhotos: [
      "https://source.unsplash.com/featured/?townhouse,street",
    ],
  },
];

const SellerPost = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* Search and Filter Controls */}
      <div className="flex items-center justify-between mb-6 space-x-4">
        <input
          type="text"
          placeholder="ค้นหาโพสต์..."
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#34495E]"
        />
        <button
          type="button"
          className="border border-[#34495E] text-[#34495E] px-4 py-2 rounded-md font-medium hover:bg-[#34495E] hover:text-white transition"
        >
          Filter
        </button>
      </div>

      {mockPosts.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีรายการโพสต์</p>
      ) : (
        <div className="space-y-6">
          {mockPosts.map((post, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border border-gray-300 p-4 rounded-xl shadow-sm relative"
            >
              {post.housePhotos?.[0] && (
                <img
                  src={post.housePhotos[0]}
                  alt="House"
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
              )}

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600 mt-1">{post.propertyType}</p>
                <p className="text-gray-600">{post.province}</p>
                <p className="text-green-600 font-bold mt-1 text-lg">
                  {Number(post.price).toLocaleString()} บาท
                </p>
              </div>

              <button
                onClick={() => alert(`แก้ไข: ${post.title}`)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 border-2 border-[#34495E] text-[#34495E] px-4 py-1 rounded-md font-medium hover:bg-[#34495E] hover:text-white transition"
              >
                แก้ไข
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerPost;
