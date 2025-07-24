import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
import { ApiError } from "./ApiError.js";

// Load environment variables
dotenv.config({
    path: "./.env"
});

 
 

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log(error.message)
       throw new ApiError(500, "Image upload failed", error);
    }
}

const updateOnCloudinary = async (localFilePath, secure_url) => {
    try {


        //extract public id from the secure_url
        const publicId = secure_url.split('/').pop().split('.')[0];


        // delete the old image from cloudinary
        await cloudinary.uploader.destroy(publicId, {
            resource_type: "image"
        });

        //upload the new file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // delete the local file
        fs.unlinkSync(localFilePath);

        return response;
    }
    catch(error) {
        fs.unlinkSync(localFilePath);
        console.log(error.message);
        throw new ApiError(500, "Image update failed", error);
    }
}



export {uploadOnCloudinary, updateOnCloudinary}