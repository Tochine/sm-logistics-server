const axios = require("axios");
const crypto = require("crypto");
const requestHandler = require("../providers/RequestHandler");
const PaymentService = require("../services/payment.service");
const {
  GetPaymentCardValidator,
  PaymentCardValidator,
} = require("../validators/payment");
const models = require("../database/models");
const { ServiceError } = require("../exceptions");
// const uuid = require("uuid").v4;
const ObjectId = require("mongoose").Types.ObjectId;

class PaymentController {
  static getPaymentCards = requestHandler({
    validator: GetPaymentCardValidator,
    handler: PaymentService.getPaymentcard,
  });

  static addPaymentCard = requestHandler({
    validator: PaymentCardValidator,
    handler: PaymentService.addPaymentCard,
  });

  static async verifyPaymentCard(req, res) {
    const { accountId, cardNumber, expiryDate } = req.body;

    const account = await models.Account.findById(accountId);
    if (!account) {
      return res.status(404).json("User not found");
    }

    let cardPin = cardNumber;

    let bin = cardPin.substring(0, 6);

    let config = {
      method: "get",
      url: `https://api.paystack.co/decision/bin/${bin}`,
      headers: {
        Authorization:
          "Bearer sk_test_13a4b3abd7c517364a7aae8e041b823bfbe92997",
      },
    };

    const accountExist = await models.Payment.findOne({ ownerId: accountId });
    if (!accountExist) {
      try {
        const { data } = await axios(config);
        const cardDetails = models.Payment.create({
          ownerId: accountId,
          cardDetails: [
            {
              bankName: data.data.bank,
              brand: data.data.brand,
              cardType: data.data.card_type,
              cardNumber: cardNumber,
              country: data.data.country_name,
              expiryDate: expiryDate,
            },
          ],
        });
        return res.send(JSON.stringify(cardDetails));
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ error: "Not successfull" });
        }
        res.status(500).json({ error: error });
      }
    } else {
      const cardExist = accountExist.cardDetails.find(
        (el) => el.cardNumber === cardNumber
      );
      if (cardExist) throw new ServiceError("Card already exist");

      try {
        const { data } = await axios(config);

        accountExist.cardDetails.push({
          bankName: data.data.bank,
          brand: data.data.brand,
          cardType: data.data.card_type,
          cardNumber: cardNumber,
          country: data.data.country_name,
          expiryDate: expiryDate,
        });

        const cards = await accountExist.save();
        return res.send(JSON.stringify(cards));
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ error: "Not successfull" });
        }
        res.status(500).json({ error: error });
      }
    }

    // let cardNumber = req.body.cardNumber

    // let bin = cardNumber.substring(0, 6);

    // let config = {
    //   method: 'get',
    //   url: `https://api.paystack.co/decision/bin/${bin}`,
    //   headers: {
    //       'Authorization': 'Bearer sk_test_13a4b3abd7c517364a7aae8e041b823bfbe92997',
    //     },
    //   };

    // try {
    // const { data } = await axios(config);
    //   const accountBankDetails = await models.Payment.create({
    //     ownerId: account._id,
    //     cardDetails: [{
    //       // uuid: uuid(),
    //       bankName: data.data.bank,
    //       brand: data.data.brand,
    //       cardType: data.data.card_type,
    //       cardNumber: cardNumber,
    //       country: data.data.country_name
    //     }]
    //   });
    //   res.send(JSON.stringify(accountBankDetails))

    // } catch (error) {
    //   if(error.code === 11000){
    //     return res.status(400).json({ error: "Not successfull"})
    //   }
    //   res.status(500).json({ error: error });
    // }
  }

  static async initializePayment(req, res) {
    const { accountId, orderNo } = req.body;

    const account = await models.Account.findById(accountId);
    if (!account) throw new ServiceError("account not found");

    const item = await models.Items.findOne({
      accountId: accountId,
      orderNo: orderNo,
    });
    if (!item) throw new ServiceError("Item not found");

    // console.log(account.email);
    // return 0;

    // const formData = {
    //   // amount: parseInt(req.body.amount) * 100,
    //   amount: 100,
    //   email: "toshineapp@gmail.com",
    //   ref: crypto.randomBytes(7).toString("hex"),
    // };

    let amount = item.price;

    // const formData = {
    //   // amount: parseInt(req.body.amount) * 100,
    //   amount: parseInt(amount) * 100,
    //   email: account.email,
    //   reference: crypto.randomBytes(4).toString("hex"),
    // };

    try {
      const { data } = await axios.post(
        `https://api.paystack.co/transaction/initialize`,
        {
          amount: parseInt(amount) * 100,
          email: account.email,
          reference: item.ref,
        },
        {
          headers: {
            Authorization:
              "Bearer sk_test_13a4b3abd7c517364a7aae8e041b823bfbe92997",
          },
        }
      );
      return res.send(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async verifyPayment(ref) {
    try {
      const data = await axios.get(
        "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
        {
          headers: {
            Authorization:
              "Bearer sk_test_13a4b3abd7c517364a7aae8e041b823bfbe92997",
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // radius of the earth in km
    var dLat = ItemsService.numToRad(lat2 - lat1);
    var dLon = ItemsService.numToRad(lon2 - lon1);
    var lat1 = ItemsService.numToRad(lat1);
    var lat2 = ItemsService.numToRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  static async paymentCallback(req, res) {
    const ref = req.query.reference;

    // console.log('the reference=>', ref);
    try {
      const data = await PaymentController.verifyPayment(ref);

      // console.log(data.data.data);

      if (data.data.status == true) {
        // console.log("hello")
        console.log(data.data.data.reference);

        const item = await models.Items.findOne({
          paymentRef: data.data.data.reference,
        });
        console.log(item);

        const tranx = await models.Tranx.create({
          accountId: item.accountId,
          status: data.data.data.status,
          tranxId: data.data.data.id,
          reference: data.data.data.reference,
          paidAt: data.data.data.paidAt,
          channel: data.data.data.channel,
          currency: data.data.data.currency,
          fees: data.data.data.fees,
          ip: data.data.data.ip,
        });

        const riders = models.RidersAccount.find({ loginStatus: true });
        const ridersToClient = riders.map((rider) => {
          return {
            ...rider,
            distance: PaymentController.calcCrow(
              rider.coordinates.lat,
              rider.coordinates.long,
              item.to.lat,
              item.to.long
            ),
          };
        });

        const closetRider = ridersToClient.sort((a, b) => a.distance - b.distance )[0]


        return res.send({
          status: "successful",
          data: tranx,
        });
      }
      return res.send({ message: "Unsuccessful" });
    } catch (err) {
      return res.send(err);
    }
  }
}

module.exports = PaymentController;
