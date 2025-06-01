const mockHouses = [
    { id: "1", 
      name: "บ้านแฝดสี่แยกหยีเต้ง", 
      discription:"พูลผล,เมืองเก่า,ภูเก็ต",
      src: "https://i.pinimg.com/736x/ad/c1/05/adc1053a8f53b7101041aff38a57d771.jpg",
      price:"17,537,500",
      badroom:3,
      bathroom:2,
      size:"177-262",
      images:[
        "https://i.pinimg.com/736x/ad/c1/05/adc1053a8f53b7101041aff38a57d771.jpg",
        "https://i.pinimg.com/736x/ea/41/f6/ea41f6f127b1d49c5832d9d4f6acf713.jpg",
        "https://i.pinimg.com/736x/28/a0/24/28a0247fe814c830291874c25a7ed324.jpg",
        "https://i.pinimg.com/736x/a4/9e/3d/a49e3d3bc63a7db375b1a138df32a7e5.jpg",
        "https://i.pinimg.com/736x/be/3b/17/be3b17441c12ac6b49a1d55227fcc2e3.jpg"
      ],
      agent:{
        name:"John smit",
        avatar:"https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
        line:"jhon_sale_house",
        lineLink:"",
        fbLink:"",
        loan:"20%"
      }
    },
     { id: "2", 
      name: "ติดทะเลแหลมพรหมเทพ", 
      discription:"แหลมพรหมเทพ,ภูเก็ต",
      src: "https://i.pinimg.com/736x/9d/a7/f7/9da7f72034e52e4cbd185b062162bb86.jpg",
      price:"20,000,000",
      badroom:5,
      bathroom:3,
      size:"200-300",
      images:[
        "https://i.pinimg.com/736x/9d/a7/f7/9da7f72034e52e4cbd185b062162bb86.jpg",
        "https://i.pinimg.com/736x/ea/41/f6/ea41f6f127b1d49c5832d9d4f6acf713.jpg",
        "https://i.pinimg.com/736x/28/a0/24/28a0247fe814c830291874c25a7ed324.jpg",
        "https://i.pinimg.com/736x/a4/9e/3d/a49e3d3bc63a7db375b1a138df32a7e5.jpg",
        "https://i.pinimg.com/736x/be/3b/17/be3b17441c12ac6b49a1d55227fcc2e3.jpg"
      ],
      agent:{
        name:"Brian Moser",
        avatar:"https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
        line:"jhon_sale_house",
        lineLink:"",
        fbLink:"",
        loan:"30%"
      }
    },
    { id: "3", 
      name: "โครงการใหม่ ถนนเจ้าฟ้า", 
      discription:"ถนนเจ้าฟ้าตะวันออก,วิชิต,ภูเก็ต",
      src: "https://i.pinimg.com/736x/bd/a5/6e/bda56e412149db260399fce56f84abf4.jpg",
      price:"3,900,000",
      badroom:2,
      bathroom:3,
      size:"150-200",
      images:[
        "https://i.pinimg.com/736x/bd/a5/6e/bda56e412149db260399fce56f84abf4.jpg",
        "https://i.pinimg.com/736x/ea/41/f6/ea41f6f127b1d49c5832d9d4f6acf713.jpg",
        "https://i.pinimg.com/736x/28/a0/24/28a0247fe814c830291874c25a7ed324.jpg",
        "https://i.pinimg.com/736x/a4/9e/3d/a49e3d3bc63a7db375b1a138df32a7e5.jpg",
        "https://i.pinimg.com/736x/be/3b/17/be3b17441c12ac6b49a1d55227fcc2e3.jpg"
      ],
      agent:{
        name:"Dexter Morgan",
        avatar:"https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
        line:"jhon_sale_house",
        lineLink:"",
        fbLink:"",
        loan:"25%"
      }
    },
    { id: "4", name: "บ้านใจกลางเมือง", src: "https://i.pinimg.com/736x/80/18/39/801839e4d8e1f0ee61d2ae17606da29b.jpg" },
    { id: "5", name: "รีโนเวททั้งหลังถนนดีบุก", src: "https://i.pinimg.com/736x/83/8b/99/838b99a234249130d238a7e8d3e3a574.jpg" },
    { id: "6", name: "คอนโด ราคานักศึกษา", src: "https://i.pinimg.com/736x/a3/6a/d0/a36ad0b449d9f97b3029a7126e5b3880.jpg" },
    { id: "7", name: "คอนโด ติดแม่นํ้า", src: "https://i.pinimg.com/736x/63/dd/b1/63ddb1c1102d88eed5527e733fb3678d.jpg" },
    { id: "8", name: "คอนโด ตกแต่งภายใน", src: "https://i.pinimg.com/736x/13/81/2c/13812c2012d17b4a377e8714c013cca9.jpg" },
    { id: "9", name: "ที่ดิน ติดถนน", src: "https://i.pinimg.com/736x/19/e8/1d/19e81d4002bc4aebe1424672fa1ff46e.jpg" },
    { id: "10", name: "ที่ดิน", src: "https://i.pinimg.com/736x/2a/1a/88/2a1a8829545a6ab1c0789c3b78be1ae9.jpg" },
]
export default mockHouses