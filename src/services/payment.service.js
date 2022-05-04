const axios = require("axios");
const models = require("../database/models");
const ObjectId = require("mongoose").Types.ObjectId;
const { ServiceError, NotFoundError } = require("../exceptions");

class PaymentService {
  static getPaymentcard = async ({ accountId }) => {
    const cards = await models.Payment.findOne({ ownerId: accountId });
    if (!cards) throw new NotFoundError("No card found");

    return { data: cards };
  };

  static addPaymentCard = async ({
    accountId,
    cardNumber,
    cvs,
    expiryDate,
  }) => {
    const account = await models.Account.findOne({ _id: accountId });
    if (!account) throw new ServiceError("User not found");

    const accountExist = await models.Payment.findOne({ ownerId: accountId });

    if (!accountExist) {
      const cardDetails = models.Payment.create({
        ownerId: accountId,
        cardDetails: [
          {
            cardNumber,
            cvs,
            expiryDate,
          },
        ],
      });

      return {
        status: "success",
        data: cardDetails,
      };
    } else {
      const cardExist = accountExist.cardDetails.find(
        (el) => el.cardNumber === cardNumber
      );
      if (cardExist) throw new ServiceError("Card already exist");

      accountExist.cardDetails.push({
        cardNumber,
        cvs,
        expiryDate,
      });

      const cardDetail = await accountExist.save();

      return {
        status: "success",
        data: cardDetail,
      };
    }
  };
}

module.exports = PaymentService;
