import { Heart, Maximize2 } from "lucide-react";

const PostCard = ({ post, onAccept, onReject, onEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4">
      {/* Left Info */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${post.name}`}
            alt="avatar"
            className="w-12 h-12 rounded-full border"
          />
          <div>
            <div className="font-semibold text-lg">{post.name}</div>
            {post.status && (
              <div className="text-sm text-red-600 font-medium">
                {post.status}
              </div>
            )}
          </div>
        </div>

        {/* Detail Row */}
        {post.description && (
          <div className="mt-3 space-y-1 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Description:</span>{" "}
              {post.description}
            </div>
            <div>
              <span className="font-semibold">Price:</span> {post.price}
            </div>
            <div>
              <span className="font-semibold">Address:</span> {post.address}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {post.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {post.phone}
            </div>
            <div>
              <span className="font-semibold">🛏 {post.bedrooms} ห้องนอน</span>{" "}
              | 🛁 {post.bathrooms} ห้องน้ำ | 📐 {post.area}
            </div>
          </div>
        )}
      </div>

      {/* Right Image & Actions */}
      <div className="flex flex-col md:w-80 gap-2">
        <div className="relative">
          <img
            src={post.image}
            alt="house"
            className="w-full h-48 object-cover rounded-md"
          />
          <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded">
            For sale
          </span>
          <div className="absolute top-2 right-2 flex gap-2">
            <Heart className="text-white cursor-pointer hover:text-red-500" />
            <Maximize2 className="text-white cursor-pointer hover:text-blue-300" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2 justify-end">
          <button
            onClick={() => onAccept(post.id)}
            className="px-4 py-1 rounded bg-green-400 hover:bg-green-500 text-white font-medium"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(post.id)}
            className="px-4 py-1 rounded bg-red-400 hover:bg-red-500 text-white font-medium"
          >
            Reject
          </button>
          <button
            onClick={() => onEdit(post)}
            className="px-4 py-1 rounded bg-orange-400 hover:bg-orange-500 text-white font-medium"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
