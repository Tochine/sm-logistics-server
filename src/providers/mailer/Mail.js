const ejs = require("ejs");
const { MailError } = require("../../exceptions");
const config = require("../../config");

class Mail {
  constructor({
    template, message, to, from, subject,
  }) {
    this.template = template;
    this.subject = subject;
    this.to = to;
    this.from = from;
    this.message = message || "Testin email verification on sm logistics";
  }

  addRecipient(account) {
    this.to = account.email;
    this.recipient = account;
    return this;
  }

  addMessage(message) {
    this.message = message;
    return this;
  }

  render() {
    const data = {
      recipient: this.recipient,
      subject: this.subject,
      to: this.to,
      from: this.from,
      message: this.message,
    };
    console.log(this.template);
    ejs.renderFile(this.template, data, {}, (err, data) => {
      if (err) throw err;
      return data;
    });
  }
}

module.exports = Mail;
