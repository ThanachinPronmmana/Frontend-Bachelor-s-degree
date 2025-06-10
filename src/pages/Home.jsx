import { useEffect, useState } from "react";
import Iconselect from "@/components/Iconselect";
import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import Buttons from "@/components/Buttons";
import Cards from "@/components/Cards";
import { Link } from "react-router";
import Credit from "@/components/Credit";
import mockHouses from "@/data/mockHouses";


const Home = () => {
  const videos = [""]; // Video list

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [imagedata, setImage] = useState(mockHouses)
  const [searchFilter,setSearch] = useState("")

  useEffect(() => {
    if (videos.length > 0) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      setSelectedVideo(videos[randomIndex]);
    }
    console.log("imagedata state:", imagedata);
  }, [videos]);

  
  const handleSearch = ()=>{
    const filtered = mockHouses.filter((house)=>
    house.name.toLowerCase().includes(searchFilter.toLowerCase())
    )
    console.log("Filtered results:", filtered);
    setImage(filtered)
  }
  return (
    <div className="w-full">
      {/* Background Video Section */}
      
      <div className="relative flex items-center justify-center h-150">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src=".\video\8302413-uhd_4096_2160_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="relative bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg w-150 max-w-4xl mx-4 sm:mx-8 lg:mx-16">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
            <Iconselect />
            <Buttons text="Advanced Search" color="bg-blue-600" />
            <Buttons text="Ai Search" color="bg-blue-600" />
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
            <Searchbar 
            value={searchFilter}
            onChange ={(e)=> setSearch(e.target.value)}
            />
            <Buttons 
            text="Search" 
            color="bg-black" 
            lenghbutton="p-7.5"
            onClick = {handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="p-4 sm:p-8 lg:p-20 mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-5">
          <h1 className="text-red-500 text-3xl mb-4 sm:mb-0">Hot</h1>
          <h1 className="text-blue-800 text-sm">Order</h1>
        </div>
        <Cards data={imagedata}  />
        <Link to="Profile" />
      </div>

      {/* Credit Section */}
      <div className="relative ">
        <Credit />
      </div>
    </div>
  );
};

export default Home;