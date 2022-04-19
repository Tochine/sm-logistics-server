const cloudinary = require("cloudinary");

cloudinary.config({
  cloudinaryName: "toshine",
  apiKey: "639341573418551",
  secretKey: "SW1hn2V3XEtSNHK-PGIDw9R7wbI",
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder,
      },
    );
  });
};
