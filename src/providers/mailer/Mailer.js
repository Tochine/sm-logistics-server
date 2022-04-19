const sendGridMail = require("@sendgrid/mail");

class Mailer {
  constructor(sgKey) {
    this.sendGridMail = sendGridMail;
    this.sendGridMail.setApiKey(sgKey);
  }

  addMail(mail) {
    this.mail = mail;
    return this;
  }

  async send(mail) {
    try {
      const rmail = mail || this.mail;
      rmail.html = rmail.render();
      await this.sendGridMail.send(rmail);
    } catch (err) {
      throw err;
    }
  }

  async sendToMany(accounts = [], mail) {
    for (const account of accounts) {
      mail.addReciepient(account);
      await this.send(mail);
    }
  }
}

module.exports = Mailer;
