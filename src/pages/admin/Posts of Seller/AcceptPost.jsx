import React from "react";

const acceptedPosts = [
  {
    id: 101,
    name: "Kanokwan Saelim",
    email: "kanokwan@email.com",
    category: "บ้านเดี่ยว",
    type: "ขาย",
  },
  {
    id: 102,
    name: "Anucha Deeprasert",
    email: "anucha@email.com",
    category: "คอนโดมิเนียม",
    type: "เช่า",
  },
];

const AcceptPost = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        รายการโพสต์ที่ได้รับการอนุมัติ
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-md">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="py-3 px-4 border-b">ID Post</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Property Type</th>
            </tr>
          </thead>
          <tbody>
            {acceptedPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-sm">{post.id}</td>
                <td className="py-3 px-4 border-b text-sm">{post.name}</td>
                <td className="py-3 px-4 border-b text-sm">{post.email}</td>
                <td className="py-3 px-4 border-b text-sm">{post.category}</td>
                <td className="py-3 px-4 border-b text-sm">{post.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceptPost;
