const cloudinary = require("cloudinary").v2;
const config = require("../config");



exports.uploadImage = async (filename) => {
  try {
    cloudinary.config({
      cloudinaryName: config.cloudinary.cloudinaryName,
      apiKey: config.cloudinary.apiKey,
      secretKey: config.cloudinary.secretKey,
      secure: true
    });
  
    const response = await cloudinary.uploader.upload(filename, { resourc_type: "image"})
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}



// exports.uploads = (file, folder) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder,
//       },
//     );
//   });
// };
