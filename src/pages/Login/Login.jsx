import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-[#2C3E50] min-h-screen flex items-center justify-center">
      <div className="bg-white w-[900px] h-[550px] rounded-xl shadow-xl flex overflow-hidden">
        
        {/* รูปด้านซ้าย */}
        <div className="w-1/2 flex items-center justify-center bg-white">
          <img
            src="https://i.pinimg.com/736x/5b/b4/5d/5bb45dd8bf2c2ecba1bbda8c656a2018.jpg"
            alt="house"
            className="w-[95%] object-contain"
          />
        </div>

        {/* ฟอร์มด้านขวา */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <img src="/hand-icon.svg" alt="logo" className="w-12 h-12 mb-2" />
            <h1 className="text-xl font-semibold text-[#2C3E50]">Yuu Yenn Property</h1>
          </div>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-1 text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm mb-1 text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C3E50] text-white py-2 rounded-md hover:bg-[#1a252f] transition"
            >
              Sign In
            </button>

            <div className="text-right mt-2">
              <a href="#" className="text-sm text-gray-500 hover:text-[#2C3E50]" onClick={()=>navigate("/forgot")}>Forgot password?</a>
            </div>
            <Link to="/register">
            <div className="text-center mt-4 text-sm">
              Don’t have an account? <a href="#" className="text-[#2C3E50] font-medium">Sign up now</a>
            </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
