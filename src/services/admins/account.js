const models = require("../../database/models");
const { ServiceError } = require("../../exceptions");
const omit = require("lodash/omit");

class Account {
    static profileImage = async ({ adminID, file }) => {
        const account = await models.AdminsAccount.findById(adminID);
        if(!account) throw new ServiceError("account not found"); 
    
        account.profileImage = file.originalname;
        account.profileImagePath = file.location;
        account.save();
    
        return { account: await omit(account.toObject(), ["password", "__v"]) }
    
    }
}

module.exports = Account