import { useState } from "react";
import PostCard from "@/components/PostCard";
import EditPopup from "@/components/EditPopup"; // ✅ ต้องสร้างไฟล์นี้ด้วย

const Approval = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "John Smit",
      email: "johnsmit_55@gmail.com",
      phone: "098-761-9884",
      status: "บัญชี ไม่ได้รับการยืนยัน",
      description: "บ้านเดี่ยวหลังสุดหรู",
      address: "ชลบุรี, เมืองชลบุรี",
      price: "$17,537,500",
      bedrooms: 3,
      bathrooms: 2,
      area: "177 - 262 ตร.ม.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    // เพิ่มโพสต์อื่น ๆ ได้
  ]);

  const [editingPost, setEditingPost] = useState(null);

  const handleAccept = (id) => {
    alert(`Accepted post ID: ${id}`);
    // TODO: call API หรือ update state
  };

  const handleReject = (id) => {
    alert(`Rejected post ID: ${id}`);
    // TODO: call API หรือ update state
  };

  const handleEdit = (post) => {
    setEditingPost(post); // เปิด popup
  };

  const handleSave = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    setEditingPost(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-2xl font-bold mb-4">โพสต์ที่รอการอนุมัติ</div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onAccept={handleAccept}
          onReject={handleReject}
          onEdit={handleEdit}
        />
      ))}

      {editingPost && (
        <EditPopup post={editingPost} onClose={() => setEditingPost(null)} onSave={handleSave} />
      )}
    </div>
  );
};

export default Approval;
