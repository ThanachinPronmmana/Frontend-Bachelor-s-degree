import { useEffect, useState } from "react";
import Iconselect from "@/components/Iconselect";
import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import Buttons from "@/components/Buttons";
import Cards from "@/components/Cards";
import { Link } from "react-router";
import Credit from "@/components/Credit";

const Home = () => {
  const videos = [""]; // Video list

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [imagedata, setImage] = useState([
    {
  id: "1",
  name: "บ้านแฝดสี่แยกหยีเต้ง",
  images: [
    "https://i.pinimg.com/736x/ad/c1/05/adc1053a8f53b7101041aff38a57d771.jpg",
    "https://i.pinimg.com/736x/cd/5a/ed/cd5aed469f75ce36e3b16883b7dd1086.jpg",
    "https://i.pinimg.com/736x/43/63/4e/43634efabe45e404ef093fa18428b5f6.jpg",
    "https://i.pinimg.com/736x/a7/8e/b4/a78eb409f6f7d46a4b4fd06bda352f84.jpg",
    "https://i.pinimg.com/736x/56/f9/6a/56f96a079bb391e22ef0b8a161e9aeb2.jpg"
  ],
  price: 3200000,
  bedroom: 3,
  bathroom: 2,
  area: "180 sq m"
},
{
  id: "2",
  name: "ติดทะเลแหลมพรหมเทพ",
  images: [
    "https://i.pinimg.com/736x/9d/a7/f7/9da7f72034e52e4cbd185b062162bb86.jpg",
    "https://i.pinimg.com/736x/42/e3/c0/42e3c0c122e3d116d0701bcfdb110eb6.jpg",
    "https://i.pinimg.com/736x/03/49/e2/0349e2e6c8a9055e07085d68a781d6bc.jpg",
    "https://i.pinimg.com/736x/3b/b0/41/3bb041d17760f3b13bcd4e439dd2b8e5.jpg",
    "https://i.pinimg.com/736x/12/af/7f/12af7f6d1b4862680a1ce56d22578b4e.jpg"
  ],
  price: 7500000,
  bedroom: 4,
  bathroom: 3,
  area: "250 sq m"
},
{
  id: "3",
  name: "โครงการใหม่ ถนนเจ้าฟ้า",
  images: [
    "https://i.pinimg.com/736x/bd/a5/6e/bda56e412149db260399fce56f84abf4.jpg",
    "https://i.pinimg.com/736x/b8/9b/ba/b89bba6219e1781aa65dc24b3ff8fe2e.jpg",
    "https://i.pinimg.com/736x/55/59/52/55595210fd57c8ffcc0c9c13bd627445.jpg",
    "https://i.pinimg.com/736x/84/40/52/84405230bb99acdbb62182a2b240a0d0.jpg",
    "https://i.pinimg.com/736x/11/bf/4e/11bf4e5e89184866e9ff146d78d01a30.jpg"
  ],
  price: 4600000,
  bedroom: 3,
  bathroom: 2,
  area: "190 sq m"
},
{
  id: "4",
  name: "บ้านใจกลางเมือง",
  images: [
    "https://i.pinimg.com/736x/80/18/39/801839e4d8e1f0ee61d2ae17606da29b.jpg",
    "https://i.pinimg.com/736x/56/f9/6a/56f96a079bb391e22ef0b8a161e9aeb2.jpg",
    "https://i.pinimg.com/736x/77/df/18/77df188c233dd7f08427dcb313e04cd4.jpg",
    "https://i.pinimg.com/736x/5b/d1/b4/5bd1b4d74fcf202a749b8266358fcf41.jpg",
    "https://i.pinimg.com/736x/f3/9d/10/f39d108c4478b430f6d157b6d4d87cf1.jpg"
  ],
  price: 5800000,
  bedroom: 3,
  bathroom: 3,
  area: "210 sq m"
},
{
  id: "5",
  name: "รีโนเวททั้งหลังถนนดีบุก",
  images: [
    "https://i.pinimg.com/736x/83/8b/99/838b99a234249130d238a7e8d3e3a574.jpg",
    "https://i.pinimg.com/736x/98/88/4a/98884a777772c6fa92c75e541f75c0b5.jpg",
    "https://i.pinimg.com/736x/37/e1/b3/37e1b35095f9b4e35ec9828281f4157c.jpg",
    "https://i.pinimg.com/736x/ce/3f/98/ce3f985473b1cfe42dc8f1f6a6fc7f56.jpg",
    "https://i.pinimg.com/736x/e1/9d/64/e19d645d67e3695d4522c32d15f8e0b2.jpg"
  ],
  price: 3900000,
  bedroom: 2,
  bathroom: 2,
  area: "160 sq m"
},
{
  id: "6",
  name: "คอนโด ราคานักศึกษา",
  images: [
    "https://i.pinimg.com/736x/a3/6a/d0/a36ad0b449d9f97b3029a7126e5b3880.jpg",
    "https://i.pinimg.com/736x/4f/9e/6c/4f9e6c0a7313cf9fdb6e10a308f4f6a5.jpg",
    "https://i.pinimg.com/736x/7d/c9/e3/7dc9e3ebfdc0d2125b38ec1d82a9b4a7.jpg",
    "https://i.pinimg.com/736x/00/ae/3d/00ae3d20ce7dc80766e6eaf28d2f657e.jpg",
    "https://i.pinimg.com/736x/c8/61/e7/c861e791496af71c5ce11be79fd1c98b.jpg"
  ],
  price: 1500000,
  bedroom: 1,
  bathroom: 1,
  area: "35 sq m"
},
{
  id: "7",
  name: "คอนโด ติดแม่นํ้า",
  images: [
    "https://i.pinimg.com/736x/63/dd/b1/63ddb1c1102d88eed5527e733fb3678d.jpg",
    "https://i.pinimg.com/736x/b5/d8/0c/b5d80cd12b1278c30e3d2ed1de0e33db.jpg",
    "https://i.pinimg.com/736x/26/3a/e6/263ae64a186f15a3ffad0ab6507ec59c.jpg",
    "https://i.pinimg.com/736x/95/fc/12/95fc129a5c87250e8a91c39935f7126c.jpg",
    "https://i.pinimg.com/736x/f4/3e/1f/f43e1f77c4b9097c17d21eb70d409364.jpg"
  ],
  price: 2100000,
  bedroom: 1,
  bathroom: 1,
  area: "45 sq m"
},


  ]);

  useEffect(() => {
    if (videos.length > 0) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      setSelectedVideo(videos[randomIndex]);
    }
  }, [videos]);

  const handleImage = () => {
    const newData = imagedata.filter((c) => c.id);
    setImage(newData);
  };

  return (
    <div className="w-full">
      {/* Background Video Section */}
      <div className="relative flex items-center justify-center h-150">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={selectedVideo}
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
            <Searchbar />
            <Buttons text="Search" color="bg-black" lenghbutton="p-7.5" />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="p-4 sm:p-8 lg:p-20 mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-5">
          <h1 className="text-red-500 text-3xl mb-4 sm:mb-0">Hot</h1>
          <h1 className="text-blue-800 text-sm">Order</h1>
        </div>
        <Cards data={imagedata} onImageClick={handleImage} />
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
