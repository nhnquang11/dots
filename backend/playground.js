const {v2: cloudinary} = require('cloudinary');
          
cloudinary.config({ 
  cloud_name: 'dlzqcowpo', 
  api_key: '358468687976675', 
  api_secret: 'AfrnalFuWGoJoLRtxwhs47opwA4' 
});

cloudinary.uploader.upload("https://vcdn1-giaitri.vnecdn.net/2024/04/25/thanh-hien-1-jpeg-1211-1714059189.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=lOmjDVsKAIEmvlmKLBwZEw",
  { public_id: "grandma_Hai", folder: "dots" }, 
  (error, result) => {console.log(result); });