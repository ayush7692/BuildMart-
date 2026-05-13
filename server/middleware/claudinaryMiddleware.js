const { v2: cloudinary } = require("cloudinary");
const fs = require("fs")
require ('dotenv').config()



// Configuration
cloudinary.config({
    cloud_name: 'dwtgiwzxi',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});




const uploadToCloudinary = async(fileLink) => {

   

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            fileLink, {
            resource_type: "auto"
        }
        )
        .catch((error) => {
            console.log(error);
            // If failes remove file from our server
            fs.unlinkSync(fileLink)
        });
    return uploadResult

}


module.exports =  uploadToCloudinary