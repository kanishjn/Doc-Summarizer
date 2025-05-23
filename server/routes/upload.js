const multer = require('multer');
const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

function formatFileSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        const uploadPath = path.join(__dirname,'..uploads');
        if(!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath)
        callback(null, uploadPath);//callback: This is a callback function that you must call to tell Multer the destination. Its signature is cb(error, destination_path).
        //If there's an error, you'd call cb(error).
        //If successful, you call cb(null, destination_path).
    }, filename:function(req, file, callback){
        callback(null, `${Date.now()}-${file.originalname}`)
    }
});//takes an object with two keys destination and filename

const upload = multer({storage:storage});

router.post('/', upload.single('document'), async (req, res)=>{
    console.log('Received file:', req.file);

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try{
      const fileBuffer =  fs.createReadStream(req.file.path); //read the file from the path

      const formData =  new FormData() //formData object to store form Data|| stores in key-value pairs
      formData.append("file", fileBuffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      });

      const fastApiResponse = await axios.post("http://127.0.0.1:8000/upload", formData, {//with axios I don't have to mount post request to a router
        headers:{
          ...formData.getHeaders()
        }
      });

      fs.unlinkSync(req.file.path);

      res.status(200).json({
            message: 'File uploaded and processed successfully',
            filename: req.file.filename,
            originalname: req.file.originalname,
            size: formatFileSize(req.file.size),
            mimetype: req.file.mimetype,
            fastApiResponse: fastApiResponse.data
        });

  }catch(e){
      console.log(`Error in server: ${e.message}` );
         if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
  }
});

//single tells multer to upload a single file
//for eg: <form action="/upload" method="post" enctype="multipart/form-data">
//<input type="file" name="document" />
module.exports = router;