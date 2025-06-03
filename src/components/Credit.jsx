import { Link } from "react-router"

const Credit = () => {
    return (
        <div className="relative fjustify-center items-center ">
            <div className="flex items-center bg-[#3D4C63] h-20 border-b-2 border-white px-6 sm:px-10 lg:px-115">
                <p className="text-white">Distription</p>
            </div>
            <div className="flex bg-gray-200 h-100 w-full pl-70 pr-70 pt-5">
                <h1 className="text-black">Credit</h1>

            </div>
            <div className=" flex bg-[#3D4C63] h-20 w-full  border-t-2 border-while  justify-between pl-70 pr-70 pt-5">
                <Link to="Support">
                    <p className="text-white">Support</p>
                </Link>
                <p className="flex text-white ">© 2025 AllProperty Media Co. Ltd.</p>


            </div>

        </div>

    )
}
export default Credit