import { useState } from "react";
import { useParams } from "react-router";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // สมมุติว่าเราส่งคำขอไปยัง backend แล้ว
    console.log("ส่งรีเซ็ตรหัสผ่านไปที่:", email);
    setSent(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">ลืมรหัสผ่าน</h1>
        {sent ? (
          <p className="text-green-600">
            ระบบได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-gray-700 mb-2">อีเมล</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="กรอกอีเมลของคุณ"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Forgotpassword;
