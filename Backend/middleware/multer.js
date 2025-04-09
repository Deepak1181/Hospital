// import multer from "multer"

// const storage= multer.diskStorage({

//     filename:function(req,file,callback){
//     callback(null,file.originalname)
// }
// })

// const upload = multer({storage})

// export default upload

import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure "uploads" directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("Saving file to uploads/ directory"); // ✅ Log file saving
        callback(null, "uploads/");
    },
    filename: function (req, file, callback) {
        console.log("Uploading file:", file.originalname); // ✅ Log filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

export default upload;
