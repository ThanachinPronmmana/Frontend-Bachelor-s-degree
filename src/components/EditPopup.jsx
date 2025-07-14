import { X } from "lucide-react";

const EditPopup = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] md:w-[800px] relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Edit post</h2>

        {/* ฟอร์มแก้ไขแบบย่อ */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label>Status:</label>
            <input defaultValue={post.status} className="input" />
          </div>
          <div>
            <label>Address:</label>
            <input defaultValue={post.address} className="input" />
          </div>
          <div>
            <label>Phone:</label>
            <input defaultValue={post.phone} className="input" />
          </div>
          <div>
            <label>Deposit:</label>
            <input defaultValue={post.deposit} className="input" />
          </div>
          <div>
            <label>Description:</label>
            <input defaultValue={post.description} className="input" />
          </div>
          <div>
            <label>Email:</label>
            <input defaultValue={post.email} className="input" />
          </div>
        </div>

        {/* ปุ่ม Edit */}
        <div className="text-right mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
