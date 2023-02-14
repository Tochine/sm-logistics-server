const omit = require("lodash/omit");
const wrapServiceAction = require("../_core/wrapServiceAction");
const { ServiceError } = require("../../exceptions");
const { any } = require("../../validationTypes");
const models = require("../../database/models");
const { uploadImage } = require("../../providers/cloudinary");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    account_id: { ...any },
    fileName: { ...any },
  },

  async handler(params) {
    
    const account = await models.Account.findById(params.account_id);
    if (!account) throw new ServiceError("account not found");

    const imgUploaded = await uploadImage(params.fileName.image.tempFilePath);

    account.profileImage = imgUploaded.public_id;
    account.profileImagePath = imgUploaded.secure_url;
    await account.save();

    return omit(account.toObject(), ["password", "__v"]);
  },
});
