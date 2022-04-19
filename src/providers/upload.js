// const S3 = require("aws-sdk/clients/s3");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config");

exports.uploadImage = () => {
  aws.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretKey,
    // region: config.aws.region
  });

  const s3 = new aws.S3();
  const upload = multer({
    storage: multerS3({
      bucket: config.aws.bucketName,
      s3,
      acl: "public-read",
      key: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  });

  return upload;
};
