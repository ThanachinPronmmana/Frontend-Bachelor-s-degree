import React from "react";

const rejectedPosts = [
  {
    id: 1,
    name: "John Smith",
    email: "johnsmith@gmail.com",
    category: "บ้านเดี่ยว",
    type: "ขาย",
    reason: "เนื้อหามีความไม่เหมาะสม",
  },
  {
    id: 2,
    name: "Suda Tanaka",
    email: "suda.tnk@example.com",
    category: "คอนโดมิเนียม",
    type: "เช่า",
    reason: "ข้อมูลไม่ครบถ้วน",
  },
  {
    id: 3,
    name: "Thanawat Phan",
    email: "thanawat.phan@example.com",
    category: "ทาวน์เฮ้าส์",
    type: "ขาย",
    reason: "รูปภาพไม่ตรงกับรายละเอียด",
  },
];

const RejectPost = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">รายการโพสต์ที่ถูกปฏิเสธ</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-md">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="py-3 px-4 border-b">ID Post</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Property Type</th>
              <th className="py-3 px-4 border-b">Title (เหตุผลการปฏิเสธ)</th>
            </tr>
          </thead>
          <tbody>
            {rejectedPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-sm">{post.id}</td>
                <td className="py-3 px-4 border-b text-sm">{post.name}</td>
                <td className="py-3 px-4 border-b text-sm">{post.email}</td>
                <td className="py-3 px-4 border-b text-sm">{post.category}</td>
                <td className="py-3 px-4 border-b text-sm">{post.type}</td>
                <td className="py-3 px-4 border-b text-sm text-red-600 font-medium">
                  {post.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RejectPost;