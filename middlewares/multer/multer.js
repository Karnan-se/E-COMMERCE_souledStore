const multer= require("multer");
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/temp")
    },

    filename:(req, file, cb)=>{
        const ext = path.extname(file.originalname);
        const timestamp = Date.now();

        // if the image section is not working undo this code
        // const filename = `${uuidv4()}${ext}`;
        // cb(null, filename)

        const filename = `${uuidv4()}_${timestamp}${ext}`;
        cb(null, filename);

    },
})

const upload = multer({ storage: storage})



module.exports=upload