import { Link } from "react-router"

const Credit = () => {
    return (
        <div className="relative fjustify-center items-center">
            <div className="flex bg-[#3D4C63] h-20 w-full border-b-2 border-while pt-5">
                <p1 className="text-white pl-70 pr-70">Distription</p1>
            </div>
            <div className="flex bg-gray-200 h-100 w-full pl-70 pr-70 pt-5">
                <h1 className="text-black">Credit</h1>

            </div>
            <div className=" flex bg-[#3D4C63] h-20 w-full  border-t-2 border-while  justify-between pl-70 pr-70 pt-5">
                <Link to="Support">
                    <p1 className="text-white">Support</p1>
                </Link>
                <p1 className="flex text-white ">© 2025 AllProperty Media Co. Ltd.</p1>


            </div>

        </div>

    )
}
export default Credit