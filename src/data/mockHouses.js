const mockHouses = [
  {
    id: "1",
    name: "บ้านแฝดสี่แยกหยีเต้ง",
    discription: "พูลผล,เมืองเก่า,ภูเก็ต",
    src: "https://i.pinimg.com/736x/ad/c1/05/adc1053a8f53b7101041aff38a57d771.jpg",
    price: "17,537,500",
    badroom: 3,
    bathroom: 2,
    size: "177-262",
    images: [
      "https://i.pinimg.com/736x/ad/c1/05/adc1053a8f53b7101041aff38a57d771.jpg",
      "https://i.pinimg.com/736x/ea/41/f6/ea41f6f127b1d49c5832d9d4f6acf713.jpg",
      "https://i.pinimg.com/736x/28/a0/24/28a0247fe814c830291874c25a7ed324.jpg",
      "https://i.pinimg.com/736x/a4/9e/3d/a49e3d3bc63a7db375b1a138df32a7e5.jpg",
      "https://i.pinimg.com/736x/be/3b/17/be3b17441c12ac6b49a1d55227fcc2e3.jpg"
    ],
    agent: {
      name: "John smit",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: "20%"
    }
  },
  {
    id: "2",
    name: "ติดทะเลแหลมพรหมเทพ",
    discription: "แหลมพรหมเทพ,ภูเก็ต",
    src: "https://i.pinimg.com/736x/9d/a7/f7/9da7f72034e52e4cbd185b062162bb86.jpg",
    price: "20,000,000",
    badroom: 5,
    bathroom: 3,
    size: "200-300",
    images: [
      "https://i.pinimg.com/736x/9d/a7/f7/9da7f72034e52e4cbd185b062162bb86.jpg",
      "https://i.pinimg.com/736x/1d/82/95/1d829587e11c43eb9dea01d8b0f19ae7.jpg",
      "https://i.pinimg.com/736x/54/33/b3/5433b38440e1553d045af018aa246380.jpg",
      "https://i.pinimg.com/736x/35/a1/50/35a15040713bb3d397e25e700ddf3e60.jpg",
      "https://i.pinimg.com/736x/67/dc/4b/67dc4b9e3ee1295aef1e943fa7d11509.jpg"
    ],
    agent: {
      name: "Brian Moser",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: "30%"
    }
  },
  {
    id: "3",
    name: "โครงการใหม่ ถนนเจ้าฟ้า",
    discription: "ถนนเจ้าฟ้าตะวันออก,วิชิต,ภูเก็ต",
    src: "https://i.pinimg.com/736x/bd/a5/6e/bda56e412149db260399fce56f84abf4.jpg",
    price: "3,900,000",
    badroom: 2,
    bathroom: 3,
    size: "150-200",
    images: [
      "https://i.pinimg.com/736x/bd/a5/6e/bda56e412149db260399fce56f84abf4.jpg",
      "https://i.pinimg.com/736x/ff/33/80/ff3380a120c24c264a7f89abac6c18dd.jpg",
      "https://i.pinimg.com/736x/28/a0/24/28a0247fe814c830291874c25a7ed324.jpg",
      "https://i.pinimg.com/736x/93/52/8a/93528a316f080f11267dd05488a9ae90.jpg",
      "https://i.pinimg.com/736x/8c/c0/a9/8cc0a9a54048ead1b2fae1338fc586b6.jpg"
    ],
    agent: {
      name: "Dexter Morgan",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: "25%"
    }
  },
  {
    id: "4",
    name: "บ้านใจกลางเมือง",
    discription: "ถนนถลาง,ภูเก็ต",
    src: "https://i.pinimg.com/736x/80/18/39/801839e4d8e1f0ee61d2ae17606da29b.jpg",
    price: "10,900,000",
    badroom: 2,
    bathroom: 2,
    size: "138-220",
    images: [
      "https://i.pinimg.com/736x/80/18/39/801839e4d8e1f0ee61d2ae17606da29b.jpg",
      "https://i.pinimg.com/736x/c6/2f/97/c62f9712f89c47b4d907accdd712e2f6.jpg",
      "https://i.pinimg.com/736x/04/fe/49/04fe49bc84bca85bb35d1e8ff9da2f10.jpg",
      "https://i.pinimg.com/736x/1d/dd/a2/1ddda26ef587dcb3fede4f9a342e1966.jpg",
      "https://i.pinimg.com/736x/0c/eb/84/0ceb84645690ba134b36ad24c5ab578d.jpg"
    ],
    agent: {
      name: "Joe Goldberg",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: "10%"
    }
  },
  {
    id: "5",
    name: "รีโนเวททั้งหลังถนนดีบุก",
    discription: "ถนนดีบุก,ภูเก็ต",
    src: "https://i.pinimg.com/736x/83/8b/99/838b99a234249130d238a7e8d3e3a574.jpg",
    price: "4,900,000",
    badroom: 2,
    bathroom: 1,
    size: "100-132",
    images: [
      "https://i.pinimg.com/736x/83/8b/99/838b99a234249130d238a7e8d3e3a574.jpg",
      "https://i.pinimg.com/736x/08/70/17/08701760abfb5e8bd392280bc0dfc1d0.jpg",
      "https://i.pinimg.com/736x/dd/5b/78/dd5b7832534d5e6b3fa63c44df935617.jpg",
      "https://i.pinimg.com/736x/68/84/5d/68845d6f9fb65996c0ce4f17c5c34142.jpg",
      "https://i.pinimg.com/736x/81/77/ed/8177ed23625375df49555a352af6b596.jpg"
    ],
    agent: {
      name: "Miguel Prado",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: "10%"
    }
  },
  {
    id: "6",
    name: "คอนโด ราคานักศึกษา",
    discription: "ป่าตอง,ภูเก็ต",
    src: "https://i.pinimg.com/736x/a3/6a/d0/a36ad0b449d9f97b3029a7126e5b3880.jpg",
    price: "2,490,000",
    badroom: 1,
    bathroom: 1,
    size: "60-100",
    images: [
      "https://i.pinimg.com/736x/a3/6a/d0/a36ad0b449d9f97b3029a7126e5b3880.jpg",
      "https://i.pinimg.com/736x/b1/c9/2a/b1c92ada55672e7f29c93f8ee1d14328.jpg",
      "https://i.pinimg.com/736x/d8/f8/bc/d8f8bc6ae918803d042783547fa592e7.jpg",
      "https://i.pinimg.com/736x/93/4a/65/934a65fa91a67cb02ee4e78ead3e4149.jpg",
      "https://i.pinimg.com/736x/b3/b2/86/b3b286ca45ed4ea81f401135608e3688.jpg"
    ],
    agent: {
      name: "Travis Marshall",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: "15%"
    }
  },
  {
    id: "7",
    name: "คอนโด ติดแม่นํ้า",
    discription: "ในหาน,ภูเก็ต",
    src: "https://i.pinimg.com/736x/63/dd/b1/63ddb1c1102d88eed5527e733fb3678d.jpg",
    price: "3,390,000",
    badroom: 2,
    bathroom: 1,
    size: "60-100",
    images: [
      "https://i.pinimg.com/736x/63/dd/b1/63ddb1c1102d88eed5527e733fb3678d.jpg",
      "https://i.pinimg.com/736x/3b/6c/02/3b6c020aa406e4ee32ecf7c1040289f9.jpg",
      "https://i.pinimg.com/736x/6f/52/4f/6f524fd73e2c75c46a67593bbcebfa34.jpg",
      "https://i.pinimg.com/736x/93/4a/65/934a65fa91a67cb02ee4e78ead3e4149.jpg",
      "https://i.pinimg.com/736x/df/29/92/df2992b5c563df27b85cb68c57b26b42.jpg"
    ],
    agent: {
      name: "Thanachin",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: "15%"
    }
  },
  {
    id: "8",
    name: "คอนโด ตกแต่งภายใน",
    discription: "เกาะแก้ว,ภูเก็ต",
    src: "https://i.pinimg.com/736x/13/81/2c/13812c2012d17b4a377e8714c013cca9.jpg",
    price: "4,990,000",
    badroom: 2,
    bathroom: 1,
    size: "130-150",
    images: [
      "https://i.pinimg.com/736x/13/81/2c/13812c2012d17b4a377e8714c013cca9.jpg",
      "https://i.pinimg.com/736x/06/2b/7c/062b7c24648f15aa9df2401bc7c6fb11.jpg",
      "https://i.pinimg.com/736x/d9/3d/98/d93d98f776fb97c1c35943b0598b1f78.jpg",
      "https://i.pinimg.com/736x/93/4a/65/934a65fa91a67cb02ee4e78ead3e4149.jpg",
      "https://i.pinimg.com/736x/b6/6e/e1/b66ee1fb6dac5e5ae6d22094e8fc9553.jpg"
    ],
    agent: {
      name: "Thanachin",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: "10%"
    }
  },
  {
    id: "9",
    name: "ที่ดิน ติดถนน",
    discription: "วงเวียนหอนาฬิกา,ภูเก็ต",
    src: "https://i.pinimg.com/736x/19/e8/1d/19e81d4002bc4aebe1424672fa1ff46e.jpg",
    price: "2,990,000",
    badroom: 0,
    bathroom: 0,
    size: "90-120",
    images: [
      "https://i.pinimg.com/736x/19/e8/1d/19e81d4002bc4aebe1424672fa1ff46e.jpg",
      "",
      "",
      "",
      ""
    ],
    agent: {
      name: "Thanachin",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: ""
    }
  },
  {  id: "10",
    name: "ที่ดิน",
    discription: "สะพานหิน,ภูเก็ต",
    src: "https://i.pinimg.com/736x/2a/1a/88/2a1a8829545a6ab1c0789c3b78be1ae9.jpg",
    price: "1,990,000",
    badroom: 0,
    bathroom: 0,
    size: "60-80",
    images: [
      "https://i.pinimg.com/736x/2a/1a/88/2a1a8829545a6ab1c0789c3b78be1ae9.jpg",
      "",
      "",
      "",
      ""
    ],
    agent: {
      name: "Thanachin",
      avatar: "https://www.atcothermalpaper.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3-%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%88.jpeg.webp",
      line: "jhon_sale_house",
      lineLink: "",
      fbLink: "",
      loan: ""
    } },

]
export default mockHouses